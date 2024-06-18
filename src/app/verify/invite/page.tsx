"use client"
import Loader from "@/components/common/Loader";
import { createUser2, verifyAdminToken, verifyMemberToken } from "../../../../lib/services/user";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "@/components/Toast";

async function check(token: string, isAdmin: boolean) {
    console.log(token)
    console.log(isAdmin)
    const res = isAdmin ? await verifyAdminToken(token) : await verifyMemberToken(token);
    console.log(res);
    return res;
}

export default function Verify() {
    const searchParams = useSearchParams();
    const admin = searchParams.get('admin') || ""
    const member = searchParams.get('member') || ""
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    useEffect(() => {
        const token = admin || member;
        const isAdmin = !!admin;
        if (token) {
            check(token, isAdmin).then(res => {
                if (res) setData(res)
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [admin, member]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButtonLoading(true);
        const formData = new FormData(event.currentTarget);
        const role = admin ? "admin" : "member"
        const shopDomain = data
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (password !== confirmPassword) {
            showToast("error", "Passwords do not match");
        } else {
            try {
                if (email && password) {
                    const res = await createUser2(email, password, shopDomain, firstName, lastName, role)
                    if (res) {
                        setAccountCreated(true);
                        showToast("success", "Account created successfully. Check your inbox to verify your account.");
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showToast("error", "Error submitting form");
            }
        }
        setButtonLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    if (accountCreated) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1>Account created successfully. Check your inbox to verify your account.</h1>
            </div>
        );
    }

    if (data) {
        return (
            <div className="grid grid-cols-1 gap-9 h-screen pt-8 pl-16 pr-16">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black text-center dark:text-white">
                                Please fill the details
                            </h3>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="pl-16 pr-16">
                            <Input
                                label="Your Role"
                                className="pt-4"
                                disabled
                                name="roleId"
                                value={admin ? "Admin" : "Member"}
                            />
                            <Input
                                label="Store"
                                className="pt-4"
                                disabled
                                name="shopDomain"
                                value={data}
                            />
                            <div className="grid grid-cols-2 gap-16">
                                <Input
                                    label="First Name"
                                    className="pt-4 grid-cols-1"
                                    name="firstName"
                                />
                                <Input
                                    label="Last Name"
                                    className="pt-4 grid-cols-1"
                                    name="lastName"
                                />
                            </div>
                            <Input
                                label="Enter Your Email"
                                className="pt-4"
                                name="email"
                                type="email"
                                isRequired

                            />
                            <Input
                                label="Enter Your Password"
                                className="pt-4"
                                name="password"
                                type="password"
                                isRequired
                            />
                            <Input
                                label="Confirm Your Password"
                                className="pt-4"
                                name="confirmPassword"
                                type="password"
                                isRequired
                            />
                            <Button
                                type="submit"
                                color="primary"
                                isLoading={buttonLoading}
                                className="flex w-full mt-4 mb-4 justify-center font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Account Verification Failed</h1>
            </div>
        );
    }
}
