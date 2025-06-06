import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { DatatableProps } from "../../data/interface";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const StudentDatatable: React.FC<DatatableProps> = ({ columns, dataSource, Selection }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [Selections, setSelections] = useState<any>(true);
  const [filteredDataSource, setFilteredDataSource] = useState(dataSource);

  useEffect(() => {
    setSelections(Selection);
  }, [Selection]);

  useEffect(() => {
    setFilteredDataSource(dataSource);
  }, [dataSource]);

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = dataSource.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredDataSource(filteredData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // --- Excel export function ---
  const exportToExcel = () => {
    // Map your dataSource to an array of objects with only the keys you want to export
    const exportData = filteredDataSource.map((item: any) => {
      const obj: Record<string, any> = {};
      columns.forEach((col) => {
        // col.dataIndex can be a string or an array or undefined
        if (typeof col.dataIndex === "string") {
          obj[col.title as string] = item[col.dataIndex];
        }
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "datatable_export.xlsx");
  };

  return (
    <>
      <div className="table-top-data d-flex px-3 justify-content-between">
        <div className="page-range"></div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="search"
            className="form-control form-control-sm mb-3 w-auto"
            value={searchText}
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
            aria-controls="DataTables_Table_0"
          />
          <Button type="primary" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </div>
      </div>
      {!Selections ? (
        <Table
          className="table datanew dataTable no-footer"
          columns={columns}
          rowHoverable={false}
          dataSource={filteredDataSource}
          pagination={{
            locale: { items_per_page: "" },
            nextIcon: <span>Next</span>,
            prevIcon: <span>Prev</span>,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      ) : (
        <Table
          className="table datanew dataTable no-footer"
          // rowSelection={rowSelection}
          columns={columns}
          rowHoverable={false}
          dataSource={filteredDataSource}
          pagination={{
            locale: { items_per_page: "" },
            nextIcon: <span>Next</span>,
            prevIcon: <span>Prev</span>,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      )}
    </>
  );
};

export default StudentDatatable;
