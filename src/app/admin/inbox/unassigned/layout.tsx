
export default function home({children}: any) {
    return (
        <>
            <div className="col-span-3 border-r-[#D3D3D3] border-r-[1px]">
                <div className="h-20 text-2xl pl-3 font-bold bg-black text-ellipsis">
                    <h2>Unassigned</h2>
                </div>
                <div className="overflow-y-auto">
                    <div className="flex flex-col p-4 border-b-[1px] border-b-[#D3D3D3]">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-red rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                                </div>
                                <div className="ml-1.5">
                                    <p className="leading-4 font-bold">Anonymous User</p>
                                    <p className="leading-4 text-sm mt-1">abc@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm">
                                    35m
                                </p>

                            </div>
                        </div>
                        <p className="text-sm leading-4 text-ellipsis font-normal mt-2">
                            Hello! How can I assist you today?
                        </p>
                    </div>
                    <div className="flex flex-col p-4 border-b-[1px] border-b-[#D3D3D3] border-l-[#1F81ED] border-l-[4px] bg-[#E2DFD2]">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-red rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                                </div>
                                <div className="ml-1.5">
                                    <p className="leading-4 font-bold">Anonymous User</p>
                                    <p className="leading-4 text-sm mt-1">abc@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm">
                                    35m
                                </p>

                            </div>
                        </div>
                        <p className="text-sm leading-4 text-ellipsis font-normal mt-2">
                            Hello! How can I assist you today?
                        </p>
                    </div>
                    <div className="flex flex-col p-4 border-b-[1px] border-b-[#D3D3D3]">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-red rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                                </div>
                                <div className="ml-1.5">
                                    <p className="leading-4 font-bold">Anonymous User</p>
                                    <p className="leading-4 text-sm mt-1">abc@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm">
                                    35m
                                </p>

                            </div>
                        </div>
                        <p className="text-sm leading-4 text-ellipsis font-normal mt-2">
                            Hello! How can I assist you today?
                        </p>
                    </div>
                </div>
            </div>
            {children}
           
        </>
    )
}