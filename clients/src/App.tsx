import React from "react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Signin from "./components/Login/Login";
import Trips from './components/Trips';
import Bookings from './components/Bookings/Bookings';
import Emailverify from "./components/Verify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/dashboard';
import AdminTrips from './components/admin/trip';
import UserContextProvider from './context/userContext';
import TripContextProvider from './context/TripContext';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/verifyEmail">
            <Emailverify />
          </Route>
        <UserContextProvider>
        <Route path="/signin">
            <Signin />
          </Route>
          <TripContextProvider>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/trips">
            <Trips />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/admin/trips">
            <AdminTrips />
          </Route>
          <Route path="/accomodations">
          <h1>Accomodations not available, kindly book trips for now</h1>
          </Route>
          <Route path="/hire">
            <h1>Truck hire not available, kindly book trips for now</h1>
          </Route>
          </TripContextProvider>
        </UserContextProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
