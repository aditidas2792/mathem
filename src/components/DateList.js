import React from "react";
import "./styles.css";

function DateList(props) {
  const { dates, selectedDate, handleDateChange } = props;

  return (
    <div className="date-list">
      <h2 className="date-heading">Select Delivery Date:</h2>
      <select
        className="date-select"
        value={selectedDate}
        onChange={handleDateChange}
      >
        <option value="">Select a date</option>
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateList;
