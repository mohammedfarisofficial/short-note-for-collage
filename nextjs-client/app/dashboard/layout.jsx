import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { dashboardRouter } from "../contants/router";

const DashboardLayout = ({ children }) => {
  return (
    <div className="pt-[100px] px-[2rem]">
      <Breadcrumbs
        routesMap={dashboardRouter}
        root="dashboard"
        rootpath="/dashboard"
      />
      {children}
    </div>
  );
};

export default DashboardLayout;
