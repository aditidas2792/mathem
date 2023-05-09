import React from "react";
import "./styles.css";

function TimeList(props) {
  const { times, selectedTime, handleTimeChange, inHomeDelivery } = props;

  const selectedTimeId = selectedTime ? selectedTime.deliveryTimeId : "";

  const handleChange = (event) => {
    const selectedTimeId = event.target.value;
    // Find the time object with the matching deliveryTimeId
    const selectedTime = times.find(
      (time) => time.deliveryTimeId === selectedTimeId
    );
    handleTimeChange(
      selectedTime,
      selectedTimeId,
      selectedTime?.startTime,
      selectedTime?.stopTime
    );
  };

  return (
    <div className="time-list">
      <h2 className="time-heading">Select Delivery Time:</h2>
      <select
        className="time-dropdown"
        value={selectedTimeId}
        onChange={handleChange}
      >
        <option value="">Select a time</option>
        {times.map((time) => (
          <option key={time.deliveryTimeId} value={time.deliveryTimeId}>
            {time.startTime} - {time.stopTime}
          </option>
        ))}
      </select>
      {inHomeDelivery && (
        <p className="in-home-delivery-text">In Home Delivery selected</p>
      )}
    </div>
  );
}

export default TimeList;
