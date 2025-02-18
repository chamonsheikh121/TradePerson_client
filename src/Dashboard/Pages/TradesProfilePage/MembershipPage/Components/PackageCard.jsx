import { FaCircleCheck } from "react-icons/fa6";


const PackageCard = ({ plan, onSelect }) => {
    return (
      <div
        className={`relative w-full border border-gray-200 hover:border-gray-400 hover:shadow-2xl p-6 duration-300 shadow-md bg-white rounded-lg ${plan.highlight ? "text-black" : ""}`}
      >
        {plan.highlight && (
          <div className="absolute top-0 left-0 w-full bg-pink-500 text-white text-xs py-1 text-center uppercase font-bold">
            {plan.highlightText || "Most Popular"}
          </div>
        )}
  
        <div className="flex flex-col justify-between h-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            {plan.trial && <p className="text-sm text-green-600 ">{plan.trial}</p>}
            <p className="text-3xl font-bold mt-3">
              £{plan.price} <span className="text-sm font-normal">+VAT / month</span>
            </p>
            <p className="text-sm">£{plan.perCredit} +VAT per credit</p>
            <p className="text-lg font-medium mt-3">{plan.credits} credits / month</p>
            <p className="text-sm">{plan.tradeCategories} trade categories</p>
          </div>
          <hr className="border-gray-300 my-4" />
          <ul className="mt-4 space-y-2 text-sm">
            {plan.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center"><FaCircleCheck size={20} className="mr-4 text-green-600"/> {benefit}</li>
            ))}
          </ul>
          <button
            className={`w-full mt-6 text-white py-3 ${plan.buttonColor} transition rounded-md`}
            onClick={() => onSelect(plan)}
          >
            Select {plan.name} Package
          </button>
        </div>
      </div>
    );
  };

  export default PackageCard;