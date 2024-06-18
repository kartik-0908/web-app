"use client"
import { showToast } from "./Toast";
import { useSession } from "next-auth/react";
import axios from "axios";


export const FormLayout: React.FC<{ roleId: string }> = ({ roleId }) => {
    const {data: session} = useSession()
    if (!session || !session.user || !session.user.email) return null
    // console.log("data")
    // console.log(session.user.email)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = session.user.email || "";
        const roleId = formData.get('roleId');
        const shopDomain = formData.get('shopDomain') as string;
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/updateForm`, {
            formData:{
                email,
                roleId,
                shopDomain,
                firstName,
                lastName
            }
        });
        // const response = await updateForm(shopDomain);

        if (resp.data.message != "ok") {
            showToast("error", resp.data.message);
        } else {
            showToast("success", "Form submitted successfully!");
        }
    };


    return (
        <div className="grid grid-cols-1 gap-9 h-screen pt-8 pl-16 pr-16">
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black text-center dark:text-white">
                            Please fill the details
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="roleId" value={roleId} />
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 ">
                                {roleId === 'admin' && (
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Shopify Domain <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <input
                                                name='shopDomain'
                                                type="text"
                                                placeholder="Enter your shopify domain"
                                                className="w-full rounded-l border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <div className="flex items-center px-5 py-3 bg-gray-200 border-[1.5px] border-l-0 border-stroke rounded-r text-black dark:border-form-strokedark dark:bg-form-input dark:text-white">
                                                .myshopify.com
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        First name
                                    </label>
                                    <input
                                        name='firstName'
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Last name
                                    </label>
                                    <input
                                        name='lastName'
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>


                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
