import axios from "../utils/axios";

export default function CheckInOut() {
  const handleCheckIn = async () => {
    try {
      await axios.post("/attendance/check-in");
      window.location.reload();
    } catch (err) {
      console.error("Error checking in:", err);
      alert("Failed to check in. Please try again.");
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post("/attendance/check-out");
      window.location.reload();
    } catch (err) {
      console.error("Error checking out:", err);
      alert("Failed to check out. Please try again.");
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleCheckIn}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Check In
      </button>

      <button
        onClick={handleCheckOut}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Check Out
      </button>
    </div>
  );
}
