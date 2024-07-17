import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Link href="dashboard/update/123">Update note</Link>
      <Link href="dashboard/upload">Upload note</Link>
    </>
  );
};

export default Dashboard;
