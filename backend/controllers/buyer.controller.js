import { BuyerRequirement } from "../models/buyer.model.js";

// ✅ Create Requirement
export const createRequirement = async (req, res) => {
  try {
    const requirement = new BuyerRequirement(req.body);
    await requirement.save();
    res.status(201).json({ message: "Requirement added successfully", requirement });
  } catch (error) {
    console.error("Error creating requirement:", error);
    res.status(500).json({ message: "Failed to add requirement" });
  }
};

// ✅ Get All Requirements
export const getAllRequirements = async (req, res) => {
  try {
    const requirements = await BuyerRequirement.find().populate("buyer", "fullname email");
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ message: "Failed to fetch requirements" });
  }
};

// ✅ Update Requirement
export const updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequirement = await BuyerRequirement.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated doc
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    res.status(200).json({
      message: "Requirement updated successfully",
      requirement: updatedRequirement,
    });
  } catch (error) {
    console.error("Error updating requirement:", error);
    res.status(500).json({ message: "Failed to update requirement" });
  }
};

// ✅ Delete Requirement
export const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BuyerRequirement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    res.status(200).json({ message: "Requirement deleted successfully" });
  } catch (error) {
    console.error("Error deleting requirement:", error);
    res.status(500).json({ message: "Failed to delete requirement" });
  }
};
