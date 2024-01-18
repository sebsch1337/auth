"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {
	const router = useRouter();

	// const onClick = () => {
	// 	router.push("/auth/login");
	// };

	if (mode === "modal") {
		return <span>TODO: Implement modal</span>;
	}

	return (
		<Link
			className="cursor-pointer"
			href="/auth/login"
		>
			{children}
		</Link>
	);
};
