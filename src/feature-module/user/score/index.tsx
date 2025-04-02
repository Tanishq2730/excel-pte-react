import React, { useState } from "react";
import Tab1 from "./tabs/tab1";
import Tab2 from "./tabs/tab2";
import Tab3 from "./tabs/tab3";
import Tab4 from "./tabs/tab4";
import Tab5 from "./tabs/tab5";

const Index = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Score Card", "Speaking", "Writing", "Reading", "Listening"];
    const components = [<Tab1 />, <Tab2 />, <Tab3 />, <Tab4/>, <Tab5/>];

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }} className="scorecard">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                style={{
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    background: activeTab === index ? "#5de1e6" : "#fff",
                                    color: activeTab === index ? "#fff" : "#000",
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div>{components[activeTab]}</div>
                </div>
            </div>
        </>
    );
};

export default Index;
