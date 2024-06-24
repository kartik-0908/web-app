import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InboxSidebar from "@/components/Sidebar/InboxLayout/InboxSideBar";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Breadcrumb pageName="Inbox"></Breadcrumb>

            <div className="grid grid-cols-12 bg-transparent h-3/4">
                <div className="col-span-2 max-w-[200px] border-r-[#D3D3D3] border-r-[1px]">
                    <InboxSidebar />
                </div>
                {children}
            </div>
        </>
    )
    // }

}
