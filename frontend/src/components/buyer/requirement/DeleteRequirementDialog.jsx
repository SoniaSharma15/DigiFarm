import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BUYER_API_END_POINT } from "@/utils/constant";

const DeleteRequirementDialog = ({ open, setOpen, requirementId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BUYER_API_END_POINT}/${requirementId}`);
      alert("Deleted successfully!");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this requirement?</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-red-600 text-white" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRequirementDialog;
