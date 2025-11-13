import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ⚠️ CORRECTED API BASE URL: Must point to your Node.js/Express server, NOT MongoDB.
const API_BASE_URL = 'http://localhost:5000/api/v1'; 

const FarmerDashboard = () => {
  // 1. State for the list of crops
  const [crops, setCrops] = useState([]); 
  // 2. State for the form inputs
  const [newCropName, setNewCropName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStatus, setNewStatus] = useState('Available');
  // 3. State for the ID of the crop being edited (MongoDB '_id')
  const [editingId, setEditingId] = useState(null); 

  // --- READ Operation (Fetch Data on Component Load) ---
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      // GET request to /api/v1/crops
      const response = await axios.get(`${API_BASE_URL}/crops`);
      // The backend returns an object { success: true, crops: [...] }
      setCrops(response.data.crops); 
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  // --- CREATE Operation ---
  const handleAddCrop = async () => {
    if (!newCropName || !newQuantity || !newPrice) return;

    const newCropData = {
      name: newCropName,
      quantity: newQuantity,
      price: newPrice,
      status: newStatus,
    };

    try {
      // POST request to /api/v1/crop/new
      const response = await axios.post(`${API_BASE_URL}/crop/new`, newCropData); 
      
      setCrops([...crops, response.data.crop]); 

      // Clear form fields
      setNewCropName('');
      setNewQuantity('');
      setNewPrice('');
      setNewStatus('Available');
    } catch (error) {
      console.error("Error adding crop:", error);
      alert('Error adding crop. Check backend connection and authentication.');
    }
  };
  
  // Update/Edit Setup (Puts data into form)
  const handleEditSetup = (crop) => {
    setEditingId(crop._id); // Use MongoDB _id
    setNewCropName(crop.name);
    setNewQuantity(crop.quantity);
    setNewPrice(crop.price);
    setNewStatus(crop.status);
  };

  // --- UPDATE Operation ---
  const handleUpdateCrop = async () => {
    if (!editingId) return;

    const updatedCropData = {
      name: newCropName,
      quantity: newQuantity,
      price: newPrice,
      status: newStatus,
    };

    try {
      // PUT request to /api/v1/crop/:id
      const response = await axios.put(`${API_BASE_URL}/crop/${editingId}`, updatedCropData); 

      setCrops(crops.map(crop => (crop._id === editingId ? response.data.crop : crop)));

      // Clear form and reset editing state
      setEditingId(null);
      setNewCropName('');
      setNewQuantity('');
      setNewPrice('');
      setNewStatus('Available');

    } catch (error) {
      console.error("Error updating crop:", error);
      alert('Error updating crop. Check backend connection and authentication.');
    }
  };

  // --- DELETE Operation ---
  const handleDeleteCrop = async (id) => {
    try {
      // DELETE request to /api/v1/crop/:id
      await axios.delete(`${API_BASE_URL}/crop/${id}`);
      
      setCrops(crops.filter(crop => crop._id !== id));
      
    } catch (error) {
      console.error("Error deleting crop:", error);
      alert('Error deleting crop. Check backend connection and authentication.');
    }
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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">🚜 Farmer's Crop Dashboard</h1>

      {/* --- CRUD Form Section --- */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingId ? 'Edit Crop Listing' : 'Add New Crop'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <input
            type="text"
            placeholder="Crop Name"
            value={newCropName}
            onChange={(e) => setNewCropName(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Quantity (e.g., 500 kg)"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Selling Price (e.g., ₹25/kg)"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 h-full"
          >
            <option value="Available">Available</option>
            <option value="Pending Sale">Pending Sale</option>
            <option value="Sold Out">Sold Out</option>
          </select>
          
          {editingId ? (
            <button
              onClick={handleUpdateCrop}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150"
            >
              Update Crop
            </button>
          ) : (
            <button
              onClick={handleAddCrop}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"
            >
              Add Crop
            </button>
          )}
        </div>
      </div>

      {/* --- Listed Crops Table --- */}
      <div className="shadow-lg overflow-hidden rounded-lg">
        <h2 className="text-2xl font-semibold p-4 bg-gray-50 text-gray-700">Listed Crops</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {crops.map((crop, index) => (
              // Key uses the MongoDB '_id'
              <tr key={crop._id} className="hover:bg-gray-50"> 
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{crop.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{crop.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{crop.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(crop.status)}`}>
                        {crop.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSetup(crop)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium text-sm transition duration-150"
                    >
                      Update
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleDeleteCrop(crop._id)} 
                      className="text-red-600 hover:text-red-900 font-medium text-sm transition duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* FIX: Add fallback message if the table is empty */}
        {crops.length === 0 && (
            <div className="p-6 text-center text-gray-500">
                No crops listed yet. Start your backend server and add your first listing!
            </div>
        )}
        
      </div> 
    </div>
  );
};

export default FarmerDashboard;