import React from 'react';
import { render, getByTitle, act,fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Login from './components/Login/Login';
import App from './App';
import { createMemoryHistory } from "history";
import {Router,useRouteMatch} from 'react-router-dom'

test("renders learn react link", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(history.location.pathname).toBe("/");
});