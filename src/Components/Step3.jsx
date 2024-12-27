import React, { useState, useEffect } from 'react';
import Step4 from './Step4'; // Import Step3 component

const Step2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [is24HourFormat, setIs24HourFormat] = useState(false); // Track 24-hour format state

  useEffect(() => {
    // Update current date and time every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the current date and time
  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: !is24HourFormat, // Toggle hour12 based on state
  });

  // Time slots for selection in both formats
  const timeSlots12hr = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM',
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',
  ];

  const timeSlots24hr = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
  ];

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Handle toggling the time format
  const toggleTimeFormat = () => {
    setIs24HourFormat((prevFormat) => !prevFormat); // Toggle between 12-hour and 24-hour format
  };

  // Check if the selected time is before 7 AM and should be disabled
  const isTimeDisabled = (time) => {
    if (is24HourFormat) {
      // Disable times before 7:00 AM (00:00 to 06:59 in 24-hour format)
      return parseInt(time.split(':')[0]) < 7;
    } else {
      // Disable times before 7:00 AM (12:00 AM to 06:59 AM in 12-hour format)
      const amPm = time.split(' ')[1];
      const hour = parseInt(time.split(':')[0]);
      return amPm === 'AM' && hour < 7;
    }
  };

  // Conditional rendering: Move to Step4 if time is selected
  if (selectedTime) {
    return <Step4 selectedTime={selectedTime} />;
  }

  return (
    <div
      id="step3"
      className="flex justify-center items-center bg-gray-800 w-full"
      style={{ minHeight: '100vh' }}
    >
      <div className="flex flex-col w-full max-w-3xl p-4">
        {/* Header Section */}
        <div className="flex w-full gap-4 items-end border-b-2">
          <a href="#step1" className="flex flex-col gap-2 justify-center items-center">
            <img className="w-10" src="/assets/images/.webp" alt="" />
            <h1 className="border-2 text-center border-b-0 rounded-t-xl w-16 h-10 bg-gradient-to-b from-[#4d9535] to-[#3E6B2B] md:text-3xl font-extrabold text-white">
              2
            </h1>
          </a>
          <div className="flex justify-center items-center">
            <h1 className="text-xl md:text-3xl font-extrabold text-yellow-500">SELECT A TIME</h1>
          </div>
          <div className="flex -mb-9 justify-center items-center">
            <img className="w-24" src="/assets/images/clock.webp" alt="" />
          </div>
          {/* Toggle for 24H */}
          <div
            onClick={toggleTimeFormat}
            className="flex hover:cursor-pointer text-resp hover:scale-110 justify-center items-center border-2 border-b-0 rounded-t-3xl px-2 h-10 bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]"
          >
            <h1 className="font-extrabold">{is24HourFormat ? '12H' : '24H'}</h1>
          </div>
        </div>

        {/* Current Date Display */}
        <div className="flex flex-col mt-8">
          <div className="flex justify-center items-center rounded-t-2xl w-full text-center md:h-16 bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]">
            <h1 className="font-extrabold text-resp text-2xl text-white">{formattedDate}</h1>
          </div>

          {/* Time Slot Grid */}
          <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
            {(is24HourFormat ? timeSlots24hr : timeSlots12hr).map((time, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleTimeSelect(time)}
                className={`opacity-90 rounded-t-lg border-2 text-white border-white flex items-center justify-center h-20 text-2xl md:text-3xl text-center p-1 font-extrabold bg-gradient-to-b ${
                  isTimeDisabled(time)
                    ? 'from-[#E3E3E3] to-[#9BA9B2] cursor-not-allowed' // Disabled style
                    : 'from-[#4d9535] to-[#3E6B2B] hover:from-[#4188D9] hover:to-[#393185] cursor-pointer' // Enabled style
                }`}
              >
                {time}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
