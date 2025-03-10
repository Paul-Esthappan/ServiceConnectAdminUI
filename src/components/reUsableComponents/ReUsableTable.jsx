import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ReUsableTable = ({
  tableDataConfig,
  tableColConfig,
  tableConfig,
  path,
}) => {
  const role = useSelector((state) => state.auth.role);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to display per page
  const [sortNewest, setSortNewest] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows for checkboxes
  const [openActionId, setOpenActionId] = useState(null); // Opened action dropdown for each row
  const navigate = useNavigate();
  // Sort the data by date, either newest or oldest first
  const sortedUsers = [...(tableDataConfig || [])].sort((a, b) => {
    return sortNewest
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });
 
  

  // Filter the data by the search term
  const filteredUsers = sortedUsers.filter(
    (user) => user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  // Calculate pagination indexes
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const totalUsers = filteredUsers.length;

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const toggleSortOrder = () => {
    setSortNewest(!sortNewest);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (id) => {
    console.log("view true", id);
    navigate(`${path}/details/2`);
  };
  const handleEdit = () => {
    console.log("edit true");
    navigate(`${path}/edit/2`);

  };
  const handleDelete = () => {
    console.log("delete true");
  };

  // Toggle action dropdown visibility for specific row
  const toggleAction = (id) => {
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const selectFirstFiveRow = (e) => {
    if (e.target.checked) {
      const firstFiveRow = currentUsers.map((usr) => usr.id);
      setSelectedRows(firstFiveRow);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="flex flex-col font-poppins text-secondary ">
      {/* Search and sorting bar */}
      <div className="flex flex-wrap justify-between">
        <span className="relative rounded-full overflow-hidden h-12 mb-2">
          <img
            className="absolute left-6 top-1/2 transform -translate-y-1/2"
            src="/search-icon.svg"
            alt="search"
          />
          <input
            className="outline-none px-16 py-4 pl-[70px] h-full"
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </span>

        <div className="flex gap-4 flex-wrap">
          {/* Sort button */}
          <button
            className="flex items-center justify-center rounded-full px-14 h-12 border-2 border-solid border-violet gap-2"
            onClick={toggleSortOrder}
          >
            <div className="relative">
              <span className="text-violet text-sm font-medium">
                {sortNewest ? "Newest" : "Oldest"}
              </span>
            </div>
            <img src="/dropdown-icon.svg" alt="dropdown" />
          </button>
          <Link
            to={`${path}/add-new`}
            className="flex items-center justify-center bg-violet rounded-full hover:opacity-90 duration-300 px-14 h-12 gap-2"
          >
            <img src="/add-icon.svg" alt="new user" />

            {/* New user button */}
            <button className="text-primary text-sm font-medium whitespace-nowrap">
              New User
            </button>
          </Link>
        </div>
      </div>

      {/* Card layout for small screens */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 lg:hidden mt-6">
        {currentUsers.map((data, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg mb-4 p-4 space-y-4"
          >
            {data.name && (
              <div className="flex items-center space-x-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={data.image}
                  alt=""
                />
                <div>
                  <p className="text-lg font-bold">{data.name}</p>
                  <p>ID: {data.id}</p>
                </div>
              </div>
            )}
            <div className="text-sm">
              <p className="text-sm text-id_gray">{data.date}</p>
              <p className="text-sm ">
                Total Completed Services:{" "}
                <span className="font-semibold">{data.totalCompletedWork}</span>
              </p>
              <span
                className={`flex  px-2 items-center justify-center ${
                  data.status === "Active" ? "bg-fluracent_green" : "bg-orange"
                } text-primary w-20 h-8 inline-block rounded-full font-medium whitespace-nowrap mt-2`}
              >
                {data.status}
              </span>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 mt-2">
                  <a
                    href={`tel:${data.contact?.phone}`}
                    className="p-1 bg-violet bg-opacity-10 rounded-full cursor-pointer"
                  >
                    <img className="w-5" src="/phone-icon.svg" alt="phone" />
                  </a>
                  <a
                    href={`mailto:${data.contact?.mail}`}
                    className="p-1 bg-violet bg-opacity-10 rounded-full cursor-pointer"
                  >
                    <img className="w-5" src="/email-icon.svg" alt="email" />
                  </a>
                </div>

                {/* Actions dropdown */}
                <div className="relative inline-block">
                  <span onClick={() => toggleAction(data.id)}>
                    <img
                      className="w-5 m-auto cursor-pointer"
                      src="/actions-icon.svg"
                      alt="action"
                    />
                  </span>
                  <ul
                    className={`absolute z-20 right-4 top-2 shadow-lg rounded-lg overflow-hidden ${
                      openActionId === data.id ? "block" : "hidden"
                    }`}
                  >
                    {role === "dealer" ? (
                      <>
                        <li
                          className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-2 border-b border-gray"
                          onClick={handleView}
                        >
                          View
                        </li>
                        <li
                          className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-2"
                          // onClick={handleVerify}
                        >
                          Verify
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-2 border-b border-gray"
                          onClick={handleView}
                        >
                          View
                        </li>
                        <li
                          className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-2 border-b border-gray"
                          onClick={handleEdit}
                        >
                          Edit
                        </li>
                        <li
                          className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-2"
                          onClick={handleDelete}
                        >
                          Delete
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table for larger screen  */}

      <div className="relative bg-primary mt-4 rounded-xl overflow-x-auto lg:pb-20 h-full w-full">
        <table className="w-full text-center border-collapse hidden lg:table">
          {tableConfig.title && (
            <caption className="px-6 py-4 text-3xl font-semibold text-left rtl:text-right text-dark_blue">
              {tableConfig.title}
            </caption>
          )}
          <thead>
            <tr>
              <th>
                <span className="px-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length >= 5}
                    onChange={selectFirstFiveRow}
                  />
                </span>
              </th>

              {/* Table Column Head  */}
              {tableColConfig?.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="py-5 px-4 text-dark_blue font-bold text-sm"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((data, index) => (
              <tr key={index} className={`border-t border-gray`}>
                {/* Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(data.id)}
                    onChange={() => handleCheckboxChange(data.id)}
                  />
                </td>

                {/* Name Column */}
                {data.full_name && (
                  <td className="py-8">
                    <div className="flex items-center gap-2 mr-6">
                      { data.image ?
                        
                        <img src={data.image} alt="profile" />
                        : <span className="bg-blue_gray w-12 h-12 rounded-full"></span>
                        }
                      <span className="text-dark_blue font-bold text-sm">
                        {data.full_name}
                      </span>
                    </div>
                  </td>
                )}

                <td className="p-6 text-sm text-violet font-bold">
                  <span>{data.custom_id}</span>
                </td>

                {/* Date and Time Column */}
                <td className="text-sm text-id_gray">
                  <div className="mr-2">
                    <span className="whitespace-nowrap">{data.joining_date}</span>{" "}
                    {data.time}
                  </div>
                </td>

                {/* ID Column */}
                <td className="py-4 text-dark_blue text-center font-semibold">
                  {data.completed_services}
                </td>

                {/* Location Column */}
                <td className="py-4 text-dark_blue font-semibold text-sm">
                  {data.address}
                </td>

                {/* Contact Column */}
                <td className="py-4">
                  <div className="flex gap-2">
                    <a
                      href={`tel:${data.phone_number}`}
                      className="p-1 bg-violet bg-opacity-10 rounded-full cursor-pointer"
                    >
                      <img
                        className="min-w-5"
                        src="/phone-icon.svg"
                        alt="phone"
                      />
                    </a>
                    <a
                      href={`mailto:${data.email}`}
                      className="p-1 bg-violet bg-opacity-10 rounded-full cursor-pointer"
                    >
                      <img
                        className="min-w-5"
                        src="/email-icon.svg"
                        alt="email"
                      />
                    </a>
                  </div>
                </td>

                {/* Status Column */}
                <td className="py-4">
                  <span
                    className={`flex items-center justify-center ${
                      data.status === "Active"
                        ? "bg-fluracent_green"
                        : "bg-orange"
                    } text-primary text-sm w-24 h-10 inline-block rounded-full font-medium whitespace-nowrap`}
                  >
                    {data.status}
                  </span>
                </td>

                {/* Additional Actions Column */}
                <td className="p-6">
                  <div className="relative">
                    <span
                      className="h-3 inline-block cursor-pointer"
                      onClick={() => toggleAction(data.id)}
                    >
                      <img src="/actions-icon.svg" alt="action" />
                    </span>
                    <ul
                      className={`absolute z-20 top-6 right-6 shadow-lg rounded-md overflow-hidden ${
                        openActionId === data.id ? "block" : "hidden"
                      }`}
                    >
                      {role === "dealer" ? (
                        <>
                          <li
                            className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-1 border-b border-gray"
                            onClick={() => handleView(data.id)}
                          >
                            View
                          </li>
                          <li className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-1">
                            <Link to={'verify/4'}>
                            Verify
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-1 border-b border-gray"
                            onClick={() => handleView(data.id)}
                          >
                            View
                          </li>
                          <li
                            className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-1 border-b border-gray"
                            onClick={handleEdit}
                          >
                            Edit
                          </li>
                          <li
                            className="bg-primary text-sm cursor-pointer hover:bg-slate-100 px-7 py-1"
                            onClick={handleDelete}
                          >
                            Delete
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination  */}

        <div className="lg:absolute w-full bottom-0 flex justify-between px-6 py-4 flex-wrap space-y-4 md:space-y-0">
          <span className="text-sm">
            showing <span className="text-violet">1-5</span> from{" "}
            <span className="text-violet">100</span> data
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1 ? true : false}
              className={` ${
                currentPage <= 1
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              }`}
            >
              <img src="/prevsolid-icon.svg" alt="previous" />
            </button>
            <div className="flex space-x-2">
              {pageNumbers.map((number) => (
                <span
                  key={number}
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center h-10 w-10 border border-solid border-violet font-medium rounded-full cursor-pointer ${
                    number === currentPage
                      ? "bg-violet text-primary shadow-[0px_7px_16px_0px_#00000024]"
                      : "text-violet"
                  }`}
                >
                  {number}
                </span>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= pageNumbers.length ? true : false}
              className={`${
                currentPage >= pageNumbers.length
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              }`}
            >
              <img src="/nextsolid-icon.svg" alt="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReUsableTable;
