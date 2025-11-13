import React, { useEffect, useState } from "react";
import axios from "axios";
import RequirementRow from "./RequirementRow";
import { Card } from "@/components/ui/card";
import { BUYER_API_END_POINT } from "@/utils/constant";

const RequirementsTable = ({requirements,setRequirements}) => {


  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await axios.get(`${BUYER_API_END_POINT}/get-all-requirement`);
        setRequirements(res.data);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };
    fetchRequirements();
  }, []);

  return (
    <Card className="p-4 md:p-6 shadow-md rounded-2xl overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        All Buyer Requirements
      </h2>

      {/* ✅ Responsive Scrollable Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base min-w-[600px]">
          <thead>
            <tr className="bg-green-100">
              <th className="p-3 text-left whitespace-nowrap">Product</th>
              <th className="p-3 text-left whitespace-nowrap">Mandi</th>
              <th className="p-3 text-left whitespace-nowrap">Location</th>
              <th className="p-3 text-left whitespace-nowrap">Price Range</th>
              <th className="p-3 text-left whitespace-nowrap">Needed</th>
              <th className="p-3 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requirements.length > 0 ? (
              requirements.map((req) => (
                <RequirementRow key={req._id} requirement={req} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No requirements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RequirementsTable;
