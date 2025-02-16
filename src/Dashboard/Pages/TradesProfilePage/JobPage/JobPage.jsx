import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineShoppingCart } from "react-icons/ai";

const JobPage = () => {
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Need a Web Developer for E-commerce Site",
      date: "Jan 31, 2025",
      category: "Web Development",
      description:
        "Looking for an experienced web developer to build an online store.",
      location: "Dhaka, Bangladesh",
      price: 20,
      images: [
        "https://cdn.pixabay.com/photo/2024/01/10/16/18/computer-8499917_640.jpg",
        "https://cdn.pixabay.com/photo/2024/01/10/16/18/computer-8499917_640.jpg",
      ], // Replace with actual image URLs
    },
    {
      id: 2,
      title: "Graphic Designer Needed for Branding",
      date: "Jan 30, 2025",
      category: "Graphic Design",
      description:
        "Need a creative designer for logo, banners, and business cards.",
      location: "Chittagong, Bangladesh",
      price: 15,
      images: [
        "https://cdn.pixabay.com/photo/2024/01/10/16/18/computer-8499917_640.jpg",
        "https://cdn.pixabay.com/photo/2024/01/10/16/18/computer-8499917_640.jpg",
      ], // Replace with actual image URLs
    },
  ];

  // State for filters
  const [filter, setFilter] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100,
    date: "",
  });

  const navigate = useNavigate();

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    return (
      (filter.category ? job.category === filter.category : true) &&
      job.price >= filter.minPrice &&
      job.price <= filter.maxPrice &&
      (filter.date ? job.date === filter.date : true)
    );
  });


  return (
    <div className="max-w-6xl mx-auto p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold">📌 Job Listings</h2>
        <p className="text-gray-600">
          Your Credits: <span className="font-semibold">50</span>
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center mb-6">
        {/* Category Filter */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">Category</label>
          <select
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">
            Min Price (৳)
          </label>
          <input
            type="number"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="e.g. 1000"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">
            Max Price (৳)
          </label>
          <input
            type="number"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="e.g. 5000"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
          />
        </div>

        {/* Date Filter */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">
            Posted After
          </label>
          <input
            type="date"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />
        </div>

        {/* Apply Filter Button */}
        <button className="p-2 px-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all mt-5">
          <IoFilterSharp className="text-lg" /> Apply Filters
        </button>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition space-y-4 duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Install New TV Aerial for Free Channels</h3>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-base uppercase inline-block mb-1">Posted by</span>  <br /> Anthony, about 7 hours ago
              </p>

              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-base uppercase inline-block mb-1">Job category</span>  <br /> Aerial & Satellite Dish
              </p>

            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-base uppercase inline-block mb-1">Job location</span>  <br /> London SE2, 45 mins from EC1A2AT
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-base uppercase inline-block mb-1">Posted</span>  <br /> Aerial & Satellite Dish
              </p>
            </div>


            {/* Job Images */}
            <div className="flex gap-3 mt-4">
              <img
                src="https://images.pexels.com/photos/6345317/pexels-photo-6345317.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Job"
                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              />
            </div>

            {/* See Job Button */}
            <Link to={`/tradePerson/jobs/${job?.id}`}
            >
              <button className="py-2 bg-pink-700 text-white w-full mt-4">See details</button>

            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
