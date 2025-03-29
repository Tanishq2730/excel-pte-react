import React from "react";
import Table from "../../core/common/dataTable/index";

const MembershipHistory: React.FC = () => {
  const predictions = [
    {
      id: 1,
      title: "AbdulAleem Mohammed",
      email: "rafeyaleem@gmail.com",
      phone: "03354210801",
      plan: "3 Mock Tests",
      batch_code: "122EPTE",
      booking_date: "2025-03-29 08:20:39",
      start_date: "2025-03-29",
      end_date: "2025-04-18",
      status: "Not Active",
    },
    {
      id: 2,
      title: "Saad Jamil Sandhu",
      email: "connecttosaad@gmail.com",
      phone: "03354210801",
      plan: "6 Months",
      batch_code: "1214EPTE",
      booking_date: "2025-03-28 23:50:15",
      start_date: "2025-03-28",
      end_date: "2025-09-28",
      status: "Active",
    },
    {
      id: 3,
      title: "shaija devasia",
      email: "shaijadevasia25@gmail.com",
      phone: "447586579007",
      plan: "4 Weeks",
      batch_code: "1214EPTE",
      booking_date: "2025-03-28 06:24:40",
      start_date: "2025-03-28",
      end_date: "2025-04-25",
      status: "Active",
    },
    {
      id: 4,
      title: "aakash",
      email: "aakashghimire260@gmail.com",
      phone: "9815457646",
      plan: "3 Day Free Trial",
      batch_code: "1214EPTE",
      booking_date: "2025-03-27 17:05:39",
      start_date: "2025-03-27",
      end_date: "2025-03-29",
      status: "Active",
    },
    {
      id: 5,
      title: "Trym John",
      email: "johntrymsarker@gmail.com",
      phone: "01310583665",
      plan: "3 Day Free Trial",
      batch_code: "1213EPTE",
      booking_date: "2025-03-27 14:42:20",
      start_date: "2025-03-27",
      end_date: "2025-03-29",
      status: "Active",
    },
  ];

  const columns = [
    { title: "User Name", dataIndex: "title", key: "title" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Plan", dataIndex: "plan", key: "plan" },
    { title: "Batch Code", dataIndex: "batch_code", key: "batch_code" },
    { title: "Booking Date", dataIndex: "booking_date", key: "booking_date" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Membership History</h2>
        </div>
        <div className="card p-4">
          <Table key={predictions.length} dataSource={predictions} columns={columns} Selection={true} />
        </div>
      </div>
    </div>
  );
};

export default MembershipHistory;
