import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FarmerHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 py-20 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
          Empowering Farmers with Smart Market Access 🌾
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-8">
          Connect directly with buyers, post your crops, generate mandi tokens,
          and track your turn — all in one digital platform.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Post Your Crop
          </Button>
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
            Generate Token for Mandi
          </Button>
        </div>
      </motion.div>

      {/* Decorative Image or Illustration */}
    <div className="absolute bottom-0 left-0 right-0 opacity-30">
  <img
    src="/img/farmer-illustration.png"
    alt="Farmer Illustration"
    className="w-[40%] h-full "
  />
</div>
    </section>
  );
}
