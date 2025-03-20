import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, Spin, Alert } from "antd";
import Table from "../../core/common/dataTable/index";
import { fetchVisitors } from "../../api/visitorAPI";

interface TableData {
  createdAt: string; // Matches API field
  count: number; // Matches API field
}
const Visitor: React.FC = () => {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);
  const [data, setData] = useState<TableData[]>([]);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      const response = await fetchVisitors();
  
      if (response.success) {
      console.log(response);
      
        // Ensure the response is in an array format
        const visitorData = Array.isArray(response.data)
          ? response.data
          : [response.data]; // Wrap in an array if it's a single object
  
        setData(visitorData);
        setFilteredData(visitorData);
      } else {
        setError(response.error);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, []);
console.log(data);
console.log(filteredData);


  // ✅ Filter data according to selected date range
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fromDate && toDate) {
      const filtered = data.filter((item) => {
        const itemDate = dayjs(item.createdAt, "DD-MM-YYYY").valueOf();
        return itemDate >= fromDate.valueOf() && itemDate <= toDate.valueOf();
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      sorter: (a: TableData, b: TableData) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      render: (text: string) => dayjs(text).format("DD-MM-YYYY"), // Format date
    },
    {
      title: "Visitor Count",
      dataIndex: "count",
      sorter: (a: TableData, b: TableData) => a.count - b.count,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          <div className="heading mb-4">
            <h2>Visitor</h2>
          </div>
          <div className="card p-4 shadow">
            {/* ✅ Loading and Error Handling */}
            {loading && <Spin size="large" />}
            {error && <Alert message={error} type="error" showIcon />}

            {/* ✅ Form Section */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* From Date */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label fw-bold">From Date:</label>
                    <div className="input-icon position-relative">
                      <DatePicker
                        className="form-control"
                        format="DD-MM-YYYY"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                        placeholder="Select From Date"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* To Date */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label fw-bold">To Date:</label>
                    <div className="input-icon position-relative">
                      <DatePicker
                        className="form-control"
                        format="DD-MM-YYYY"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                        placeholder="Select To Date"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-md-3 mt-auto mb-3">
                  <button type="submit" className="btn btn-info text-white">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>

            {/* ✅ Data Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      dataSource={filteredData}
                      columns={columns}
                      Selection={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitor;
