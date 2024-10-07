import React, { useState, useEffect } from "react";
import FranchiseeTable from "../FranchiceeReuseableComponents/Franchiseetable";
import PhoneIcon from "../../FranchiseComponents/FranchiceeReuseableComponents/FranchiseeIcons/Phone.png";
import EmailIcon from "../../FranchiseComponents/FranchiceeReuseableComponents/FranchiseeIcons/Email.png";
import FranchiseeCard from "../FranchiceeReuseableComponents/FranchiseeCard";

const FranchiseeList = () => {
    // State to store franchisee data
    const [franchiseeData, setFranchiseeData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set the number of items per page

    const DummyData = [
        {
            name: "Samanta William",
            id: "#123456789",
            revenue: "10,00,500",
            branches: 2,
            providers: 2,
            location: "Jakarta",
            validUntil: "March 25, 2023",
            status: "Inactive",
        },
        // Add more dummy data here as needed
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(() => {
                    setFranchiseeData(DummyData);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching franchisee data:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { label: "Franchisee Name", key: "name" },
        { label: "ID", key: "id" },
        { label: "Revenue", key: "revenue" },
        { label: "Branches", key: "branches" },
        { label: "Service Providers", key: "providers" },
        {
            label: "Contact",
            key: "contact",
            render: () => (
                <div className="flex space-x-2 items-center">
                    <img src={PhoneIcon} alt="Phone Icon" className="h-5 w-5 text-primary rounded-full" />
                    <img src={EmailIcon} alt="Email Icon" className="h-5 w-5 rounded-full" />
                </div>
            ),
        },
        { label: "Valid Until", key: "validUntil" },
        {
            label: "Status",
            key: "status",
            render: (status) => (
                <span
                    className={`px-4 py-1 rounded-full text-primary ${
                        status === "Inactive" ? "bg-red" : "bg-lightgreen"
                    }`}
                >
                    {status}
                </span>
            ),
        },
        { label: "Action", key: "action", render: () => "..." },
    ];

    const dropdownOptions = [
            {
              selected: "All",
              options: [
                { label: "Franchise Type", value: "All" },
                { label: "Type 1", value: "Type1" },
                { label: "Type 2", value: "Type2" },
              ],
              onChange: (value) => console.log("Selected:", value),
            },
            {
              selected: "Newest",
              options: [
                { label: "Newest", value: "Newest" },
                { label: "Oldest", value: "Oldest" },
              ],
              onChange: (value) => console.log("Sorting by:", value),
            },
          ];

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
            {loading ? (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <FranchiseeCard />
                    <FranchiseeTable
                        columns={columns}
                        data={franchiseeData}
                        searchPlaceholder="Search by franchisee name"
                        dropdownOptions={dropdownOptions}
                        onAddEditClick={() => alert("Add/Edit Franchisee Type clicked")}
                        onNewItemClick={() => alert("Add New Franchisee clicked")}
                        currentPage={currentPage}
                        totalItems={franchiseeData.length}
                        itemsPerPage={itemsPerPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default FranchiseeList;

