import { Cloud, Sprout, ThumbsUp, TrendingUp } from 'lucide-react'
import React from 'react'

function Boxes() {
  return (
    <>
 <main className=" flex flex-col items-center mt-16 space-y-10 my-5">
        {/* Top Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-2">
          <div className="bg-amber-800 text-white w-40 md:w-50 h-28 rounded-xl flex flex-col items-center justify-center shadow-md hover:cursor-pointer">
            <Sprout size={50} className="mb-2" />
            <p className="font-semibold">Crops in demand</p>
          </div>

          <div className="bg-sky-400 text-white w-40 md:w-50 h-28 rounded-xl flex flex-col items-center justify-center shadow-md hover:cursor-pointer">
            <Cloud size={50} className="mb-2" />
            <p className="font-semibold">Weather report</p>
          </div>

          <div className="bg-red-400 text-white w-40 md:w-50 h-28 rounded-xl flex flex-col items-center justify-center shadow-md hover:cursor-pointer">
            <TrendingUp size={50} className="mb-2" />
            <p className="font-semibold">Market trends</p>
          </div>

          <div className="bg-yellow-300 text-black w-40 md:w-50 h-28 rounded-xl flex flex-col items-center justify-center shadow-md hover:cursor-pointer">
            <ThumbsUp size={50} className="mb-2" />
            <p className="font-semibold">Feedback</p>
          </div>
        </div>
</main>
    </>
  )
}

export default Boxes