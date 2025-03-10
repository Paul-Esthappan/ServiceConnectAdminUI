import React from "react";
import Card from "../../../components/reUsableComponents/Card";
import UserProfile from "../../../components/adminComponents/userManagementComponents/UserProfile";
import PaymentHistoryTable from "../../../components/commonComponents/profileComponents/PaymentHistoryTable";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, getUserPaymentHistory } from "../../../service/api/admin/PostApi";

/*
const userdetails = {
  name:'Karen Hope',
  location: "Jakarta, Indonesia",
  address: "Jakrata, Indonesia",
  phone: "+12 34567 890",
  email: "Hope@mail.com",
};*/

const tableConfig = { title: "Payment History"};

/*const tableDataConfig = [
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "50,542",
    paymentStatus: "Complete",
  },
  {
    paymentId: "#65432109",
    date: "April 10 2024,12:45 PM",
    paymentAmount: "15,275",
    paymentStatus: "Cancelled",
  },
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "32,542",
    paymentStatus: "Cancelled",
  },
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "40,542",
    paymentStatus: "Cancelled",
  },
  {
    paymentId: "#78912345",
    date: "August 20 2024,12:45 PM",
    paymentAmount: "25,100",
    paymentStatus: "Complete",
  },
  {
    paymentId: "#98765432",
    date: "July 14 2024,12:45 PM",
    paymentAmount: "32,890",
    paymentStatus: "Pending",
  },
];*/

const tableColConfig = ["PaymentId", "Date", "PaymentAmount", "ServiceStatus"];
const smallCardDetails = {
  title: "Recent Service Details",
  variant: "medium",
  subtitle: "Thursday,10th April,2021",
};
const cardDetails = [
  {
    id: 1,
    title: "Tap Repair",
    subtitle: "Booked",
    name: "Keshavan",
    sideColor: "bg-violet",
    variant: "large",
    date: "March 20,2021",
    time: "09:00-10:00 AM",
  },
  {
    id: 2,
    title: "Drain Blockage",
    subtitle: "Complaint",
    name: "Keshavan",
    sideColor: "bg-orange",
    variant: "large",
    date: "March 20,2021",
    time: "09:00-10:00 AM",
  },
  {
    id: 3,
    title: "Light Change",
    subtitle: "Completed",
    name: "Keshavan",
    sideColor: "bg-dark_yellow",
    variant: "large",
    date: "March 20,2021",
    time: "09:00-10:00 AM",
  },
  {
    id: 4,
    title: "Fan Repair",
    subtitle: "Completed",
    name: "Thomas",
    sideColor: "bg-dark_blue",
    variant: "large",
    date: "March 20,2021",
    time: "09:00-10:00 AM",
  },
];
const UserDetails = () => {
  
  const user_id = useParams();
  const users_id = useParams();

  const [userdetails, setUserdetails] = useState([]);
  const [tableDataConfig, setTableDataConfig] = useState([]);

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const user = await getUserDetails(user_id.id);
        setUserdetails(user);
      } catch (error) {
        console.error('Failed to fetch user details',error);
        setUserdetails([]); // Set to an empty array in case of error
      }
    };

    fetchUser();
  }, []);
  console.log(userdetails);

  useEffect( () => {
    const fetchPaymentHistory = async () => {
      try {
        const paymenthistory = await getUserPaymentHistory(users_id.id);
        setTableDataConfig(Array.isArray(paymenthistory) ? paymenthistory : []);
      } catch (error) {
        console.error('Failed to fetch user payment history',error);
        setTableDataConfig([]);
      }
    };

    fetchPaymentHistory();
  }, []);
  console.log(tableDataConfig);

  return (
    <div className="py-12 flex max-lg:flex-col gap-4 justify-around  p-4">
      <div>
        <UserProfile name={userdetails.full_name} location={userdetails.location} address={userdetails.address} phone={userdetails.phone_number} email={userdetails.email}/>

        <div className="w-full p-5">
          <PaymentHistoryTable
            tableColConfig={tableColConfig}
            tableDataConfig={tableDataConfig}
            tableConfig={tableConfig}
          />
        </div>
      </div>

      <div className="lg:w-[26rem]">
        <div className="flex flex-col gap-5">
          <Card
            title={smallCardDetails.title}
            variant={smallCardDetails.variant}
            subtitle={smallCardDetails.subtitle}
          />
          {cardDetails.map((detail) => (
            <Card
              key={detail.id}
              title={detail.title}
              subtitle={detail.subtitle}
              sideColor={detail.sideColor}
              variant={detail.variant}
              date={detail.date}
              time={detail.time}
              name={detail.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;