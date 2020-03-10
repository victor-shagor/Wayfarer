import React from "react";
import { render, getByTitle, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login/Login";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Provider from "../context/userContext";
import fetchMock from "fetch-mock";

afterEach(() => {
    fetchMock.restore();
  });

describe("Login", () => {
  test("It renders", async () => {
    const history = createMemoryHistory();

    const { container, getByText, getByLabelText } = render(
      <Router history={history}>
        <Provider>
          <Login />
        </Provider>
      </Router>
    );
    const btn = getByTitle(container, /Signin/);
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    fireEvent.click(btn);
    expect(btn).not.toBeNull();
    expect(email).not.toBeNull();
    expect(pass).not.toBeNull();
  });

  it("shows an alert when a login failure happens", async () => {
    const history = createMemoryHistory();
    // jest.mock('react-router-dom', () => ({
    //     useHistory: () => ({
    //       push: jest.fn(),
    //     }),
    //   }));
    const errorText = "Invalid username or password";
    fetchMock.mock("/api/v1/auth/signin", {error: errorText});

    const { getByLabelText, container, getByText } = render(
    <Router history={history}>
      <Provider>
        <Login />
      </Provider>
      </Router>
    );
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    const btn = getByTitle(container, /Signin/);

    userEvent.type(email, "abiojo@gmail.com");
    userEvent.type(pass, "oleji1");

    await act(async () => {
      userEvent.click(btn);
    });

    expect(getByText(errorText)).toBeInTheDocument();
  });
  it("save token to localStorage", async () => {
    const history = createMemoryHistory();
    const localStorage = jest.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'setItem',
      );

    fetchMock.mock("/api/v1/auth/signin", {status: 200, data: {id:1, is_admin:false, token: 'kdfjkdmfmefkefem398448y4', first_name: 'Jideofor'}});
    
    const { getByLabelText, container } = render(
    <Router history={history}>
      <Provider>
        <Login />
      </Provider>
      </Router>
    );
    const email = getByLabelText("Email");
    const pass = getByLabelText("Password");
    const btn = getByTitle(container, /Signin/);

    userEvent.type(email, "abiojo@gmail.com");
    userEvent.type(pass, "oleji1");

    await act(async () => {
      userEvent.click(btn);
    });

    expect(localStorage).toHaveBeenCalledTimes(4);
  });
});
