import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BUYER_API_END_POINT } from "@/utils/constant";

const EditRequirementDialog = ({ open, setOpen, requirement }) => {
  const [form, setForm] = useState(requirement);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.put(`${BUYER_API_END_POINT}/${requirement._id}`, form);
      alert("Updated successfully!");
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
          <DialogTitle>Edit Requirement</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input name="product" value={form.product} onChange={handleChange} placeholder="Product" />
          <Input name="mandi" value={form.mandi} onChange={handleChange} placeholder="Mandi" />
          <Input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
          <Input name="priceRange" value={form.priceRange} onChange={handleChange} placeholder="Price Range" />
          <Input name="needed" value={form.needed} onChange={handleChange} placeholder="Needed" />

          <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRequirementDialog;
