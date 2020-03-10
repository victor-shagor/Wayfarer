import React from 'react';
import { render, getByAltText } from '@testing-library/react';
import Homepage from '../components/Homepage';
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom'

test('renders learn react link', () => {
  const history = createMemoryHistory();
  const { container,getByText } = render(
  <Router history={history}>
  <Homepage />
    </Router>
    );
  const HomelinkElement = getByText('HOME');
  const SignuplinkElement = getByText('SIGNUP');
  const LoginlinkElement = getByText('LOGIN');
  const explorebutton = getByText('Explore us');
  const h1 = getByText('Bus Connect');
  const insta = getByAltText(container,'insta');
  expect(HomelinkElement).toBeInTheDocument();
  expect(SignuplinkElement).toBeInTheDocument();
  expect(LoginlinkElement).toBeInTheDocument();
  expect(explorebutton).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
  expect(insta).toBeInTheDocument();

});