import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, Spin, Alert, Input, Button } from "antd"; // ✅ Import Button
import Table from "../../core/common/dataTable/index";
import { fetchVisitors } from "../../api/masterAPI";

interface TableData {
  id: number;
  createdAt: string;
  count: number;
}

const Visitor: React.FC = () => {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);
  const [data, setData] = useState<TableData[]>([]);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await fetchVisitors();

      if (response.success) {
        const visitorData = Array.isArray(response.data)
          ? response.data.map((item: any) => ({
              ...item,
              key: item.id, // ✅ Ensure unique key for table
            }))
          : [];

        setData(visitorData);
        setFilteredData(visitorData);
      } else {
        setError(response.error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // ✅ Filter data by date range
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fromDate && toDate) {
      const start = fromDate.startOf("day").valueOf();
      const end = toDate.endOf("day").valueOf();

      const filtered = data.filter((item) => {
        const itemDate = dayjs(item.createdAt).startOf("day").valueOf();
        return itemDate >= start && itemDate <= end;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // ✅ Reset Button Handler
  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setFilteredData(data); // ✅ Reset table data
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: TableData, b: TableData) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      render: (text: string) => dayjs(text).isValid() ? dayjs(text).format("DD-MM-YYYY") : "Invalid Date",
    },
    {
      title: "Visitor Count",
      dataIndex: "count",
      key: "count",
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
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                      placeholder="Select From Date"
                      className="w-100"
                    />
                  </div>
                </div>

                {/* To Date */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label fw-bold">To Date:</label>
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                      placeholder="Select To Date"
                      className="w-100"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-md-3 mt-auto mb-3">
                  <Button type="primary" htmlType="submit" className="w-100">
                    SUBMIT
                  </Button>
                </div>

                {/* Reset Button */}
                <div className="col-md-3 mt-auto mb-3">
                  <Button type="default" onClick={handleReset} className="w-100">
                    RESET
                  </Button>
                </div>
              </div>
            </form>

            {/* ✅ Data Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      key={filteredData.length} // Forces re-render when data updates
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
