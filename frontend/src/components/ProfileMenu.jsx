import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="absolute right-0 bg-white shadow rounded">
      <button
        onClick={() => navigate("/profile")}
        className="block px-4 py-2 w-full text-left"
      >
        My Profile
      </button>

      <button
        onClick={handleLogout}
        className="block px-4 py-2 w-full text-left text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
