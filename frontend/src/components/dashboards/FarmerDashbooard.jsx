import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Plus, Edit3, Trash2, X, Upload } from 'lucide-react'; // Using lucide-react for icons

// ⚠️ IMPORTANT: Verify your backend URL (Node.js/Express)
const API_BASE_URL = 'http://localhost:5000/api/v1'; 

// --- Initial Data Structure for New/Edited Crop ---
const initialCropData = {
  cropTitle: '',
  cropCategory: '',
  quantity: 0,
  sellingPrice: 0,
  location: '',
  mandiName: '',
  pinCode: '',
  comment: '', // Comment is optional
  dateOfSale: '',
  status: 'Available',
  // File placeholders (Note: Actual file upload needs FormData and a separate endpoint)
  images: [], 
  video: null,
};

// --- Modal Component ---
const CropListingModal = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState(initialCropData);
  const [fileErrors, setFileErrors] = useState({});

  useEffect(() => {
    // Load data when modal opens in edit mode
    if (initialData && initialData._id) {
      setFormData({
        ...initialCropData, // Use initial structure to ensure all fields are present
        ...initialData,
        // Quantity needs to be a number for input type="number"
        quantity: parseFloat(initialData.quantity) || 0,
        sellingPrice: parseFloat(initialData.sellingPrice) || 0,
        pinCode: initialData.pinCode || '',
      });
    } else if (isOpen && !isEditing) {
      // Reset form for adding new crop
      setFormData(initialCropData);
    }
  }, [initialData, isOpen, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const newErrors = {};
      
      if (name === 'images') {
        const fileArray = Array.from(files);
        
        // 1. Max file count check
        if (fileArray.length > 5) {
          newErrors.images = 'Maximum 5 images allowed.';
        }
        
        // 2. Max size check (6MB per image)
        fileArray.forEach(file => {
          if (file.size > 6 * 1024 * 1024) {
            newErrors.images = 'Each image must be under 6MB.';
          }
        });
        
        setFileErrors(newErrors);
        setFormData(prev => ({ ...prev, images: fileArray }));
        
      } else if (name === 'video') {
        const file = files[0];
        
        // 1. Max size check (50MB)
        if (file && file.size > 50 * 1024 * 1024) {
          newErrors.video = 'Video must be under 50MB.';
        }
        
        setFileErrors(newErrors);
        setFormData(prev => ({ ...prev, video: file }));
      }
    } else if (type === 'number') {
      // Ensure number types are parsed correctly
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(fileErrors).length > 0) {
      alert("Please fix file errors before submitting.");
      return;
    }
    
    // NOTE: In a real app, you would use FormData here to handle file uploads
    // For this example, we only send text/number data to the API.
    const payload = {
      ...formData,
      // Formatting quantity and price back to string for consistency with model/database
      quantity: String(formData.quantity) + (formData.quantity > 0 ? ' kg' : ''), 
      sellingPrice: String(formData.sellingPrice),
    };
    
    onSubmit(payload);
    // Reset form after submission (optional, depends on onSubmit implementation)
    // setFormData(initialCropData); 
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-indigo-700">
            {isEditing ? 'Update Crop Listing' : 'Create New Crop Listing'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-600 rounded-full transition">
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Body: Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 🚨 Updated text to reflect optional comment */}
          <p className="text-sm text-gray-500 border-b pb-2">All fields are mandatory, except Comment.</p>

          {/* Grid Layout for Core Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Crop Title (MANDATORY) */}
            <InputField label="Crop Title" name="cropTitle" value={formData.cropTitle} onChange={handleChange} required />
            
            {/* 2. Crop Category (MANDATORY) */}
            <InputField label="Crop Category (e.g., Cereal, Pulse)" name="cropCategory" value={formData.cropCategory} onChange={handleChange} required />

            {/* 3. Quantity (Number) (MANDATORY) */}
            <InputField label="Quantity (in kg)" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required min="1" step="any" />
            
            {/* 4. Selling Price (Number) (MANDATORY) */}
            <InputField label="Selling Price (per kg/unit)" name="sellingPrice" type="number" value={formData.sellingPrice} onChange={handleChange} required min="0.01" step="0.01" />

            {/* 9. Date of Sale (Date) (MANDATORY) */}
            <InputField label="Target Date of Sale" name="dateOfSale" type="date" value={formData.dateOfSale} onChange={handleChange} required />
            
            {/* Status (Dropdown) (MANDATORY) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="Available">Available</option>
                <option value="Pending Sale">Pending Sale</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>
          </div>

          {/* Location Details */}
          <div className="border-t pt-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Location & Market</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 5. Location (MANDATORY) */}
              <InputField label="Farm Location/City" name="location" value={formData.location} onChange={handleChange} required />
              {/* 6. Mandi Name (MANDATORY) */}
              <InputField label="Nearest Mandi Name" name="mandiName" value={formData.mandiName} onChange={handleChange} required />
              {/* 7. PinCode (MANDATORY) */}
              <InputField label="Pin Code" name="pinCode" type="text" value={formData.pinCode} onChange={handleChange} required pattern="\d{6}" title="Pin Code must be 6 digits" />
            </div>
          </div>

          {/* 8. Comment (Textarea) (OPTIONAL) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (Optional)</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Describe the quality, harvest date, and any special conditions."
              // required attribute is removed here
            ></textarea>
          </div>
          
          {/* File Uploads (Optional) */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Media Upload (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 10. Images Input (Optional) */}
              <FileInput 
                label="Crop Images (Max 5, 6MB each)"
                name="images"
                multiple
                onChange={handleChange}
                error={fileErrors.images}
                currentFiles={formData.images.length}
              />
              
              {/* 11. Video Input (Optional) */}
              <FileInput 
                label="Promotional Video (Max 1, 50MB)"
                name="video"
                onChange={handleChange}
                error={fileErrors.video}
                currentFiles={formData.video ? 1 : 0}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 flex items-center"
            >
              <Upload size={20} className="mr-2" />
              {isEditing ? 'Save Changes' : 'List Crop Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Reusable Input Field Component ---
const InputField = ({ label, name, type = 'text', value, onChange, required, min, step, pattern, title }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      step={step}
      pattern={pattern}
      title={title}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

// --- Reusable File Input Component ---
const FileInput = ({ label, name, multiple, onChange, error, currentFiles }) => (
  <div className="p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      name={name}
      multiple={multiple}
      onChange={onChange}
      className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100 cursor-pointer"
    />
    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    <p className="text-xs text-gray-500 mt-2">
      {multiple ? `Files selected: ${currentFiles}` : currentFiles > 0 ? `File selected.` : `No file selected.`}
    </p>
  </div>
);


// --- Main Dashboard Component ---
const FarmerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null); // Holds the crop object being edited

  // --- API Calls ---
  const fetchCrops = useCallback(async () => {
    try {
      console.log(`Attempting to fetch data from: ${API_BASE_URL}/crops`);
      const response = await axios.get(`${API_BASE_URL}/crops`);
      setCrops(response.data.crops); 
    } catch (error) {
      console.error("Error fetching crops: Network Check Required", error); // 🚨 Added debugging message 🚨
      console.error("-> Ensure your backend server is running and accessible at http://localhost:5000.");
      // Optional: If you want to show a visible message on the dashboard:
      // alert('Could not connect to the backend server. Please check your console for details.');
    }
  }, []);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  // CREATE / UPDATE Operation
  const handleFormSubmit = async (formData) => {
    try {
      if (editingCrop) {
        // UPDATE
        await axios.put(`${API_BASE_URL}/crop/${editingCrop._id}`, formData); 
      } else {
        // CREATE
        // Note: The POST route is /api/v1/crop/new
        await axios.post(`${API_BASE_URL}/crop/new`, formData); 
      }
      
      // Close modal and refresh list
      setIsModalOpen(false);
      setEditingCrop(null);
      fetchCrops(); 
      
    } catch (error) {
      console.error("Error saving crop:", error);
      alert('Error saving crop. Check backend connection and authentication.');
    }
  };

  // DELETE Operation
  const handleDeleteCrop = async (id) => {
    // 🚨 Changed alert() to window.confirm() for browser compatibility and user safety
    if (!window.confirm("Are you sure you want to delete this crop listing?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/crop/${id}`);
      fetchCrops(); 
    } catch (error) {
      console.error("Error deleting crop:", error);
      alert('Error deleting crop. Check backend connection and authentication.');
    }
  };
  
  // Setup Edit Modal
  const handleEditSetup = (crop) => {
    setEditingCrop(crop);
    setIsModalOpen(true);
  };

  // Helper for Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'Pending Sale':
        return 'text-yellow-600 bg-yellow-100';
      case 'Sold Out':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  
  // Helper for Quantity Display (Appends /kg)
  const formatQuantity = (quantity) => {
    // Check if the stored quantity already has units (like "500 kg")
    if (typeof quantity === 'string' && quantity.includes('kg')) {
        return quantity;
    }
    // Otherwise, assume it's a number and format it
    return `${quantity} kg`;
  };


  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
          <span className="mr-3">🚜</span> Farmer's Crop Dashboard
        </h1>
        <button
          onClick={() => { setEditingCrop(null); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-150 flex items-center transform hover:scale-[1.02]"
        >
          <Plus size={20} className="mr-2" />
          Add New Listing
        </button>
      </header>
      
      {/* --- Listed Crops Table --- */}
      <div className="shadow-2xl overflow-hidden rounded-xl bg-white">
        <h2 className="text-xl font-bold p-5 bg-gray-50 text-gray-700 border-b">
          Current Crop Listings ({crops.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">S. No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Crop Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {crops.map((crop, index) => (
                <tr key={crop._id} className="hover:bg-indigo-50 transition duration-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">{crop.cropTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{crop.cropCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatQuantity(crop.quantity)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{crop.sellingPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{crop.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(crop.status)}`}>
                          {crop.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* --- Action Buttons --- */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditSetup(crop)}
                        className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-1 rounded-full hover:bg-indigo-100"
                        title="Edit Listing"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 p-1 rounded-full hover:bg-red-100"
                        title="Delete Listing"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {crops.length === 0 && (
            <div className="p-10 text-center text-gray-500 bg-white">
                <p className="text-lg mb-2">👋 No crops listed yet.</p>
                <p>Click "Add New Listing" to create your first entry.</p>
            </div>
        )}
      </div>

      {/* --- Modal Renderer --- */}
      <CropListingModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingCrop(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingCrop}
        isEditing={!!editingCrop}
      />
    </div>
  );
};

export default FarmerDashboard;