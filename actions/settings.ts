"use server";

import * as z from "zod";

import { update } from "@/auth";

import { SettingsSchema } from "@/schemas";

import { getUserByEmail, getUserById, getUserByPendingEmail } from "@/data/user";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();

	if (!user) {
		return { error: "Unauthorized!" };
	}

	const dbUser = await getUserById(user.id);

	if (!dbUser) {
		return { error: "Unauthorized!" };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		let existingUser = (await getUserByEmail(values.email)) || (await getUserByPendingEmail(values.email));

		if (existingUser && existingUser.id !== user.id) {
			return { error: "Email already in use!" };
		}

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		await db.user.update({
			where: { id: user.id },
			data: {
				pendingEmail: verificationToken.email,
			},
		});

		return { success: "Verification email sent!" };
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

		if (!passwordsMatch) {
			return { error: "Incorrect password!" };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);

		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	const updatedUser = await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	update({
		user: {
			name: updatedUser.name,
			email: updatedUser.email,
			isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
			role: updatedUser.role,
		},
	});

	revalidatePath("/");

	return { success: "Settings updated!" };
};
