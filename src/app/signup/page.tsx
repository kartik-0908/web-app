import { lucia } from "@/app/auth";
import { hashPassword } from "../../../lib/auth";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
	return (
		<>
			<h1>Create an account</h1>
			<form action={signup}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</form>
		</>
	);
}

async function signup(formData: FormData): Promise<ActionResult> {
	// "use server";
	const username = formData.get("username");
	const password = formData.get("password");
	// if (typeof password !== "string" || password.length < 6 || password.length > 255) {
	// 	return {
	// 		error: "Invalid password"
	// 	};
	// }

	const userId = generateIdFromEntropySize(10); // 16 characters long

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
	error: string;
}