// src/components/profile/ProfileHeader.jsx
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.auth);

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.identifier) {
      return user.identifier.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {getInitials()}
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-600">Login ID: {user?.identifier || "N/A"}</p>
            <p className="text-gray-600">Email: {user?.identifier || "N/A"}</p>
            {user?.mobileNumber && (
              <p className="text-gray-600">Mobile: {user.mobileNumber}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600">Company: {user?.companyName || "N/A"}</p>
            <p className="text-gray-600">Department: {user?.department || "N/A"}</p>
            <p className="text-gray-600">Role: {user?.role || "N/A"}</p>
            {user?.location && (
              <p className="text-gray-600">Location: {user.location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
