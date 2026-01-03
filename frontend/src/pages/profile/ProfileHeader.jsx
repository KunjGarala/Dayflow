// src/components/profile/ProfileHeader.jsx
import { Pencil } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center">
          <Pencil />
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          <div>
            <h2 className="text-xl font-semibold">My Name</h2>
            <p>Login ID</p>
            <p>Email</p>
            <p>Mobile</p>
          </div>

          <div>
            <p>Company</p>
            <p>Department</p>
            <p>Manager</p>
            <p>Location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
