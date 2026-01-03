import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import EmployeeCardView from "../../components/EmployeeCardView";
import CheckInOutPanel from "../../components/CheckInOutPanel";
import { employeeAPI } from "../../apis";

/**
 * Employee Dashboard - Landing Page After Login
 * Shows employee listing with search, check-in/out panel
 */
const EmployeeDashboardNew = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchEmployees();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterEmployees();
  }, [searchValue, employees]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data || []);
      setFilteredEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    if (!searchValue.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const searchLower = searchValue.toLowerCase();
    const filtered = employees.filter((emp) => {
      const name = (emp.name || emp.fullName || "").toLowerCase();
      const email = (emp.email || emp.identifier || "").toLowerCase();
      const department = (emp.department || "").toLowerCase();
      const position = (emp.jobPosition || "").toLowerCase();
      const employeeId = (emp.employeeId || "").toLowerCase();

      return (
        name.includes(searchLower) ||
        email.includes(searchLower) ||
        department.includes(searchLower) ||
        position.includes(searchLower) ||
        employeeId.includes(searchLower)
      );
    });

    setFilteredEmployees(filtered);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Employee Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading employees...</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">
                  {searchValue ? "No employees found matching your search." : "No employees found."}
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Employees ({filteredEmployees.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredEmployees.map((employee) => (
                    <EmployeeCardView key={employee.id} employee={employee} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Check-In/Out Panel */}
          <div className="lg:col-span-1">
            <CheckInOutPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardNew;

