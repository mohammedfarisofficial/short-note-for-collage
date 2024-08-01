"use client";
import Link from "next/link";
import protectedRoute from "../auth/protectedRoute";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <h2>List of notes</h2>
      <Link href="/dashboard/upload-note">
      <Button>Upload New</Button>
      </Link>
      <div>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Note 1</h2>
        </Card>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Note 1</h2>
        </Card>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Note 1</h2>
        </Card>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Note 1</h2>
        </Card>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Note 1</h2>
        </Card>
      </div>
    </div>
  );
};

export default protectedRoute(Dashboard);
