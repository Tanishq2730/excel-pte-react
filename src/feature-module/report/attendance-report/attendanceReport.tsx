import React, { useEffect, useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { data, Link } from "react-router-dom";
import dayjs from 'dayjs';
import { fetchAttendanceReport } from '../../../api/masterAPI'; // Update this path as needed
import { all_routes } from '../../router/all_routes';

const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
].map((m, i) => ({
  label: m,
  value: i + 1,
}));

const currentYear = dayjs().year();
const yearOptions = Array.from({ length: 10 }, (_, i) => ({
  label: (currentYear - i).toString(),
  value: currentYear - i,
}));

interface AttendanceRecord {
  key: string;
  name: string;
  [key: string]: string;
}

const AttendanceReport = () => {
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [year, setYear] = useState<number>(currentYear);
  const routes = all_routes;
  const [columns, setColumns] = useState<ColumnsType<AttendanceRecord>>([]);
  const [dataSource, setDataSource] = useState<AttendanceRecord[]>([]);

  const generateTableData = (data: any[]) => {
    const totalDays = dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth();

    const baseColumns: ColumnsType<AttendanceRecord> = [
      {
        title: 'Student Name',
        dataIndex: 'name',
        fixed: 'left',
        width: 200,
        render: (text: string) => <strong>{text}</strong>,
      },
    ];

    const dynamicColumns: ColumnsType<AttendanceRecord> = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const dateKey = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');

      return {
        title: () => <span>{day.toString().padStart(2, '0')} - {dayjs(dateKey).format('ddd')}</span>,
        dataIndex: `${day}`,
        width: 100,
        render: (status: string) => {
          let color = 'gray';
          if (status === 'Present') color = 'green';
          else if (status === 'Absent') color = 'red';
          else if (status === 'Leave') color = 'blue';
          else if (status === 'Not Marked') color = 'orange';

          return <span style={{ color }}>{status || '-'}</span>;
        },
      };
    });

    setColumns([...baseColumns, ...dynamicColumns]);

    const formattedData = data.map((item: any, index: number) => {
      const record: AttendanceRecord = {
        key: `${index}`,
        name: item.name,
      };

      for (let i = 1; i <= totalDays; i++) {
        const dateStr = dayjs(`${year}-${month}-${i}`).format('YYYY-MM-DD');
        record[`${i}`] = item.attendance?.[dateStr] || '';
      }

      return record;
    });

    setDataSource(formattedData);
  };

  const loadReport = async () => {
    try {
      const res = await fetchAttendanceReport(month, year);
      console.log(res.data);

      generateTableData(res.data); // assumes response is { data: [...] }
    } catch (error) {
      console.error('Error fetching attendance report:', error);
    }
  };

  useEffect(() => {
    if (month && year) {
      loadReport();
    }
  }, [month, year]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Student Attendance</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={routes.adminDashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Report</Link>
                </li>
                <li className="breadcrumb-item active">Student Attendance</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-0 py-3">
            <Row style={{ marginBottom: 16 }}>
              <Col>
                <Select
                  style={{ width: 150 }}
                  placeholder="Select Month"
                  value={month}
                  onChange={(value) => setMonth(value)}
                  options={monthOptions}
                />
              </Col>
              <Col>
                <Select
                  style={{ width: 150 }}
                  placeholder="Select Year"
                  value={year}
                  onChange={(value) => setYear(value)}
                  options={yearOptions}
                />
              </Col>
            </Row>

            <Table
              key={dataSource.length}
              bordered
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 50 }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendanceReport;
