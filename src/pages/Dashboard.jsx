import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashboardComp from "../components/Dashboard/DashboardComp";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className="w-full">
        {/* Profile */}
        {tab === "profile" && <DashProfile />}
        {/* Posts */}
        {tab === "posts" && <DashPosts />}
        {/* Users */}
        {tab === "users" && <DashUsers />}
        {/* Comments */}
        {tab === "comments" && <DashComments />}
        {/* Dashboard */}
        {tab === "dash" && <DashboardComp />}
      </div>
    </div>
  );
};

export default Dashboard;
