import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import ViewRequirementDialog from "./ViewRequirementDialog";

import DeleteRequirementDialog from "./DeleteRequirementDialog";
import { Button } from "@/components/ui/button";
import EditRequirementDialog from "./EditRequirement";

const RequirementRow = ({ requirement }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <tr className="border-b hover:bg-green-50">
        <td className="p-3">{requirement.product}</td>
        <td className="p-3">{requirement.mandi}</td>
        <td className="p-3">{requirement.location}</td>
        <td className="p-3">{requirement.priceRange}</td>
        <td className="p-3">{requirement.needed}</td>
        <td className="p-3 text-center flex justify-center gap-3">
          <Button variant="ghost" onClick={() => setViewOpen(true)}>
            <Eye className="w-5 h-5 text-blue-500" />
          </Button>
          <Button variant="ghost" onClick={() => setEditOpen(true)}>
            <Edit className="w-5 h-5 text-yellow-500" />
          </Button>
          <Button variant="ghost" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="w-5 h-5 text-red-500" />
          </Button>
        </td>
      </tr>

      {/* Popups */}
      <ViewRequirementDialog open={viewOpen} setOpen={setViewOpen} requirement={requirement} />
      <EditRequirementDialog open={editOpen} setOpen={setEditOpen} requirement={requirement} />
      <DeleteRequirementDialog open={deleteOpen} setOpen={setDeleteOpen} requirementId={requirement._id} />
    </>
  );
};

export default RequirementRow;
