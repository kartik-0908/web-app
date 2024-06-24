import AdminLayout from "@/components/Layouts/AdminLayout";

export default function LayoutAdmin({children}:{children: React.ReactNode }) {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>

  )
  // }

}
