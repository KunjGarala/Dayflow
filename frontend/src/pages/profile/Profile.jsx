// src/pages/Profile.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import TopNavbar from "../../components/TopNavbar";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

/**
 * Profile Page
 * View-only profile for logged-in user (non-editable)
 * HR users can edit salary info
 */
const Profile = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useSelector((state) => state.auth);
  const isHR = user?.role === "HR";

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          {!isHR && (
            <p className="text-sm text-gray-500 mt-1">View-only mode</p>
          )}
        </div>
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </div>
  );
};

export default Profile;
