import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import PerfomanceChart from "./PerfomanceChart";
import Finance from "./Finance";
import RecentActivities from "./RecentActivities";
import MessagesList from "./MessagesList";
import CustomerArrival from "./CustomerArrival";
import ServiceCategories from "./ServiceCategories";
import Statistics from "./Statitics";
import Revenue from "./Revenue";
import ComplaintsLog from "./ComplaintsLog";
import InCompleteBookings from "./InCompleteBookings";
import { DashboardDetails, TotalUsers } from "../../../service/api/admin/GetApi";
import { FinanceReport } from "../../../service/api/admin/PostApi";

const DashBoardLayout = ({ role }) => {
  const [state, setState] = useState({
    Total_Franchisees: 0,
    Total_Dealers: 0,
    Total_Service_Providers: 0,
    Recent_Activities: [],
    Categories: [{}],
    Complaints: [],
    Incomplete_Bookings: [],
    total_customers: 0,
    monthly_data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardDetails();
        const totalusers = await TotalUsers();
        const financereport = await FinanceReport({ year: 2016 });

        setState({
          Total_Franchisees: data.Total_Franchisees,
          Total_Dealers: data.Total_Dealers,
          Total_Service_Providers: data.Total_Service_Providers,
          Recent_Activities: data.Recent_Activities,
          Categories: data.Categories,
          Complaints: data.Complaints,
          Incomplete_Bookings: data.Incomplete_Bookings,
          total_customers: totalusers.total_customers,
          monthly_data: financereport.data.monthly_data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const {
    Total_Franchisees,
    Total_Dealers,
    Total_Service_Providers,
    Recent_Activities,
    Categories,
    Complaints,
    Incomplete_Bookings,
    total_customers,
    monthly_data,
  } = state;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        {/* Left Side (Content) */}
        <div className="lg:col-span-3 space-y-6 px-4">
          <div className="p-3">
            <AdminCard
              total_customers={total_customers}
              Total_Franchisees={Total_Franchisees}
              Total_Dealers={Total_Dealers}
              Total_Service_Providers={Total_Service_Providers}
            />
          </div>

          <div className="p-3">
            <PerfomanceChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3">
              <Finance monthly_data={monthly_data} />
            </div>
            <div className="p-3">
              <Finance monthly_data={monthly_data} />
            </div>
          </div>

          <div className="p-3">
            <CustomerArrival />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3">
              <h1 className="font-bold p-3">Statistics</h1>
              <Statistics />
            </div>
            <div className="p-3">
              <h1 className="font-bold p-3">Revenue</h1>
              <Revenue />
            </div>
          </div>
        </div>

        {/* Right Side (Sidebar) */}
        <div className="lg:col-span-1 bg-primary h-max p-4">
          <div className="w-full flex flex-col flex-wrap xl:flex-col gap-10">
            <div className="flex-1 min-h-[300px]">
              <RecentActivities RecentActivities={Recent_Activities} />
            </div>
            <div className="flex-1 min-h-[300px]">
              <MessagesList />
            </div>
            <div className="flex-1 min-h-[300px]">
              <ServiceCategories Categories={Categories} />
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="p-5">
          <InCompleteBookings InCompleteBookings={Incomplete_Bookings} />
        </div>
        <div className="p-5">
          <ComplaintsLog Complaints={Complaints} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
