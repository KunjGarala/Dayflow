// src/pages/Profile.jsx
    import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
};

export default Profile;
