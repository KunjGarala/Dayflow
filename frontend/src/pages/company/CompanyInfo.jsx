import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopNavbar from "../../components/TopNavbar";
import { companyAPI } from "../../apis";

/**
 * Company Info Page
 * Shows company information (HR only)
 */
const CompanyInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      const response = await companyAPI.get();
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company info:", error);
      // Use user's company data as fallback
      setCompany({
        name: user?.companyName || "Company Name",
        avatar: user?.companyAvatar || null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} showSearch={false} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Information</h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading company information...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Company Avatar/Logo */}
              <div className="flex items-center gap-6">
                {company?.avatar ? (
                  <img
                    src={company.avatar}
                    alt="Company Logo"
                    className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {company?.name?.charAt(0) || "C"}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {company?.name || user?.companyName || "Company Name"}
                  </h2>
                  <p className="text-gray-500 mt-1">Company Details</p>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Company Name</p>
                      <p className="text-gray-800 font-medium">
                        {company?.name || user?.companyName || "N/A"}
                      </p>
                    </div>
                    {company?.email && (
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-gray-800">{company.email}</p>
                      </div>
                    )}
                    {company?.phone && (
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-gray-800">{company.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Additional Information
                  </h3>
                  <div className="space-y-3">
                    {company?.address && (
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="text-gray-800">{company.address}</p>
                      </div>
                    )}
                    {company?.website && (
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <p className="text-gray-800">{company.website}</p>
                      </div>
                    )}
                    {company?.industry && (
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p className="text-gray-800">{company.industry}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

