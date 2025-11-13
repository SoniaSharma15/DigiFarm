import Popup from "@/components/buyer/Popup";
import RequirementsChart from "@/components/buyer/requirement/RequirementsChart";
import RequirementsTable from "@/components/buyer/requirement/RequirementsTable";
import React, { useState } from "react";

const BuyerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [requirements, setRequirements] = useState([]);
  // ✅ Add new requirement to local state immediately
  const handleRequirementAdded = (newReq) => {
    setRequirements((prev) => [newReq, ...prev]);
  };
   return (
    <div>
      {/* Add Requirement Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all mx-2 md:mx-5"
      >
        ➕ Add Requirement
      </button>
<Popup  showModal={showModal} setShowModal={setShowModal} onRequirementAdded={handleRequirementAdded}/>
    <RequirementsTable requirements={requirements} setRequirements={setRequirements}/>
    <RequirementsChart requirements={requirements} setRequirements={setRequirements}/>
    </div>
  );
};

export default BuyerDashboard;
