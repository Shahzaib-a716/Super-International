import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const navigate = useNavigate();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (
      prevMonth.getFullYear() > today.getFullYear() ||
      (prevMonth.getFullYear() === today.getFullYear() && prevMonth.getMonth() >= today.getMonth())
    ) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Format the date properly (e.g., 2024-11-29)
    const formattedDate = selectedDate.toISOString().split('T')[0];
    navigate(`/Step3?date=${formattedDate}`);
  };
  

  return (
    <div className="min-h-screen bg-no-repeat bg-center bg-cover bg-gray-700">
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 w-[797px]">
          <div className="flex w-[540px] gap-4 items-end border-b-2">
            <h1 className="border-2 text-center border-b-0 w-16 h-10 ml-5 bg-gradient-to-b from-[#ff8282] to-[#ff0000] md:text-3xl font-extrabold text-white">
              1
            </h1>
            <div className="flex shrink-0 justify-center items-center">
              <h1 className="text-2xl md:text-5xl font-bold text-green-600">SELECT A DAY</h1>
            </div>
            <div className="flex shrink-0 -mb-2 justify-center items-center">
              <img className="w-20" src="/assets/images/calendar-icon.webp" alt="" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex flex-col text-white font-bold text-xl ml-6">
              <div className="flex gap-2">
                <div className="border-2 w-10 h-8 bg-gradient-to-b from-[#ff8282] to-[#ff1717c5]"></div>
                <h1>DAY IS BOOKED</h1>
              </div>
              <div className="flex gap-2">
                <div className="border-2 w-10 h-8 bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]"></div>
                <h1>AVAILABLE</h1>
              </div>
              <div className="flex gap-2">
                <div className="border-2 w-10 h-8 bg-gradient-to-b from-[#FFCC00] to-[#FF6600]"></div>
                <h1>STILL AVAILABLE</h1>
              </div>
            </div>

            <div className="flex flex-col text-white">
              <div className="flex gap-2 font-extrabold">
                <img src="/assets/images/morning.webp" className="shrink-0 w-10" alt="" />
                <h1>00:00AM - 11:59AM</h1>
              </div>
              <div className="flex gap-2 font-extrabold">
                <img src="/assets/images/afternoon.webp" className="shrink-0 w-12 -ml-1" alt="" />
                <h1>12:00PM - 05:59PM</h1>
              </div>
              <div className="flex gap-2 font-extrabold">
                <img src="/assets/images/evening.webp" className="shrink-0 w-10" alt="" />
                <h1>06:00PM - 11:59PM</h1>
              </div>
            </div>

            <div className="flex flex-col justify-end text-white items-center">
  <div className="mb-2 mt-[-90px]">
    <img
      src="/assets/images/translator.webp"
      alt="Month Icon"
      className="w-[110px] h-[105px] ml-[45px]"
    />
  </div>
  <h1 className="text-center text-3xl font-semibold rounded-t-xl border-2 border-white bg-gradient-to-b from-[#FFCC00] to-[#FF6600] p-2">
    {`${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`}
  </h1>
</div>
</div>


          <div className="mt-2 grid grid-cols-12">
            <div
              onClick={handlePrevMonth}
              className="flex justify-center items-center w-10 ml-6 text-3xl hover:text-6xl rounded-l-xl mr-2 bg-gradient-to-b from-[#FFCC00] to-[#FF6600] cursor-pointer"
            >
              <img src="/assets/images/arrow.webp" className="-rotate-90" alt="" />
            </div>

            <div className="col-span-10 grid grid-cols-7">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <div
                  key={index}
                  className="flex justify-center text-white items-center rounded-t-2xl text-2xl bg-gradient-to-b from-[#A3A3A3] to-[#636363] font-bold border-2 border-white"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: startDay }).map((_, index) => (
                <div key={`empty-${index}`} className="border border-white"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getFullYear() === currentDate.getFullYear();
                const isPastDay =
                  new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < today;

                return (
                  <div
                    key={day}
                    className={`group cursor-pointer ${
                      isToday
                        ? "bg-yellow-400 hover:bg-red-500"
                        : isPastDay
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-900 hover:bg-red-600"
                    } border-2 border-white ${selectedDay === day ? "border-yellow-500" : ""}`}
                    onClick={() => {
                      if (!isPastDay || isToday) {
                        handleDayClick(day);
                      }
                    }}
                  >
                    <h1
                      className={`text-white text-center rounded-t-4xl text-3xl font-bold ${
                        isToday ? "text-black" : ""
                      }`}
                    >
                      {day}
                    </h1>
                    <div className="flex flex-col h-[45px]">
                      <div
                        className={`basis-1/3 border-t-1  border-white ${
                          isPastDay ? "bg-gray-300" : "bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]"
                        }`}
                      ></div>
                      <div
                        className={`basis-1/3 border-t-2 border-white ${
                          isPastDay ? "bg-gray-300" : "bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]"
                        }`}
                      ></div>
                      <div
                        className={`basis-1/3 border-t-2 border-white ${
                          isPastDay ? "bg-gray-300" : "bg-gradient-to-b from-[#4d9535] to-[#3E6B2B]"
                        }`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              onClick={handleNextMonth}
              className="flex justify-center items-center w-10 text-3xl hover:text-6xl rounded-r-xl bg-gradient-to-b from-[#FFCC00] to-[#FF6600] cursor-pointer"
            >
              <img src="/assets/images/arrow.webp" className="rotate-90" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
