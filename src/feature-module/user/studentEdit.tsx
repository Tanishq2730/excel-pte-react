import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const StudentEdit = () => {
    const routes = all_routes;

    return (
        <>
            <div className="page-wrapper">
                <div className="content content-two">
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2">
                            <h3 className="mb-1">User Edit</h3>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to={routes.adminDashboard}>Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to={routes.userManage}>Users</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Edit User
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <form>
                                <div className="card">
                                    <div className="card-header bg-light">
                                        <h4 className="text-dark">User Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" name="email" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Mobile</label>
                                                    <input type="text" className="form-control" name="mobile" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Country</label>
                                                    <input type="text" className="form-control" name="country" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">State</label>
                                                    <input type="text" className="form-control" name="state" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Post Code</label>
                                                    <input type="text" className="form-control" name="postCode" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" className="form-control" name="password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Roles</label>
                                                    <select className="form-control" name="roles" multiple>
                                                        <option value="admin">Admin</option>
                                                        <option value="user">User</option>
                                                    </select>
                                                    <div className="buttonsselect mt-3">
                                                        <button className="btn btn-primary">Select All</button>
                                                        <button className="btn btn-primary mx-2">Deselect All</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <Link to={routes.userManage} className="btn btn-light me-3">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentEdit;
