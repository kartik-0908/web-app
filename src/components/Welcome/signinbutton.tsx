"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function () {
    const router = useRouter();

    return <div>
        <button
            onClick={async () => {
                const res = await signIn("credentials", {
                    username: "",
                    password: "",
                    redirect: false,
                });
                console.log(res);
                router.push("/")
            }}
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Sign In
        </button>

    </div>
}