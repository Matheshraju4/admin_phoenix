"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users } from "lucide-react";
import Link from "next/link";

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/manage-patients/view-patients",
          {
            skip: 0,
            search: "",
            order: "desc",
          }
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Loading patients...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (patients.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-7">
            <p className="text-muted-foreground mb-4">No patients found</p>
            <Button>Add New Patient</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-none mx-auto ">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5" />
          All Patients
          <span className="text-sm font-normal text-muted-foreground ml-auto">
            {patients.length} total
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-t">
              <TableHead className="h-12 px-6 font-medium">Name</TableHead>
              <TableHead className="h-12 px-6 font-medium">
                Phone Number
              </TableHead>
              <TableHead className="h-12 px-6 font-medium">
                Recent Report
              </TableHead>
              <TableHead className="h-12 px-6 font-medium text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient: any, index) => (
              <TableRow
                key={patient.id || index}
                className="hover:bg-muted/50 px-10"
              >
                <TableCell className="px-6 py-4">
                  <div className="font-medium">
                    {patient?.name || "Unknown Patient"}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground">
                  {patient?.phoneNumber || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-primary font-medium underline">
                  <Link
                    href={`${patient?.reports[0]?.reportFileUrl}`}
                    target="_blank"
                  >
                    {patient?.reports[0]?.reportName || "N/A"}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 gap-2 bg-primary text-primary-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ViewAllPatients;
