import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // ✅ Importing Table component

// ✅ Define Types for Booking Data
interface BookingData {
  id: number;
  userName: string;
  email: string;
  phone: string;
  plan: string;
  batchCode: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  status: string;
}

const Booking: React.FC = () => {
  // ✅ Sample Data
  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: 1,
      userName: "ajay",
      email: "devenderthakur0015@gmail.com",
      phone: "9729247268",
      plan: "3 Day Free Trial",
      batchCode: "1193EPTE",
      bookingDate: "2025-03-19 05:14:53",
      startDate: "2025-03-19",
      endDate: "2025-03-21",
      status: "Active",
    },
    {
      id: 2,
      userName: "Mohammed Awaizuddin",
      email: "awaisuddin45@gmail.com",
      phone: "0469389835",
      plan: "4 Weeks",
      batchCode: "1194EPTE",
      bookingDate: "2025-03-19 01:43:45",
      startDate: "2025-03-19",
      endDate: "2025-04-16",
      status: "Active",
    },
  ]);

  // ✅ Table Columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Plan",
      dataIndex: "plan",
    },
    {
      title: "Batch Code",
      dataIndex: "batchCode",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span
          className={`badge ${
            status === "Active" ? "bg-success" : "bg-danger"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card p-4">
          <h3 className="mb-3">Booking</h3>
          <Table dataSource={bookings} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
