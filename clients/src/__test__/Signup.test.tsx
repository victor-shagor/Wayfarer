import React from "react";
import { render, getByTitle, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../components/Signup";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import fetchMock from "fetch-mock";

afterEach(() => {
    fetchMock.restore();
  });

describe("Login", () => {
  test("It renders", async () => {
    const history = createMemoryHistory();

    const { container, getByText, getByLabelText } = render(
      <Router history={history}>
          <Signup/>
      </Router>
    );
    const btn = getByTitle(container, /Signup/);
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    const fname = getByLabelText("First Name");
    const lname = getByLabelText("Last Name");
    expect(btn).not.toBeNull();
    expect(email).not.toBeNull();
    expect(pass).not.toBeNull();
    expect(fname).not.toBeNull();
    expect(lname).not.toBeNull();
  });

  it("shows an alert when a signup failure happens", async () => {
    const history = createMemoryHistory();
    // jest.mock('react-router-dom', () => ({
    //     useHistory: () => ({
    //       push: jest.fn(),
    //     }),
    //   }));
    const errorText = "Email already exist";
    fetchMock.mock("/api/v1/auth/signup", {error: errorText});

    const { getByLabelText, container, getByText } = render(
    <Router history={history}>
        <Signup />
      </Router>
    );
    const btn = getByTitle(container, /Signup/);
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    const fname = getByLabelText("First Name");
    const lname = getByLabelText("Last Name");

    userEvent.type(email, "abiojo@gmail.com");
    userEvent.type(pass, "oleji1");
    userEvent.type(fname, "Jide");
    userEvent.type(lname, "Ofor");

    await act(async () => {
      userEvent.click(btn);
    });

    expect(getByText(errorText)).toBeInTheDocument();
  });
  it("show success message", async () => {
    const history = createMemoryHistory();
    const message = "email has being sent to your account, please click on the link in the email to verify your account";

    fetchMock.mock("/api/v1/auth/signup", {message: 'email has being sent to your account, please click on the link in the email to verify your account'});
    
    const { getByLabelText, container, getByText } = render(
    <Router history={history}>
        <Signup />
      </Router>
    );
const btn = getByTitle(container, /Signup/);
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    const fname = getByLabelText("First Name");
    const lname = getByLabelText("Last Name");

userEvent.type(email, "abiojo@gmail.com");
    userEvent.type(pass, "oleji1");
    userEvent.type(fname, "Jide");
    userEvent.type(lname, "Ofor");

    await act(async () => {
      userEvent.click(btn);
    });

    expect(getByText(message)).toBeInTheDocument();
  });
});
