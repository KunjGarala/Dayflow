import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarDropdown from "./AvatarDropdown";

/**
 * Top Navigation Bar Component
 * Includes tabs, search bar, and avatar dropdown
 * Improved design for both HR and Employees
 */
const TopNavbar = ({ 
  onSearch, 
  searchValue: externalSearchValue, 
  setSearchValue: externalSetSearchValue, 
  showSearch = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isHR = user?.role === "HR";
  
  // Internal state for search if not provided via props
  const [internalSearchValue, setInternalSearchValue] = useState("");
  
  // Use external state if provided, otherwise use internal state
  const searchValue = externalSearchValue !== undefined ? externalSearchValue : internalSearchValue;
  const setSearchValue = externalSetSearchValue || setInternalSearchValue;

  // HR Navigation Tabs
  const hrTabs = [
    { key: "company", label: "Company Info", path: "/company", exact: false },
    { key: "employees", label: "Employees", path: "/dashboard", exact: false },
    { key: "attendance", label: "Attendance", path: "/attendance", exact: true },
    { key: "timeoff", label: "Time Off", path: "/timeoff", exact: true },
    { key: "profile", label: "Profile", path: "/profile", exact: true },
  ];

  // Employee Navigation Tabs
  const employeeTabs = [
    { key: "employees", label: "All Employees", path: "/dashboard", exact: false },
    { key: "attendance", label: "My Attendance", path: "/my-attendance", exact: true },
    { key: "timeoff", label: "My Time Off", path: "/my-timeoff", exact: true },
    { key: "profile", label: "My Profile", path: "/profile", exact: true },
  ];

  const tabs = isHR ? hrTabs : employeeTabs;

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    // For non-exact paths, check if current path starts with the tab path
    // But exclude sub-routes like /employees/:id
    if (path === "/dashboard") {
      return location.pathname === path || 
             (location.pathname.startsWith("/dashboard") && !location.pathname.includes("/employees/"));
    }
    if (path === "/company") {
      return location.pathname === path || location.pathname.startsWith("/company");
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Logo and Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Logo - Hidden on small screens if tabs are visible */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Dayflow HRMS
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.path)}
                  className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm transition-all duration-200 rounded-md whitespace-nowrap flex-shrink-0 ${
                    isActive(tab.path, tab.exact)
                      ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Search Bar */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Mobile Search Icon */}
          {showSearch && (
            <button
              onClick={() => {
                // Toggle mobile search - you can implement a mobile search modal here
                const searchInput = document.querySelector('input[type="text"][placeholder="Search employees..."]');
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* Right: Avatar */}
          <div className="relative flex-shrink-0">
            <AvatarDropdown />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
