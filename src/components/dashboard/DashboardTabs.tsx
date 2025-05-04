
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManualVerification from "@/components/dashboard/ManualVerification";
import FileUpload from "@/components/dashboard/FileUpload";
import VerificationResults from "@/components/dashboard/VerificationResults";
import VerificationHistory from "@/components/dashboard/VerificationHistory";

interface DashboardTabsProps {
  initialTab?: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ initialTab = "manual" }) => {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="manual">Manual Verify</TabsTrigger>
        <TabsTrigger value="upload">Upload CSV</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="manual" className="animate-slide-up">
        <ManualVerification />
      </TabsContent>
      
      <TabsContent value="upload" className="animate-slide-up">
        <FileUpload />
      </TabsContent>
      
      <TabsContent value="results" className="animate-slide-up">
        <VerificationResults />
      </TabsContent>
      
      <TabsContent value="history" className="animate-slide-up">
        <VerificationHistory />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
