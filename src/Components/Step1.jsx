import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate(); // Get the navigate function

  // State to hold form data and error messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  // Check if email and phone are valid
  const areEmailAndPhoneValid =
    validateEmail(formData.email) && validatePhone(formData.phone);

  // Navigate to the next page on icon click
  const handleIconClick = () => {
    if (areEmailAndPhoneValid) {
      navigate("/step2"); // Navigate to the next step
    } else {
      setError("Please enter a valid email and phone number.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-800 bg-day bg-no-repeat bg-center bg-cover">
      <div className="relative flex justify-center items-center py-8">
        <div className="font-myriad flex flex-col gap-6 justify-center items-center w-full md:w-[650px] bg-gray-800">
          {/* Header */}
          <div
            id="header"
            className="flex flex-col gap-2 justify-start px-4 relative bg-center bg-cover w-full h-36"
            style={{
              backgroundImage: "url('/assets/images/head0.webp')", // Replace with your image path
              backgroundSize: "cover", // Ensures the image covers the entire area
              backgroundPosition: "center", // Centers the image
            }}
          >
            <div className="flex mt- gap-4 items-start justify-start">
              <h1
                className="m-0 pt-4 text-3xl md:text-3xl font-extrabold text-white drop-shadow-lg shadow-black"
                style={{
                  textShadow:
                    "3px 0px 0px rgb(0, 0, 0), 0px -1px 0px rgb(0, 0, 0), 0px 1px 0px rgb(0, 0, 0), -1px 0px 0px rgb(0, 0, 0)",
                }}
              >
                <span className="text-red-600 text-5xl shadow-black font-bold">MY</span>
                <span className="text-gray-400 text-3xl font-bold">MULTI TIME ZONE</span>
              </h1>
              <img
                className="w-[80px] h-[80px] rounded-full"
                src="/assets/images/Handyman0.png"
                alt="Handyman"
              />
            </div>
            <div className="flex items-center justify-between gap-10">
              <h1 className="font-bold text-3xl text-white">
                Super International Booking System
              </h1>
              <div className="tooltip-container">
                <img
                  className="w-16 h-16 rounded-full "
                  src="/assets/images/help.webp"
                  alt="Help"
                />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 w-full">
            <form className="rounded-md flex flex-col gap-4 p-4">
              {/* Name Field */}
              <div className="flex gap-3">
                <img
                  src="/assets/images/1.jpg"
                  className="w-16 rounded-full cursor-auto"
                  alt="Name Icon"
                />
                <input
                  className="w-full text-3xl border-none rounded-md placeholder:text-black placeholder:text-center bg-white focus:ring-indigo-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="WHAT IS YOUR NAME?"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>

              {/* Email Field */}
              <div className="flex gap-3">
                <img
                  src="/assets/images/2.jpg"
                  className="w-16 rounded-full cursor-auto"
                  alt="Email Icon"
                />
                <input
                  className="w-full text-2xl md:text-3xl border-none rounded-md placeholder:text-black placeholder:text-center bg-white focus:ring-indigo-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
              </div>

              {/* Phone Field */}
              <div className="flex gap-3">
                <img
                  src="/assets/images/3.jpg"
                  className="w-16 rounded-full cursor-auto"
                  alt="Phone Icon"
                />
                <input
                  className="w-full text-3xl border-none rounded-md placeholder:text-black placeholder:text-center bg-white focus:ring-indigo-500"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </form>

            {/* Conditional Icon Display */}
            {areEmailAndPhoneValid && (
              <div className="flex justify-center mt-6">
                <img
                  src="/assets/images/button ok check.webp"
                  alt="Success Icon"
                  className="w-[100px] h-[100px] mt-4"
                  onClick={handleIconClick} // Add the click handler
                  style={{ cursor: "pointer" }} // Optional: Add a pointer cursor to show it’s clickable
                />
                <p className="text-yellow-500 text-3xl font-bold ml-9 mt-8">
                 Check Email and Phone are valid?
                </p>
              </div>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center pt-1 w-full text-3xl mt-10 text-white font-bold"
        style={{
          textShadow:
            "2px 0px 0px rgb(0, 0, 0), 0px -1px 0px rgb(0, 0, 0), 0px 1px 0px rgb(0, 0, 0), -1px 0px 0px rgb(0, 0, 0)",
        }}
      >
        All Rights reserved • Service Hub by Total Mizers Ltd. Toronto, Ontario
        CANADA (416) 333.FAST (3278) Copyright © 2016 - 2024, Les The Handyman.
      </div>
    </div>
  );
};

export default BookingForm;
