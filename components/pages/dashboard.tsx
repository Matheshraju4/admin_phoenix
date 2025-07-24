"use client";

import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadButton, UploadDropzone } from "@/src/utils/uploadthing";

import { toast } from "sonner";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DeleteIcon, Trash2, X } from "lucide-react"; // or any close icon
import Link from "next/link";
import axios from "axios";

const formSchema = z.object({
  patientName: z.string().min(1, "Patient Name is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(10, "Phone must be 10 digits"),
  reportName: z.string().optional(),
});

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileDetails, setFileDetails] = useState<{
    FileName: string;
    reportFileUrl: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      phone: "",
      reportName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!fileDetails || !values.patientName || !values.phone) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/manage-patients/insert-details", {
        patientName: values.patientName,
        phone: values.phone,
        reportName: values.reportName,
        reportFileName: fileDetails?.FileName,
        reportFileUrl: fileDetails?.reportFileUrl,
      });
      if (response.status === 200) {
        toast.success("Patient Details Inserted Successfully");
        form.reset();
        setFileDetails(null);
      }
    } catch (error) {
      toast.error("Error Inserting Patient Details");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full h-full bg-primary/10 p-2">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl w-full max-w-xl mx-auto p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-2">
            <HiOutlineDocumentArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-primary">
            Upload Patient Report
          </h2>
        </div>
        <p className="mb-3 sm:mb-6 text-gray-500 text-xs sm:text-base">
          Fill in the details and upload the report file.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-3 sm:gap-6"
          >
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Patient Name"
                      className="focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Phone Number"
                      className="focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Report Name"
                      className="focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Upload</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Upload Area */}
            <div>
              <FormLabel className="text-sm">Report</FormLabel>
              <div className="mt-2">
                <Card className="bg-primary/5 border-primary/20 border-dashed border-2 rounded-lg">
                  <CardContent className="p-2 sm:p-4">
                    {fileDetails ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="link"
                            className="p-0 text-xs sm:text-base"
                          >
                            <Link
                              href={fileDetails.reportFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium"
                            >
                              {fileDetails.FileName}
                            </Link>
                            <Badge
                              variant="outline"
                              className="ml-2 mt-1 text-xs"
                            >
                              PDF
                            </Badge>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setFileDetails(null)}
                            className="text-gray-400 hover:text-red-500 transition p-1"
                            aria-label="Remove file"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="pdfUploader"
                        onClientUploadComplete={(res: any) => {
                          setFileDetails({
                            FileName: res[0].name,
                            reportFileUrl: res[0].ufsUrl,
                          });
                          toast.success("File Uploaded Successfully");
                        }}
                        onUploadError={() => {
                          toast.error("Error Uploading File");
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Supported format: PDF
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 sm:mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Dashboard;
