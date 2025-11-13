
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const allBuyers = [
  {
    id: 1,
    name: "Sharma Traders",
    mandi: "Lucknow Mandi",
    offerPrice: "₹2050 / quintal",
    crop: "Wheat",
    contact: "sharmatraders@gmail.com",
  },
  {
    id: 2,
    name: "Agro Deals Pvt Ltd",
    mandi: "Lucknow Mandi",
    offerPrice: "₹2100 / quintal",
    crop: "Wheat",
    contact: "agrodeals@gmail.com",
  },
  {
    id: 3,
    name: "Green Harvest Co.",
    mandi: "Kanpur Mandi",
    offerPrice: "₹2250 / quintal",
    crop: "Rice",
    contact: "greenharvest@gmail.com",
  },
];

function Mandi() {
  const { mandi } = useParams();
  const buyers = allBuyers.filter((b) => b.mandi === decodeURIComponent(mandi));
const navigate=useNavigate()
  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Buyers in {mandi}
      </h1>

      <Link to="/" className="text-green-600 underline mb-6 inline-block">
        ← Back to Marketplace
      </Link>

      {buyers.length === 0 ? (
        <p className="text-gray-600">No buyers found for this mandi.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {buyers.map((buyer) => (
            <div
              key={buyer.id}
              className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-700">
                {buyer.name}
              </h2>
              <p>
                <strong>Crop:</strong> {buyer.crop}
              </p>
              <p>
                <strong>Offer Price:</strong> {buyer.offerPrice}
              </p>
              <p>
                <strong>Mandi:</strong> {buyer.mandi}
              </p>
              <p>
                <strong>Contact:</strong> {buyer.contact}
              </p>
              <button className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition" onClick={()=>navigate('contact-buyer')}>
                Contact Buyer
              </button>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mandi;
