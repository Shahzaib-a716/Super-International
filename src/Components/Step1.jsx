import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate(); // Get the navigate function

  // State to hold form data and error messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "", // Default country code (you can set this to any default code)
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [tooltip, setTooltip] = useState(""); // Tooltip state

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  // Handle phone code change
  const handlePhoneCodeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      phoneCode: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  // Check if email and phone are valid
  const areEmailAndPhoneValid =
    validateEmail(formData.email) && validatePhone(formData.phoneCode + formData.phoneNumber);

  // Navigate to the next page on icon click
  const handleIconClick = () => {
    if (areEmailAndPhoneValid) {
      navigate("/step2"); // Navigate to the next step
    } else {
      setError("Please enter a valid email and phone number.");
    }
  };

  // Tooltip handlers
  const handleTooltip = (message) => {
    setTooltip(message); // Set tooltip message
  };

  const clearTooltip = () => {
    setTooltip(""); // Clear tooltip when mouse leaves
  };

  return (
    <div className="min-h-screen w-full bg-gray-800 bg-day bg-no-repeat bg-center bg-cover">
      {/* Top Heading Section */}
      <div className="w-full bg-gray-800 text-center py-4">
        <h2 className="text-green-400 text-3xl sm:text-3xl lg:text-4xl font-bold">
          STAND ALONE <br />
          MULTI-TIME-ZONE <br />
        </h2>
        <h2 className="text-yellow-400 text-2xl sm:text-3xl lg:text-4xl font-bold">
          SUPER INTERNATIONAL <br />
          BOOKING SYSTEM <br />
        </h2>
      </div>

      {/* Header Section */}
      <div className="flex justify-center items-center my-4">
        <div
          id="header"
          className="w-full max-w-3xl h-36 bg-center bg-cover relative"
          style={{
            backgroundImage: "url('/assets/images/heaad.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Tooltip Display Area */}
          <div className="absolute bottom-2 left-1/2 bg-green-600 transform -translate-x-1/2 text-yellow-200 text-2xl  sm:text-5xl font-bold  bg-opacity-75 text-nowrap p-4 rounded-md">
            {tooltip}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center px-4">
        <div className="font-myriad w-full max-w-3xl bg-gray-800 p-8 rounded-lg">
          <form className="flex flex-col gap-6">
            {/* Name Field */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/images/1.jpg"
                className="w-12 sm:w-16 rounded-full"
                alt="Name Icon"
              />
              <div className="relative flex items-center w-full">
                <img
                  src="/assets/images/user.png"
                  className={`w-8 sm:w-12 rounded-full absolute left-1/2 transform -translate-x-1/2 transition-opacity ${formData.name ? 'opacity-0' : 'opacity-100'}`}
                  alt="Name Icon"
                />
                <input
                  className="w-full text-base sm:text-2xl font-bold lg:text-5xl border-none rounded-md placeholder:text-black bg-white px-4 py-4 text-center focus:ring-indigo-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder=""
                  value={formData.name}
                  onChange={handleInputChange}
                  onMouseEnter={() => handleTooltip("Enter your Name")}
                  onMouseLeave={clearTooltip}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/images/2.jpg"
                className="w-12 sm:w-16 rounded-full"
                alt="Email Icon"
              />
              <input
                className="w-full text-base sm:text-sm lg:text-4xl border-none text-center rounded-md placeholder:text-black bg-white font-black placeholder-text-center px-4 py-4 focus:ring-indigo-500"
                id="email"
                name="email"
                type="email"
                placeholder="@"
                value={formData.email}
                onChange={handleInputChange}
                onMouseEnter={() => handleTooltip("Enter a valid email address")}
                onMouseLeave={clearTooltip}
                required
              />
            </div>

            {/* Phone Field */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/images/3.jpg"
                className="w-12 sm:w-16 rounded-full"
                alt="Phone Icon"
              />
              <div className="flex w-full gap-2">
                <input
                  className="text-base sm:text-lg lg:text-4xl font-bold border-none rounded-md placeholder:text-black bg-white px-4 py-4 focus:ring-indigo-500 w-32 text-center"
                  name="phoneCode"
                  type="text"
                  placeholder=""
                  value={formData.phoneCode}
                  onChange={handlePhoneCodeChange}
                  onMouseEnter={() => handleTooltip("Enter the country code")}
                  onMouseLeave={clearTooltip}
                />
                <div className="relative w-full">
                  <input
                    className="w-full text-base sm:text-2xl lg:text-4xl border-none font-bold rounded-md placeholder:text-black bg-white px-4 py-4 focus:ring-indigo-500 bg-cover bg-center text-center"
                    id="phone"
                    name="phoneNumber"
                    type="tel"
                    placeholder=""
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onMouseEnter={() => handleTooltip("Enter a valid phone number")}
                    onMouseLeave={clearTooltip}
                    style={{
                      backgroundImage: formData.phoneNumber ? "none" : "url('/assets/images/num.jpeg')", // Conditionally remove image if field is not empty
                      backgroundSize: "cover", // Adjust how the image fits in the input field
                      backgroundPosition: "center", // Adjust image position
                      backgroundRepeat: "no-repeat", // Prevent image repetition
                    }}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Conditional Icon Display */}
          {areEmailAndPhoneValid && (
            <div className="flex flex-col items-center mt-6">
              <img
                src="/assets/images/button ok check.webp"
                alt="Success Icon"
                className="w-16 sm:w-20 lg:w-24 cursor-pointer"
                onClick={handleIconClick}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-300 text-yellow-600 text-2xl whitespace-nowrap px-3 py-2 rounded-lg">
                OK
              </div>
              <p className="text-yellow-500 text- sm:text-5xl whitespace-nowrap font-bold mt-2">
                Check Email and Phone are valid?
              </p>
            </div>
          )}

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center py-4 font-semibold mt-10 text-white text-sm sm:text-base lg:text-4xl">
        All Rights Reserved • Service Hub by Total Mizers Ltd. 
        <br />
        Toronto, Ontario, CANADA (416) 333.FAST (3278) 
        <br />
        Copyright © 2016 - 2024, Les The Handyman.
      </div>
    </div>
  );
};

export default BookingForm;
