import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AuthContext } from "../../../../../Authentication/AuthProvider";

const jobs = [
  {
    id: 1,
    owner: {
      name: "Ruhul Amin",
      image: "/owner1.jpg", // Replace with actual image URL
    },
    title: "Need a Web Developer for E-commerce Site",
    date: "Jan 31, 2025",
    category: "Web Development",
    description:
      "Looking for an experienced web developer to build an online store. The project requires a skilled React and Node.js developer to integrate payment gateways and ensure a smooth user experience.",
    location: "Dhaka, Bangladesh",
    price: 20,
    images: ["/job1.jpg", "/job2.jpg"], // Replace with actual image URLs
    contact: { email: "client@example.com", phone: "+880 1234-567890" },
  },
  {
    id: 2,
    owner: {
      name: "John Doe",
      image: "/owner2.jpg", // Replace with actual image URL
    },
    title: "Graphic Designer Needed for Branding",
    date: "Jan 30, 2025",
    category: "Graphic Design",
    description:
      "Need a creative designer for logo, banners, and business cards. The branding should be modern and align with our company’s vision.",
    location: "Chittagong, Bangladesh",
    price: 15,
    images: ["/job3.jpg", "/job4.jpg"], // Replace with actual image URLs
    contact: { email: "designer@example.com", phone: "+880 9876-543210" },
  },
];

const JobDetail = () => {

  const { userRole } = useContext(AuthContext)

  const { id } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();
  const [isPurchased, setIsPurchased] = useState(false);
  const [hiddenEmail, setHiddenEmail] = useState('')
  const [hiddenPhone, setHiddenPhone] = useState('')




  // Find the job by ID
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return (
      <p className="text-center text-red-500 font-bold mt-10">Job Not Found!</p>
    );
  }

  // Simulate a purchase process
  const handleBuyJob = () => {
    // Deduct user credits logic should be here (For now, we just update state)
    setIsPurchased(true);
  };


  useEffect(() => {
    const [name, domain] = job?.contact?.email.split("@");
    setHiddenPhone(job?.contact?.phone?.slice(0, 3) + "********")
    setHiddenEmail(name.slice(0, 2) + "****@" + domain[0] + "***." + domain.split(".")[1][0] + "**")
  }, [job])

  return (
    <div className="max-w-3xl space-y-4 mx-auto text-gray-700 p-6 bg-white shadow rounded-lg mt-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-pink-600 font-semibold mb-4"
      >
        <AiOutlineArrowLeft className="mr-1" /> Back to Jobs
      </button>

      {/* Owner Profile Section (Like a Facebook Post) */}
      <div>
        <span className="font-semibold text-base text-gray-500 uppercase inline-block mb-4">Posted by </span>
        <div className="flex items-center mb-4">
          <img
            src={job.owner.image}
            alt={job.owner.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="ml-3">
            <h4 className="text-lg font-semibold">{job.owner.name}</h4>
            <p className="text-gray-500 text-sm">{job.date}, 22 hours ago</p>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-sm  mt-1">
        <span className="font-semibold text-base text-gray-500 uppercase inline-block mb-1">Job category</span>  <br /> Aerial & Satellite Dish
      </p>

      {/* Job Images */}
      <div className="">
        <span className="font-semibold text-base text-gray-500  uppercase inline-block mb-1">Photos</span>
        <div className="flex gap-2 mt-4">
          {job.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Job"
              className="w-32 h-32 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Job Description */}
      <div>
        <span className="font-semibold text-base text-gray-500 uppercase inline-block mb-1">About</span>
        <p className="mt-2 text-gray-700">{job.description}</p>
      </div>

      {/* Location */}
      <div>
        <span className="font-semibold text-base text-gray-500 uppercase inline-block mb-1">Job location</span>
        <p className="flex items-center text-gray-600 mt-2">
          <FaMapMarkerAlt className="mr-1 text-red-500" /> {job.location}
        </p>
      </div>

      {/* Price & Purchase Section */}
      {userRole == 'admin' ? <div>

        I am admin

      </div> : !isPurchased ?

        <div>
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold">📞 Contact Details</h3>
            <p className="flex items-center mt-2 text-gray-700">
              <FaPhoneAlt className="mr-2 text-pink-600" />{hiddenPhone}
            </p>
            <p className="flex items-center mt-2 text-gray-700">
              <FaEnvelope className="mr-2 text-pink-600" /> {hiddenEmail}
            </p>
          </div>
          <button
            onClick={handleBuyJob}
            className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg font-semibold"
          >
            Buy Job for {job.price} Credits
          </button>
        </div>


        : <div className="mt-4 p-4 border rounded-lg bg-gray-100 items-center flex justify-between">
          <div className="">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <p className="flex items-center mt-2 text-gray-700">
              <FaPhoneAlt className="mr-2 text-pink-600" /> {job.contact.phone}
            </p>
            <p className="flex items-center mt-2 text-gray-700">
              <FaEnvelope className="mr-2 text-pink-600" />{job.contact.email}
            </p>
          </div>
          <div>
            <button className="px-10 py-2 bg-pink-600 rounded-md text-white btn">Message</button>
          </div>
        </div>

      }
    </div>
  );
};

export default JobDetail;
