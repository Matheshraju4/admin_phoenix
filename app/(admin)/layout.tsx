import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Outfit } from "next/font/google";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/reusable/app-sidebar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full  ">
            <div className="flex gap-5 items-center p-5 bg-white shadow-sm">
              <SidebarTrigger className="hover:bg-primary/10" />
              <h1 className="text-2xl font-bold ">Admin Dashboard</h1>
            </div>
            <div className="">
              {children}
              <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <Toaster richColors />
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}



