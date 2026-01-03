// src/components/profile/ProfileTabs.jsx
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import ResumeTab from "./ResumeTab";
import PrivateInfoTab from "./PrivateInfoTab";
import SalaryInfoTab from "./SalaryInfoTab";
import SecurityTab from "./SecurityTab";

const ProfileTabs = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("resume");

  const tabs = [
    { key: "resume", label: "Resume" },
    { key: "private", label: "Private Info" },
    { key: "salary", label: "Salary Info" },
    { key: "security", label: "Security" },
  ];

  return (
    <div className="bg-white mt-6 rounded-lg shadow p-6">
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "resume" && <ResumeTab />}
      {activeTab === "private" && <PrivateInfoTab />}
      {activeTab === "salary" && <SalaryInfoTab />}
      {activeTab === "security" && <SecurityTab />}
    </div>
  );
};

export default ProfileTabs;
