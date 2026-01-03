// src/components/profile/SalaryInfoTab.jsx
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";

const SalaryInfoTab = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isHR = user?.role === "HR";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    monthWage: 50000,
    yearlyWage: 600000,
    workingDays: 5,
    breakTime: 1,
    basicSalary: 50,
    hra: 50,
    standardAllowance: 4167,
    performanceBonus: 8.33,
    leaveTravelAllowance: 8.33,
    pfEmployee: 12,
    pfEmployer: 12,
    professionalTax: 200,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSave = () => {
    // TODO: Add API call to save salary info
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Salary Information</h3>
        <div className="flex gap-2">
          {!isHR && (
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Read Only
            </span>
          )}
          {isHR && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Edit
            </button>
          )}
          {isHR && isEditing && (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month Wage
            </label>
            {isEditing && isHR ? (
              <input
                type="number"
                name="monthWage"
                value={formData.monthWage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p>₹{formData.monthWage.toLocaleString()}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yearly Wage
            </label>
            {isEditing && isHR ? (
              <input
                type="number"
                name="yearlyWage"
                value={formData.yearlyWage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p>₹{formData.yearlyWage.toLocaleString()}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Days
            </label>
            {isEditing && isHR ? (
              <input
                type="number"
                name="workingDays"
                value={formData.workingDays}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p>{formData.workingDays}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Break Time (Hours)
            </label>
            {isEditing && isHR ? (
              <input
                type="number"
                name="breakTime"
                value={formData.breakTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p>{formData.breakTime} Hr</p>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-4">Salary Components</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Basic Salary</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>%</span>
              </div>
            ) : (
              <span>{formData.basicSalary}%</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>House Rent Allowance</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="hra"
                  value={formData.hra}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>% of Basic</span>
              </div>
            ) : (
              <span>{formData.hra}% of Basic</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Standard Allowance</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <span>₹</span>
                <input
                  type="number"
                  name="standardAllowance"
                  value={formData.standardAllowance}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : (
              <span>₹{formData.standardAllowance.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Performance Bonus</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  name="performanceBonus"
                  value={formData.performanceBonus}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>%</span>
              </div>
            ) : (
              <span>{formData.performanceBonus}%</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Leave Travel Allowance</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  name="leaveTravelAllowance"
                  value={formData.leaveTravelAllowance}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>%</span>
              </div>
            ) : (
              <span>{formData.leaveTravelAllowance}%</span>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-4">Deductions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>PF (Employee)</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="pfEmployee"
                  value={formData.pfEmployee}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>%</span>
              </div>
            ) : (
              <span>{formData.pfEmployee}%</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>PF (Employer)</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="pfEmployer"
                  value={formData.pfEmployer}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span>%</span>
              </div>
            ) : (
              <span>{formData.pfEmployer}%</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Professional Tax</span>
            {isEditing && isHR ? (
              <div className="flex items-center gap-2">
                <span>₹</span>
                <input
                  type="number"
                  name="professionalTax"
                  value={formData.professionalTax}
                  onChange={handleChange}
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : (
              <span>₹{formData.professionalTax}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfoTab;
