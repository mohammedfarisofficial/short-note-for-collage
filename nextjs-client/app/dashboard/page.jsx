"use client";
import Link from "next/link";
import protectedRoute from "../auth/protectedRoute";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const universities = useSelector((state) => state.data.universities);

  useEffect(() => {
    if (universities === null) {
      redirect("/");
    }
  }, [universities]);
  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <Header>
        <div><h1>List of notes</h1><p className="text-gray-400 text-sm">list of uploaded notes</p></div>
        <Link href="/dashboard/upload-note">
          <Button>Upload New</Button>
        </Link>
      </Header>
      <div className="w-full">
        <Card>
          <Table>
            <TableCaption>A list of your recent notes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Download URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities &&
                universities.notes.length &&
                universities.notes.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      66a407df5814da779d797661
                    </TableCell>
                    <TableCell>Chemisty note 2</TableCell>
                    <TableCell>66a407435814da779d797655</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>slug-123</TableCell>
                    <TableCell className="text-right">
                      <Link href="/dashboard/123">Show</Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default protectedRoute(Dashboard);
