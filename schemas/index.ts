import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Password is required" }),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, { message: "Minimum of 6 characters are required" }),
	name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
	email: z.string().email(),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, { message: "Minimum of 6 characters required" }),
});
