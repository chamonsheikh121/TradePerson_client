import { useState } from "react";
import PackageModal from "./Components/PackageModal"
import PackageCard from './Components/PackageCard';

const MembershipPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const isVerified = true;
  
    const plans = [
      {
        name: "Pay as you go",
        price: 0,
        perCredit: "1.50",
        credits: "Pay as you go",
        tradeCategories: 2,
        benefits: ["Profile Page", "Directory listing", "Daily job alerts"],
        buttonColor: "bg-gray-500 hover:bg-gray-600",
        highlight: false,
      },
      {
        name: "Standard",
        price: 39,
        perCredit: "1.11",
        credits: 35,
        tradeCategories: 3,
        benefits: ["Profile Page", "Directory listing", "Instant job alerts"],
        buttonColor: "bg-blue-500 hover:bg-blue-600",
        highlight: false,
        trial: "FREE TRIAL for 1st month",
      },
      {
        name: "Pro",
        price: 54,
        perCredit: "1.08",
        credits: 50,
        tradeCategories: 4,
        benefits: ["Profile Page", "Directory listing", "Instant job alerts"],
        buttonColor: "bg-green-500 hover:bg-green-600",
        highlight: true,
        highlightText: "Most Popular",
        trial: "FREE TRIAL for 1st month",
      },
      {
        name: "Advanced",
        price: 75,
        perCredit: "1.00",
        credits: 75,
        tradeCategories: 4,
        benefits: ["Profile Page", "Directory listing", "Instant job alerts"],
        buttonColor: "bg-purple-500 hover:bg-purple-600",
        highlight: false,
        trial: "FREE TRIAL for 1st month",
      },
    ];
  
    return (
      <div className="py-10 px-4 bg-gray-50 text-gray-800">
        <h2 className="text-3xl font-bold text-center my-10">Choose Your Membership Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PackageCard key={index} plan={plan} onSelect={() => setSelectedPlan(plan)} />
          ))}
        </div>
        {selectedPlan && <PackageModal isVerified={isVerified} plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
      </div>
    );
  };
  
  export default MembershipPage;