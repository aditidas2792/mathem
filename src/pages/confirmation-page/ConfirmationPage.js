import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

// A function to get the delivery details from localStorage or URLSearchParams
function getDeliveryDetails(location) {
  const selectedDate =
    localStorage.getItem("selectedDate") ||
    new URLSearchParams(location.search).get("selectedDate");
  const selectedTime =
    localStorage.getItem("selectedTime") ||
    new URLSearchParams(location.search).get("selectedTime");
  const inHomeDelivery =
    localStorage.getItem("inHomeDelivery") ||
    new URLSearchParams(location.search).get("inHomeDelivery");
  const selectedTimeId =
    localStorage.getItem("selectedTimeId") ||
    new URLSearchParams(location.search).get("selectedTimeId");
  const selectedStartTime =
    localStorage.getItem("selectedStartTime") ||
    new URLSearchParams(location.search).get("selectedStartTime");
  const selectedStopTime =
    localStorage.getItem("selectedStopTime") ||
    new URLSearchParams(location.search).get("selectedStopTime");
  const timeFrame = `${selectedStartTime} - ${selectedStopTime}`;

  return {
    selectedDate,
    selectedTime,
    inHomeDelivery,
    selectedTimeId,
    selectedStartTime,
    selectedStopTime,
    timeFrame,
  };
}

function ConfirmationPage() {
  const location = useLocation();
  // Destructure the delivery details object from the result of calling getDeliveryDetails
  const {
    selectedDate,
    selectedTime,
    inHomeDelivery,
    selectedTimeId,
    selectedStartTime,
    selectedStopTime,
    timeFrame,
  } = getDeliveryDetails(location);

  const navigate = useNavigate();

  const handleEdit = () => {
    // Create a new URLSearchParams object with the updated delivery details
    const queryParams = new URLSearchParams({
      selectedDate,
      selectedTime,
      inHomeDelivery,
      selectedTimeId,
      selectedStartTime,
      selectedStopTime,
    }).toString();

    navigate(`/delivery?${queryParams}`);
  };

  return (
    <div className="confirmation-page">
      <h1>Confirmation Page</h1>
      <p className="confirmation-message">
        You have selected the following delivery details:
      </p>
      <ul className="confirmation-list">
        <li className="confirmation-item">Date: {selectedDate}</li>
        <li className="confirmation-item">Time: {timeFrame}</li>
        <li className="confirmation-item">
          In Home Delivery: {inHomeDelivery === "true" ? "Yes" : "No"}
        </li>
      </ul>
      <button className="edit-button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
}

export default ConfirmationPage;
