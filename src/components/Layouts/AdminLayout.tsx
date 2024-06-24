"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar/MainLayout";
import Header from "@/components/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <aside
            className={`text-black flex w-[6%] max-w-16 flex-col overflow-y-hidden border-r-[#d3d3d3] border-r-[1px] }`}
          >
            <Sidebar />
          </aside>
          <main className="w-[94%] p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
