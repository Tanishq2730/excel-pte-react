import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { fetchAllMockTests, deleteMockTests } from "../../api/masterAPI";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

// ✅ Define Types
interface MockTest {
  id: number;
  name: string;
  typeId: number;
  mocktestType: string;
  Type: {
    id: number;
    name: string;
  };
}

const MockList: React.FC = () => {
  const routes = all_routes;
  const [data, setData] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch Mock Tests from API
  useEffect(() => {
    loadMockTests();
  }, []);

  const loadMockTests = async () => {
    try {
      const response = await fetchAllMockTests();
      if (response.success) {
        setData(response.data); // ✅ Store API data
      } else {
        console.error("Failed to fetch mock tests");
      }
    } catch (error) {
      console.error("Error fetching mock tests:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Delete with SweetAlert
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteMockTests(id);
          if (response.success) {
            Swal.fire("Deleted!", "Mock test has been deleted.", "success");
            loadMockTests(); // ✅ Refresh data
          } else {
            Swal.fire("Error!", "Failed to delete mock test.", "error");
          }
        } catch (error) {
          console.error("Error deleting mock test:", error);
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  // ✅ Define Table Columns
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Mock Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: ["Type", "name"], key: "type" }, // ✅ Fetch nested Type.name
    { title: "Mock Test Type", dataIndex: "mocktestType", key: "mocktestType" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MockTest) => (
        <>
          <Link to={`/mocktest/edit/${record.id}`} className="btn btn-warning me-2">
            <i className="fa fa-pencil"></i>
          </Link>
          {/* <Link to={`/mocktest/view/${record.id}`} className="btn btn-info me-2">
            <i className="fa fa-eye"></i>
          </Link>
          <Link to={`/mocktest/add/${record.id}`} className="btn btn-primary me-2">
            <i className="fa fa-plus"></i>
          </Link> */}
          <button className="btn btn-danger" onClick={() => handleDelete(record.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Mock Test List</h2>
        </div>
        <div className="card p-4">
          <div className="mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table dataSource={data} columns={columns} Selection={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockList;
