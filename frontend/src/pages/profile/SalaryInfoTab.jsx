// src/components/profile/SalaryInfoTab.jsx
import { useAppSelector } from "../../hooks/redux";

const SalaryInfoTab = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isReadOnly = user?.role !== "admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Salary Information</h3>
        {isReadOnly && (
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Read Only
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p>Month Wage: ₹50,000</p>
          <p>Yearly Wage: ₹6,00,000</p>
        </div>
        <div>
          <p>Working Days: 5</p>
          <p>Break Time: 1 Hr</p>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-2">Salary Components</h4>

        <ul className="space-y-1 text-sm">
          <li>Basic Salary – 50%</li>
          <li>House Rent Allowance – 50% of Basic</li>
          <li>Standard Allowance – ₹4167</li>
          <li>Performance Bonus – 8.33%</li>
          <li>Leave Travel Allowance – 8.33%</li>
          <li>Fixed Allowance – Remaining</li>
        </ul>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-2">Deductions</h4>
        <p>PF (Employee): 12%</p>
        <p>PF (Employer): 12%</p>
        <p>Professional Tax: ₹200</p>
      </div>
    </div>
  );
};

export default SalaryInfoTab;
  