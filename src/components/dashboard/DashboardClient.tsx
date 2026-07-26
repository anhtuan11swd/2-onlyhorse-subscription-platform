"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BarChart3, Package, PenSquare } from "lucide-react";
import { useState } from "react";
import AnalyticsTab from "@/components/dashboard/AnalyticsTab";
import ContentTab from "@/components/dashboard/ContentTab";
import StoreTab from "@/components/dashboard/StoreTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient();

export default function DashboardClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}

function DashboardContent() {
  const [tabsDisabled, setTabsDisabled] = useState(false);

  return (
    <div className="px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">Bảng điều khiển</h1>
      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger
            className={cn(tabsDisabled && "pointer-events-none opacity-50")}
            value="analytics"
          >
            <BarChart3 className="mr-2 size-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger
            className={cn(tabsDisabled && "pointer-events-none opacity-50")}
            value="content"
          >
            <PenSquare className="mr-2 size-4" />
            Nội dung
          </TabsTrigger>
          <TabsTrigger
            className={cn(tabsDisabled && "pointer-events-none opacity-50")}
            value="store"
          >
            <Package className="mr-2 size-4" />
            Cửa hàng
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-6" value="analytics">
          <AnalyticsTab />
        </TabsContent>
        <TabsContent className="mt-6" value="content">
          <ContentTab onPendingChange={setTabsDisabled} />
        </TabsContent>
        <TabsContent className="mt-6" value="store">
          <StoreTab onPendingChange={setTabsDisabled} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
