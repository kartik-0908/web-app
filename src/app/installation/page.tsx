"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InstallationCard from "@/components/Chat/installationCard";



const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Installation" />

        <div className="grid grid-cols-5 gap-8">
          
          <InstallationCard />
        </div>

      </div>
    </DefaultLayout>
  );
};

export default Settings;
