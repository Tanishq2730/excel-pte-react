
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../core/common/commonSelect";
import {
  customerName,
  productName,
} from "../../core/common/selectoption/selectoption";
import { DatePicker } from "antd";
import { Editor } from 'primereact/editor';
import { useState } from "react";
import { all_routes } from "../router/all_routes";

const AddInvoice = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const routes = all_routes;
  const navigation = useNavigate();

  const navigationPath = () => {
    navigation(routes.accountsInvoices);
  };
  return (
    <div>
      {" "}
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content content-two">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Add Invoice</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.teacherList}>Finance &amp; Accounts</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Invoice
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="card">
                  <div className="card-body pb-0">
                    {/* Customer Information */}
                    <div className="card">
                      <div className="card-header bg-light">
                        <div className="d-flex align-items-center">
                          <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                            <i className="ti ti-user-check fs-16" />
                          </span>
                          <h4 className="text-dark">Customer Information</h4>
                        </div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="info-section">
                          <div className="row">
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Customer Name
                                </label>
                                <CommonSelect
                                  className="select"
                                  options={customerName}
                                  defaultValue={customerName[0]}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Invoice Number
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Invoice Date
                                </label>
                                <div className="input-icon position-relative">
                                  <span className="input-icon-addon">
                                    <i className="ti ti-calendar" />
                                  </span>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="Select Date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Plan Info
                                </label>
                                <CommonSelect
                                  className="select"
                                  options={productName}
                                  defaultValue={productName[0]}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Quantity</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Quantity"
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Discount%</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Discount Amount"
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Net Amount</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Discount Amount"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-info">
                      <div className="row">
                        
                        <div className="col-xxl-4 col-lg-4">
                          <div className="card invoice-amount-details">
                            <ul>
                              <li>
                                <span>Subtotal</span>
                                <h6>$00.00</h6>
                              </li>
                              <li>
                                <span>Discount</span>
                                <h6>$00.00</h6>
                              </li>
                              <li>
                                <span>Tax</span>
                                <h6>$00.00</h6>
                              </li>
                              <li>
                                <h5>Total</h5>
                                <h5>$00.00</h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button type="button" className="btn btn-light me-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={navigationPath}>
                    Add Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Delete Modal */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-body text-center">
                <span className="delete-icon">
                  <i className="ti ti-trash-x" />
                </span>
                <h4>Confirm Deletion</h4>
                <p>
                  You want to delete all the marked items, this cant be undone
                  once you delete.
                </p>
                <div className="d-flex justify-content-center">
                  <Link
                    to="#"
                    className="btn btn-light me-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-danger">
                    Yes, Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Delete Modal */}
    </div>
  );
};

export default AddInvoice;
