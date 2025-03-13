import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../core/common/dataTable/index";

interface TableData {
  date: string;
  visitor: number;
}

const Visitor: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // Dummy data array
  const [data, setData] = useState<TableData[]>([
    { date: "01-03-2025", visitor: 10 },
    { date: "02-03-2025", visitor: 15 },
    { date: "03-03-2025", visitor: 20 },
    { date: "04-03-2025", visitor: 12 },
    { date: "05-03-2025", visitor: 18 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter data according to selected date range
    if (fromDate && toDate) {
      const filteredData = data.filter((item) => {
        const itemDate = new Date(
          item.date.split("-").reverse().join("-")
        ).getTime();
        return (
          itemDate >= fromDate.getTime() && itemDate <= toDate.getTime()
        );
      });
      setData(filteredData);
    }

    console.log({ fromDate, toDate });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) =>
        new Date(a.date.split("-").reverse().join("-")).getTime() -
        new Date(b.date.split("-").reverse().join("-")).getTime(),
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* From Date */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label fw-bold">From Date:</label>
                    <div className="input-group">
                      <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="form-control"
                        placeholderText="dd-mm-yyyy"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-calendar"></i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* To Date */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label fw-bold">To Date:</label>
                    <div className="input-group">
                      <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="form-control"
                        placeholderText="dd-mm-yyyy"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-calendar"></i>
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

            {/* Data Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <Table
                      dataSource={data}
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
