import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeliveryPage from "./pages/delivery-page/DeliveryPage";
import { getDeliveryDates, getDeliveryTimes } from "./services/Api";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the getDeliveryDates and getDeliveryTimes functions
jest.mock("./services/Api", () => ({
  getDeliveryDates: jest.fn(() =>
    Promise.resolve(["2023-05-09", "2023-05-10"])
  ),
  getDeliveryTimes: jest.fn(() =>
    Promise.resolve([
      {
        id: "1",
        deliveryTime: "9:00 AM - 12:00 PM",
        startTime: "09:00",
        stopTime: "12:00",
      },
      {
        id: "2",
        deliveryTime: "12:00 PM - 3:00 PM",
        startTime: "12:00",
        stopTime: "15:00",
      },
    ])
  ),
}));

describe("DeliveryPage", () => {
  const navigateMock = jest.fn();
  useNavigate.mockReturnValue(navigateMock);

  const renderDeliveryPage = () => {
    return render(
      <MemoryRouter>
        <DeliveryPage />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch delivery dates on mount", async () => {
    try {
      renderDeliveryPage();

      expect(screen.getByText("Delivery Time Slots")).toBeInTheDocument();

      const date1 = await screen.findByText("2023-05-09");
      const date2 = await screen.findByText("2023-05-10");

      expect(date1).toBeInTheDocument();
      expect(date2).toBeInTheDocument();
      expect(getDeliveryDates).toHaveBeenCalledTimes(1);
    } catch (error) {
      console.log(error);
    }
  });

  it("should fetch delivery times when a date is selected", async () => {
    try {
      renderDeliveryPage();

      const date1 = await screen.findByText("2023-05-09");

      fireEvent.change(screen.getByTestId("date-select"), {
        target: { value: "2023-05-09" },
      });

      const time1 = await screen.findByText("9:00 AM - 12:00 PM");
      const time2 = await screen.findByText("12:00 PM - 3:00 PM");

      expect(date1).toBeInTheDocument();
      expect(time1).toBeInTheDocument();
      expect(time2).toBeInTheDocument();
      expect(getDeliveryTimes).toHaveBeenCalledTimes(1);
      expect(getDeliveryTimes).toHaveBeenCalledWith("2023-05-09");
    } catch (error) {
      console.log(error);
    }
  });

  it("should update state when date and time are selected", async () => {
    try {
      renderDeliveryPage();

      await screen.findByText("2023-05-09");

      fireEvent.change(screen.getByTestId("date-select"), {
        target: { value: "2023-05-09" },
      });

      const time1 = await screen.findByLabelText("9:00 AM - 12:00 PM");

      fireEvent.click(time1);
      fireEvent.click(screen.getByLabelText("In Home Delivery"));

      expect(screen.getByTestId("selected-date")).toHaveTextContent(
        "2023-05-09"
      );
      expect(screen.getByTestId("selected-time")).toHaveTextContent(
        JSON.stringify({
          id: "1",
          deliveryTime: "9:00 AM - 12:00 PM",
          startTime: "09:00",
          stopTime: "12:00",
        })
      );
      expect(screen.getByTestId("selected-time-id")).toHaveTextContent("1");
      expect(screen.getByTestId("selected-start-time")).toHaveTextContent(
        "09:00"
      );
      expect(screen.getByTestId("selected-stop-time")).toHaveTextContent(
        "12:00"
      );
    } catch (error) {
      console.log(error);
    }
  });

  it("should call navigate function with confirmation page URL when the Proceed button is clicked", async () => {
    try {
      renderDeliveryPage();
      await screen.findByText("2023-05-09");
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "2023-05-09" },
      });
      await screen.findByText("9:00 AM - 12:00 PM");
      fireEvent.click(screen.getByLabelText("9:00 AM - 12:00 PM"));
      fireEvent.click(screen.getByLabelText("In Home Delivery"));

      // Click the Proceed button
      fireEvent.click(screen.getByText("Proceed"));
      expect(navigateMock).toHaveBeenCalledWith(
        "/confirmation?selectedDate=2023-05-09&selectedTime=%7B%22id%22%3A%221%22%2C%22deliveryTime%22%3A%229%3A00%20AM%20-%2012%3A00%20PM%22%2C%22startTime%22%3A%2209%3A00%22%2C%22stopTime%22%3A%2212%3A00%22%7D&inHomeDelivery=true&selectedTimeId=1&selectedStartTime=09%3A00&selectedStopTime=12%3A00"
      );
    } catch (error) {
      console.log(error);
    }
  });
});
