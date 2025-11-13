import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ViewRequirementDialog = ({ open, setOpen, requirement }) => {
  if (!requirement) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-700">Requirement Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Product:</strong> {requirement.product}</p>
          <p><strong>Mandi:</strong> {requirement.mandi}</p>
          <p><strong>Location:</strong> {requirement.location}</p>
          <p><strong>Price Range:</strong> {requirement.priceRange}</p>
          <p><strong>Needed:</strong> {requirement.needed}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRequirementDialog;
