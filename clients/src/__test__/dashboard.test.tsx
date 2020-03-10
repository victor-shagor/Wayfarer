import React from "react";
import { render, getByTitle, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../components/Dashboard";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Provider from "../context/userContext";
import fetchMock from "fetch-mock";

afterEach(() => {
    fetchMock.restore();
  });

describe("Login", () => {
  test("It renders", async () => {
    const body = {
        first_name: 'Dimeji',
        token:
          'a.eyJpZCI6IjI0YzA5MjYzLTYyZTQtNDcyOC1iMTNlLTIwMjlkNjkwZDBhYiIsImZpcnN0X25hbWUiOiJKb2huIiwibGFzdF9uYW1lIjoiRG9lIiwidXNlcm5hbWUiOiJqb2huIiwidHlwZSI6InN0dWRlbnQiLCJpYXQiOjE1NzYwMDUxODUsImF1ZCI6ImxvY2FsaG9zdCJ9.b',
      };
    const history = createMemoryHistory();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => body.token);
    Storage.prototype.getItem = jest.fn(() => body.first_name);
    const { getByText} = render(
      <Router history={history}>
          <Dashboard />
      </Router>
    );
  const welcome = getByText('Welcome Dimeji');
  const TripLink = getByText('Trips');
  const BookLink = getByText('Bookings');
  const AccLink = getByText('Accomodations');
  const LogoutLink = getByText('Hire Truck');
  expect(welcome).toBeInTheDocument();
  expect(TripLink).toBeInTheDocument();
  expect(LogoutLink).toBeInTheDocument();
  expect(BookLink).toBeInTheDocument();
  expect(AccLink).toBeInTheDocument();
  });

//   it("shows an alert when a login failure happens", async () => {
//     const history = createMemoryHistory();
    // jest.mock('react-router-dom', () => ({
    //     useHistory: () => ({
    //       push: jest.fn(),
    //     }),
    //   }));
//     const errorText = "Invalid username or password";
//     fetchMock.mock("/api/v1/auth/signin", {error: errorText});

//     const { getByLabelText, container, getByText } = render(
//     <Router history={history}>
//       <Provider>
//         <Login />
//       </Provider>
//       </Router>
//     );
//     const email = getByLabelText("Email");
//     const pass = getByLabelText("Password");
//     const btn = getByTitle(container, /Signin/);

//     userEvent.type(email, "abiojo@gmail.com");
//     userEvent.type(pass, "oleji1");

//     await act(async () => {
//       userEvent.click(btn);
//     });

//     expect(getByText(errorText)).toBeInTheDocument();
//   });
//   it("save token to localStorage", async () => {
//     const history = createMemoryHistory();
//     const localStorage = jest.spyOn(
//         Object.getPrototypeOf(window.localStorage),
//         'setItem',
//       );

//     fetchMock.mock("/api/v1/auth/signin", {status: 200, data: {id:1, is_admin:false, token: 'kdfjkdmfmefkefem398448y4', first_name: 'Jideofor'}});
    
//     const { getByLabelText, container } = render(
//     <Router history={history}>
//       <Provider>
//         <Login />
//       </Provider>
//       </Router>
//     );
//     const email = getByLabelText("Email");
//     const pass = getByLabelText("Password");
//     const btn = getByTitle(container, /Signin/);

//     userEvent.type(email, "abiojo@gmail.com");
//     userEvent.type(pass, "oleji1");

//     await act(async () => {
//       userEvent.click(btn);
//     });

//     expect(localStorage).toHaveBeenCalledTimes(4);
//   });
});
