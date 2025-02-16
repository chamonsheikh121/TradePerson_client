

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { MdClose, MdOutlineModeEditOutline } from "react-icons/md";
import { SlCloudUpload } from "react-icons/sl";

const JobPostPage = () => {
    const [job, setJob] = useState({
        title: "",
        category: "",
        description: "",
        location: "",
        experience: "",
        budget: "",
        deadline: "",
        jobType: "",
        skills: [],
        urgency: "",
        images: [],
        posterName: "",
        email: "",
        phone: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setJob({ ...job, images: files });
    };
    const inputValidationHandler = (e) => {
        e.target.value
            ? e.target.classList.add("bg-gray-200")
            : e.target.classList.remove("bg-gray-200");
    };


    return (
        <div className="max-w-4xl mx-auto   rounded-lg p-6 mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Post a Job</h2>

            <div className="space-y-10">
                {/* Job Title */}
                <div className=" p-10 space-y-10 bg-gray-100 shadow-md">
                    {/* Section Title & Description */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Job Title</h3>
                        <p className="text-gray-600 text-sm">
                            The job title should be clear and concise, accurately describing the work required.
                        </p>
                    </div>

                    {/* Styled Input Field */}
                    <div className="relative mt-4 w-full">
                        <input
                            type="text"
                            name="title"
                            value={job.title}
                            onChange={(e) => {
                                handleChange(e);
                                inputValidationHandler(e);

                            }}
                            className="peer bg-white w-full border-2 border-gray-400 bg-transparent px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none"
                            placeholder=" "
                        />
                        <label
                            className={`absolute left-3 transition-all text-lg ${job.title
                                ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                }`}
                        >
                            Job Title
                        </label>
                    </div>
                </div>




                {/* Job Category */}
                <div className="p-10 space-y-10 bg-gray-100 shadow-md rounded-md">
                    {/* Section Title & Description */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Select Your Job Category</h3>
                        <p className="text-gray-600 text-sm">
                            Choose the trade category that best matches your skills and expertise. This helps in filtering relevant job posts.
                        </p>
                    </div>

                    {/* Styled Select Field */}
                    <div className="relative w-full">
                        <select
                            name="category"
                            value={job.category}
                            onChange={handleChange}
                            className="peer bg-white w-full border-2 border-gray-400 bg-transparent px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none appearance-none"
                        >
                            <option value="" disabled hidden></option>
                            <option value="Electrician">Electrician</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Joiner">Joiner</option>
                            <option value="Painter">Painter</option>
                            <option value="Carpenter">Carpenter</option>
                        </select>
                        <label
                            className={`absolute left-3 transition-all text-lg ${job.category
                                ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                }`}
                        >
                            Job Category
                        </label>
                    </div>
                </div>


                {/* Job Description */}
                <div className="p-10 space-y-10 bg-gray-100 shadow-md">
                    {/* Section Title & Description */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Describe the Job</h3>
                        <p className="text-gray-600 text-sm">
                            Provide a clear and detailed description of the job. Mention specific requirements, expectations, or any relevant details to help tradespeople understand the work.
                        </p>
                    </div>

                    {/* Styled Textarea Field */}
                    <div className="relative mt-4 w-full">
                        <textarea
                            name="description"
                            value={job.description}
                            onChange={(e) => {
                                handleChange(e);
                                inputValidationHandler(e);
                            }}
                            rows="5"
                            className="peer bg-white w-full border-2 border-gray-400 bg-transparent px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none resize-none"
                            placeholder=" "
                        ></textarea>
                        <label
                            className={`absolute left-3 transition-all text-lg ${job.description
                                ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                }`}
                        >
                            Job Description
                        </label>
                    </div>
                </div>

                {/* Job Location */}
                <div className="p-10 space-y-10 bg-gray-100 shadow-md rounded-md">
                    {/* Section Title & Description */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Enter Job Location</h3>
                        <p className="text-gray-600 text-sm">
                            Specify the location where the job needs to be done. This helps tradespeople determine travel time and feasibility.
                        </p>
                    </div>

                    {/* Styled Input Field */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            className="peer bg-white w-full border-2 border-gray-400 bg-transparent px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none"
                            placeholder=" "
                        />
                        <label
                            className={`absolute left-3 transition-all text-lg ${job.location
                                ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                }`}
                        >
                            Job Location
                        </label>
                    </div>
                </div>


                <div className="p-10 space-y-10 bg-gray-100 shadow-md rounded-md">
                    {/* Section Title & Description */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Set Job Deadline & Urgency</h3>
                        <p className="text-gray-600 text-sm">
                            Specify the job deadline and urgency to help tradespeople manage their schedules effectively.
                        </p>
                    </div>

                    {/* Deadline & Urgency Fields */}
                    <div className="flex gap-6">
                        {/* Deadline Input */}
                        <div className="relative w-1/2">
                            <input
                                type="text" // Change type to text initially
                                onFocus={(e) => {
                                    e.target.type = "date"; // Switch to date on focus
                                    e.target.showPicker(); // Open date picker immediately
                                }}
                                onBlur={(e) => {
                                    if (!e.target.value) e.target.type = "text"; // Reset to text if empty
                                }}
                                name="deadline"
                                value={job.deadline}
                                onChange={handleChange}
                                className="peer bg-white w-full border-2 border-gray-400 px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none"
                                placeholder=" "
                            />
                            <label
                                className={`absolute left-3 transition-all text-lg ${job.deadline
                                    ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                    : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                    }`}
                            >
                                Deadline
                            </label>
                        </div>



                        {/* Urgency Dropdown */}
                        <div className="relative w-1/2">
                            <select
                                name="urgency"
                                value={job.urgency}
                                onChange={handleChange}
                                className="peer bg-white w-full border-2 border-gray-400 px-3 pt-4 pb-1 text-lg rounded-md focus:border-green-500 focus:outline-none appearance-none"
                            >
                                <option value="" hidden></option>
                                <option value="Immediate">Immediate</option>
                                <option value="Within a week">Within a week</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                            <label
                                className={`absolute left-3 transition-all text-lg ${job.urgency
                                    ? "-top-2 text-sm text-green-500 bg-gray-100 px-1"
                                    : "top-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-500 peer-focus:bg-white peer-focus:px-1"
                                    }`}
                            >
                                Urgency
                            </label>
                        </div>
                    </div>
                </div>





                {/* Upload Job Images */}
                <div className="p-10  space-y-4 rounded-md shadow-md bg-gray-100 ">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Upload Job Photos</h3>
                        <p className="text-gray-600 text-sm">
                            Add clear photos related to the job to help tradespeople better understand the work required.
                        </p>
                    </div>
                    <div className="px-32">
                        {/* Upload Section */}
                        <label className="border bg-white flex cursor-pointer hover:bg-gray-200 transition-all justify-center items-center border-dashed border-gray-600 h-40">
                            <div className="flex flex-col items-center gap-2">
                                <SlCloudUpload size={30} className="text-green-700" />
                                {/* <h4>{uploading ? "Uploading..." : "Upload image"}</h4> */}
                            </div>
                            <input
                                // disabled={uploading}
                                type="file"
                                accept="image/*"
                                // onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                        <hr className="border-gray-300" />

                        {/* Image Gallery */}
                        <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-7 gap-4">
                            {/* {images?.length > 0 ? (
                            images?.map((img, i) => (
                                <div key={i} className="relative h-20 border group">
                                    <img
                                        src={img.url}
                                        className="w-full h-full object-cover transition-all duration-200 group-hover:opacity-70"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-all duration-200 group-hover:opacity-70"></div>
                                    <MdOutlineModeEditOutline
                                        className="absolute top-2 cursor-pointer right-2 text-white opacity-0 transition-all duration-200 group-hover:opacity-100"
                                        // onClick={() => openModal(i)}
                                    />
                                </div>
                            ))
                        ) : (
                            <h4 className="font-bold">No Galleries found</h4>
                        )} */}
                        </div>

                        {/* Modal */}
                        {/* {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
                            <div className="relative bg-white md:p-4 rounded-md max-w-3xl md:pt-14 pt-10 w-full flex flex-col items-center">
                                <MdClose
                                    className="absolute mb-4 top-2 right-2 cursor-pointer text-2xl"
                                    onClick={closeModal}
                                />
                                <img
                                    src={selectedImage.url}
                                    className="w-full max-h-[500px] object-contain"
                                />
                                <div className="flex justify-between w-full mt-4">
                                    <button
                                        className="bg-gray-200 px-4 py-2 rounded-md"
                                        onClick={prevImage}
                                    >
                                        <FaArrowLeft />
                                    </button>
                                    <button
                                        disabled={deleting}
                                        className="bg-red-500 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md"
                                        onClick={deleteImage}
                                    >
                                        <FaTrash /> {deleting ? "Deleting.." : "Delete"}
                                    </button>
                                    <button

                                        className="bg-gray-200 px-4 py-2 rounded-md"
                                        onClick={nextImage}
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )} */}
                    </div>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition">
                    Post Job
                </button>
            </div>
        </div>
    );
};

export default JobPostPage;
