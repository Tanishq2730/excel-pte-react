import React, { useState } from "react";

const MockActivity: React.FC = () => {
    const [activeTab, setActiveTab] = useState("results");
    const mockTests = [
        { id: 40 },
        { id: 39 },
        { id: 38 },
        { id: 37 },
        { id: 36 },
        { id: 35 },
        { id: 34 },
        { id: 33 },
    ];
    const pendingmockTests = [
        { id: 40 },
        { id: 39 },
        { id: 38 },
        { id: 37 },
        { id: 36 },
        { id: 35 },
        { id: 34 },
        { id: 33 },
    ];

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "results" ? "active" : ""}`} onClick={() => setActiveTab("results")}>
                                Mock Test Results
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
                                Pending Mock Tests
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content mt-3">
                        {activeTab === "results" && (
                            <div className="row g-4">
                                {mockTests.map((test) => (
                                    <div key={test.id} className="col-md-3">
                                        <div className="card text-center bg-light shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">Full Mock Test {test.id}</h5>
                                                <button className="btn btn-primary">Check Result</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "pending" && (
                            <div className="row g-4">
                            {pendingmockTests.map((test) => (
                                <div key={test.id} className="col-md-3">
                                    <div className="card text-center bg-light shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">Full Mock Test {test.id}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MockActivity;
