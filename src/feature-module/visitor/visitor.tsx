import React, { useState } from "react";
import dayjs from "dayjs"; // ✅ Import dayjs
import { DatePicker } from "antd";
import Table from "../../core/common/dataTable/index";

interface TableData {
  date: string;
  visitor: number;
}

const Visitor: React.FC = () => {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);

  // ✅ Dummy data array
  const [data, setData] = useState<TableData[]>([
    { date: "01-03-2025", visitor: 10 },
    { date: "02-03-2025", visitor: 15 },
    { date: "03-03-2025", visitor: 20 },
    { date: "04-03-2025", visitor: 12 },
    { date: "05-03-2025", visitor: 18 },
  ]);

  // ✅ Filter data according to selected date range
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fromDate && toDate) {
      const filteredData = data.filter((item) => {
        const itemDate = dayjs(item.date, "DD-MM-YYYY").valueOf();
        return itemDate >= fromDate.valueOf() && itemDate <= toDate.valueOf();
      });
      setData(filteredData);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) =>
        dayjs(a.date, "DD-MM-YYYY").valueOf() -
        dayjs(b.date, "DD-MM-YYYY").valueOf(),
    },
    {
      title: "Visitor",
      dataIndex: "visitor",
      sorter: (a: TableData, b: TableData) => a.visitor - b.visitor,
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
                        value={toDate}
                        onChange={(date) => setToDate(date)}
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
                      dataSource={data}
                      columns={columns}
                      // rowKey="date"
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
