import React from "react";
import { render, getByText, fireEvent, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Booking from "../components/Bookings/Bookings";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Provider, {TripContext} from "../context/TripContext";
import fetchMock from "fetch-mock";


let realUseContext;
let useContextMock;

afterEach(() => {
    fetchMock.restore();
    cleanup;
  });

describe("Login", () => {
    test("It renders", async () => {
        const body = {
          token:
            "a.eyJpZCI6IjI0YzA5MjYzLTYyZTQtNDcyOC1iMTNlLTIwMjHlwZSI6InN0dWRlbnQiLCJpYXQiOjE1NzYwMDUxODUsImF1ZCI6ImxvY2FsaG9zdCJ9.b"
        };
        Storage.prototype.getItem = jest.fn();
        Storage.prototype.getItem = jest.fn(() => body.token);
        // const data =  
        const history = createMemoryHistory();
        // act(() =>{
        const { getByText } = render(
          <Router history={history}>
              <Booking />
          </Router>
        );
        const getOrigin1 = getByText("Origin");
        const getDestination1 = getByText("Destination");
        const Bookbutton = getByText("Trip Date");
        expect(getOrigin1).toBeInTheDocument();
        expect(getDestination1).toBeInTheDocument();
        expect(Bookbutton).toBeInTheDocument();
    })
});
