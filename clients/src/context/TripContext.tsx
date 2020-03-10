import React, { useState } from "react";

type Trip = {
  id: number;
  bus_id: number;
  origin: string;
  destination: string;
  fare: number;
  trip_date: string;
  status: string;
};

type TripContextType = {
  trips: any;
  message: string;
  tripMessage: string;
  error: string;
  cancel: string;
  getTrips: (query: any, squery: any) => Promise<void> | null;
  handleClick: (id: number) => Promise<void> | null;
  handleSubmit: (data: object) => Promise<void> | null;
  handleCancel: (data: object) => Promise<void> | null;
};
const defaultValue = {
  trips: [],
  message: "",
  error: "",
  tripMessage: "",
  cancel: '',
  getTrips: (originquery: any, destinationquery: any) => null,
  handleClick: (id: any) => null,
  handleCancel: (id: any) => null,
  handleSubmit: (data: object) => null
};

export const TripContext = React.createContext<TripContextType>(defaultValue);

const TripContextProvider = (props: any) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [message, setMessage] = useState();
  const [cancel, setCancel] = useState();
  const [tripMessage, setTripMessage] = useState();
  const [error, setError] = useState();

  const getTrips = async (originquery: any, destinationquery: any) => {
    const get = await fetch(
      `/api/v1/trips?origin=${originquery}&destination=${destinationquery}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: localStorage.token
        }
      }
    );
    const result = await get.json();
    if (result.data) {
      setTrips(result.data);
    }
  };

  const handleClick = async (id: any) => {
    const get = await fetch("/api/v1/bookings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.token
      },
      body: JSON.stringify({ trip_id: id })
    });
    const response = await get.json();
    if (response.data) {
      setTrips(trips.filter(trip => trip.id !== id));
      setMessage("Trip booked succesfully");
    }
    //   setOpen(false)

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const handleSubmit = async (data: object) => {
    const get = await fetch("/api/v1/trips", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.token
      },
      body: JSON.stringify(data)
    });
    const response = await get.json();
    setError("");
    setTripMessage("");
    if (response.data) {
      setTrips([response.data, ...trips]);
      setTripMessage("Trip created succesfully");
    } else {
      setError(response.error);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const handleCancel = async (id: any) => {
    const get = await fetch(`/api/v1/trips/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: localStorage.token
      }
    });
    const response = await get.json();
    if (response.data) {
      setTrips(trips.filter(trip => trip.id !== id));
      setCancel("Trip cancelled succesfully");
    }

    setTimeout(() => {
      setCancel("");
    }, 3000);
  };

  return (
    <TripContext.Provider
      value={{
        message,
        cancel,
        trips,
        getTrips,
        handleClick,
        handleSubmit,
        handleCancel,
        error,
        tripMessage
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};
export default TripContextProvider;
