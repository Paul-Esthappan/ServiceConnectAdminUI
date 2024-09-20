import React from "react";
import Card from "../../components/reUsableComponents/Card";
import { CiLocationOn } from "react-icons/ci";
import Table from "../../components/ReUsableComponents/Table";

const userdetails = {
  location: "Jakarta, Indonesia",
  address: "Jakrata, Indonesia",
  phone: "+12 34567 890",
  email: "Hope@mail.com",
};

const tableConfig = { title: "Payment History", type: "paymentslog" };

const tableDataConfig = [
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "50,542",
    serviceStatus: "Complete",
  },
  {
    paymentId: "#65432109",
    date: "April 10 2024,12:45 PM",
    paymentAmount: "15,275",
    serviceStatus: "Cancelled",
  },
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "32,542",
    serviceStatus: "Cancelled",
  },
  {
    paymentId: "#12345678",
    date: "March 25 2024,12:45 PM",
    paymentAmount: "40,542",
    serviceStatus: "Cancelled",
  },
  {
    paymentId: "#78912345",
    date: "August 20 2024,12:45 PM",
    paymentAmount: "25,100",
    serviceStatus: "Complete",
  },
  {
    paymentId: "#98765432",
    date: "July 14 2024,12:45 PM",
    paymentAmount: "32,890",
    serviceStatus: "Pending",
  },
];

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
  return (
    <div className="py-12 flex max-lg:flex-col gap-4 justify-around  p-4">
      <div>
        <div className="container border max-w-screen-lg  rounded-xl overflow-hidden h-fit">
          <div className="bg-violet w-full h-36 relative">
            <div className="absolute aspect-square z-20  rounded-full m-2 p-2 w-48  bg-primary left-10 top-6">
              <div className="w-full bg-blue_gray h-full rounded-full"></div>
            </div>
            <div className="absolute flex justify-end items-end -bottom-[1px] z-10 -right-[-40px] ">
              <div className="bg-orange w-44 h-16 rounded-tl-3xl"></div>
              <div className="bg-yellow w-56 h-28 rounded-t-3xl"></div>
            </div>
          </div>
          {
            //title box
          }
          <div className="mt-24">
            <div className="mx-10">
              <h2 className="text-3xl font-poppins  font-bold text-dark_blue">
                Karen Hope
              </h2>
              <p className="text-lg font-semibold text-light_gray">User</p>
            </div>
            <div className="flex max-md:flex-col  gap-6 p-6">
              <div className="flex flex-col gap-2">
                <div className="flex px-4">
                  <p className="userdetails_tag ">Location:</p>
                </div>

                <div className="flex gap-3 justify-center items-center max-md:justify-start">
                  <div className="bg-orange w-fit rounded-full p-3">
                    <CiLocationOn
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>

                  <h3 className="userdetails_sub">{userdetails.location}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex px-4">
                  <p className="userdetails_tag ">Address:</p>
                </div>
                <div className="flex justify-center items-center gap-2 max-md:justify-start">
                  <div className="bg-orange w-fit rounded-full p-3">
                    <CiLocationOn
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>
                  <h3 className="userdetails_sub">{userdetails.address}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex px-4">
                  <p className="userdetails_tag ">Phone:</p>
                </div>
                <div className="flex justify-center items-center gap-2 max-md:justify-start">
                  <div className="bg-orange w-fit rounded-full p-3">
                    <CiLocationOn
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>
                  <h3 className="userdetails_sub">{userdetails.phone}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex px-4 ">
                  <p className="userdetails_tag ">Email:</p>
                </div>
                <div className="flex justify-center items-center gap-2 max-md:justify-start">
                  <div className="bg-orange w-fit rounded-full p-3">
                    <CiLocationOn
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>
                  <h3 className="userdetails_sub">{userdetails.email}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-5">
          <Table
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
