import React, { useState, useEffect, useCallback } from "react";
import DateList from "../../components/DateList";
import TimeList from "../../components/TimeList";
import { useNavigate, useLocation } from "react-router-dom";
import { getDeliveryDates, getDeliveryTimes } from "../../services/Api";
import "./styles.css";

function DeliveryPage() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [times, setTimes] = useState([]);
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedStopTime, setSelectedStopTime] = useState("");
  const [inHomeDelivery, setInHomeDelivery] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch delivery dates using the API and update the state
  useEffect(() => {
    getDeliveryDates().then((data) => setDates(data));
  }, []);

  // If a date is selected, fetch delivery times for that date using the API and update the state
  useEffect(() => {
    if (selectedDate) {
      getDeliveryTimes(selectedDate).then((data) => setTimes(data));
    }
  }, [selectedDate]);

  const handleUrlParams = useCallback(
    (search) => {
      // Get the query parameters from the current URL
      const searchParams = new URLSearchParams(search);

      // Destructure the query parameters into separate variables
      const {
        selectedDate: date = "",
        selectedTime: time = "",
        inHomeDelivery = false,
        selectedTimeId: timeId = "",
        selectedStartTime: startTime = "",
        selectedStopTime: stopTime = "",
      } = Object.fromEntries(searchParams.entries());

      setSelectedDate(date);
      setSelectedTime(time ? JSON.parse(time) : "");
      setInHomeDelivery(inHomeDelivery === "true");
      setSelectedTimeId(timeId);
      setSelectedStartTime(startTime);
      setSelectedStopTime(stopTime);
    },
    [
      setSelectedDate,
      setSelectedTime,
      setInHomeDelivery,
      setSelectedTimeId,
      setSelectedStartTime,
      setSelectedStopTime,
    ]
  );

  // Call the handleUrlParams function when the location search changes
  useEffect(() => {
    handleUrlParams(location.search);
  }, [handleUrlParams, location.search]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (
    selectedTime,
    selectedTimeId,
    selectedStartTime,
    selectedStopTime
  ) => {
    setSelectedTime(selectedTime);
    setSelectedTimeId(selectedTimeId);
    setSelectedStartTime(selectedStartTime);
    setSelectedStopTime(selectedStopTime);
  };

  const handleInHomeDeliveryChange = (event) => {
    setInHomeDelivery(event.target.checked);
  };

  const handleProceedClick = () => {
    if (selectedStartTime !== "" && selectedStopTime !== "") {
      const params = new URLSearchParams({
        selectedDate,
        selectedTime: JSON.stringify(selectedTime),
        selectedTimeId,
        selectedStartTime,
        selectedStopTime,
        inHomeDelivery,
      }).toString();

      // Clear all previous items from local storage
      localStorage.clear();

      // Loop through the selected parameters and add them to local storage
      Object.entries({
        selectedDate,
        selectedTime: JSON.stringify(selectedTime),
        selectedTimeId,
        selectedStartTime,
        selectedStopTime,
        inHomeDelivery,
      }).forEach(([key, value]) => {
        localStorage.setItem(key, `${value}`);
      });

      navigate(`/confirmation?${params}`);
    }
  };

  const isButtonDisabled = !(
    selectedDate &&
    inHomeDelivery !== null &&
    selectedStartTime &&
    selectedStopTime
  );

  return (
    <div className="container">
      <h1 className="title">Delivery Time Slots</h1>
      <DateList
        dates={dates}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      {selectedDate && (
        <TimeList
          times={times}
          selectedTime={selectedTime}
          handleTimeChange={handleTimeChange}
          inHomeDelivery={inHomeDelivery}
        />
      )}
      <div className="in-home-delivery">
        <input
          type="checkbox"
          id="inHomeDelivery"
          checked={inHomeDelivery}
          onChange={handleInHomeDeliveryChange}
        />
        <label htmlFor="inHomeDelivery">In Home Delivery</label>
      </div>

      <button
        disabled={isButtonDisabled}
        className={isButtonDisabled ? "disabled" : ""}
        onClick={handleProceedClick}
      >
        Proceed
      </button>
    </div>
  );
}
export default DeliveryPage;
