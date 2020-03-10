import React, { useState, useEffect } from "react";
import { Icon, Menu, Sidebar, List } from "semantic-ui-react";
import { DashDiv, Name } from "./styled-components";
import { Link, useHistory } from "react-router-dom";
import notify from "../connect-assests/notify.png";
import io from "socket.io-client";

const server =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://busconnect.herokuapp.com/";
const socket = io(server);

export const SideNav = () => {
  const name = localStorage.first_name;
  const history = useHistory();
  return (
    <>
      <Name>Welcome {name}</Name>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        style={{ width: "120px", backgroundColor: "#00bfa6" }}
      >
        <h3 style={{ color: "white", marginTop: "40px" }}>
          <Link
            style={{ color: "white" }}
            to={
              localStorage.is_admin === "true"
                ? "/admin/dashboard"
                : "/dashboard"
            }
          >
            Dashboard
          </Link>
        </h3>
        <Menu.Item as={Link} to="/" style={{ marginTop: "60px" }}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={localStorage.is_admin === "true" ? "/admin/trips" : "/trips"}
        >
          <Icon name="bus" />
          Trips
        </Menu.Item>
        <Menu.Item as={Link} to="/bookings">
          <Icon name="book" />
          Bookings
        </Menu.Item>
        <Menu.Item as={Link} to="/hire">
          <Icon name="truck" />
          Hire Truck
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/accomodations"
          style={{ marginBottom: "100px" }}
        >
          <Icon name="home" />
          Accomodations
        </Menu.Item>
        <Menu.Item
          as="a"
          style={{ marginBottom: "100px" }}
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
        >
          <Icon name="log out" />
          Log out
        </Menu.Item>
      </Sidebar>
    </>
  );
};

const Dashboard = () => {
  type Message = {
    id: number;
    message: string;
    created_on: Date;
  };
  const [messageCount, setMessageCount] = useState(0);
  const [display, setDisplay] = useState();
  const [messageDisplay, setMessageDisplay] = useState<Message[]>([]);
  const name = localStorage.getItem('first_name');
  const history = useHistory();
  if (!localStorage.getItem("token")) {
    history.push("/");
  }
  const id = localStorage.id;
  useEffect(() => {
    async function getNotify() {
      const get = await fetch(`/api/v1/notifyUser/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: localStorage.token
        }
      });
      const result = await get.json();

      setMessageCount(result.data.messageCount);
      setMessageDisplay(result.data.messageBody);
    }

    getNotify();
  }, []);

  socket.on(`${id}`, async (data: any) => {
    setMessageDisplay([data, ...messageDisplay]);
    setMessageCount(messageCount + 1);
  });

  async function handleItem(notify: any) {
    const get = await fetch(`/api/v1/notifyUser/${notify}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.token
      }
    });
    await get.json();

    setMessageCount(messageCount - 1);
    setMessageDisplay(messageDisplay.filter(message => message.id !== notify));
  }

  return (
    <>
      <Name>
        <div>
          <span>
            <img
              alt='notification'
              src={notify}
              onClick={() => {
                display ? setDisplay(false) : setDisplay(true);
              }}
              style={{
                marginLeft: "10px",
                position: "relative",
                display: "inline-block",
                height: "35px",
                cursor: "pointer"
              }}
            ></img>
          </span>
          <span
            style={
              messageCount
                ? {
                    textAlign: "center",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    height: "20px",
                    width: "20px",
                    position: "absolute",
                    top: "10px",
                    right: "6vw",
                    color: "white"
                  }
                : { display: "none" }
            }
          >
            {messageCount}
          </span>
        </div>
        <span style={{ position: "absolute", right: "4vw" }}>
          Welcome {name}{" "}
        </span>
      </Name>
      <div
        className="card"
        style={
          !display
            ? { display: "none" }
            : {
                display: "block",
                position: "absolute",
                overflowY: "scroll",
                borderRadius: "10px",
                backgroundColor: "#eee",
                width: "22vw",
                height: "22vw",
                color: "white",
                marginLeft: "75vw"
              }
        }
      >
        {!messageDisplay.length ? (
          <ul style={{ paddingTop: "10px", color: "#00bfa6" }}>
            <li>No Notifications</li>
          </ul>
        ) : (
          messageDisplay.map(message => (
            <List
              divided
              relaxed
              onClick={async () => {
                handleItem(message.id);
              }}
            >
              <List.Item
                onClick={handleItem}
                style={{
                  color: "black",
                  paddingLeft: "10px",
                  paddingRight: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px"
                }}
              >
                <List.Icon
                  name="pointing right"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header as="a">{message.message}</List.Header>
                  <List.Description style={{ color: "black" }} as="a">
                    {`${new Date(message.created_on).toDateString()} ${new Date(
                      message.created_on
                    )
                      .toTimeString()
                      .substr(0, 5)}`}
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          ))
        )}
      </div>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        style={{ width: "120px", backgroundColor: "#00bfa6" }}
      >
        <h3 style={{ color: "white", marginTop: "40px" }}>
          <Link style={{ color: "white" }} to="/dashboard">
            Dashboard
          </Link>
        </h3>
        <Menu.Item to="/" as={Link} style={{ marginTop: "60px" }}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item to="/trips" as={Link}>
          <Icon name="bus" />
          Trips
        </Menu.Item>
        <Menu.Item to="/bookings" as={Link}>
          <Icon name="book" />
          Bookings
        </Menu.Item>
        <Menu.Item to="/hire" as={Link}>
          <Icon name="truck" />
          Hire Truck
        </Menu.Item>
        <Menu.Item
          to="/accomodations"
          as={Link}
          style={{ marginBottom: "100px" }}
        >
          <Icon name="home" />
          Accomodations
        </Menu.Item>
        <Menu.Item
          as="a"
          style={{ marginBottom: "100px" }}
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
        >
          <Icon name="log out" />
          Log out
        </Menu.Item>
      </Sidebar>

      <DashDiv>
        <div className="section2">
          <div className="back1">
            <p>
              {" "}
              <span className="header"> TRANSPORTATION SERVICES</span>
            </p>
            <p>
              We provide transportation services to and from everywhere in
              Nigeria, with a knack for satisfy our customers
            </p>
          </div>
          <div className="back2">
            <p>
              <span className="header">ACCOMODATIONS</span>
            </p>
            <p>
              We provide Accomodation services in any state, although
              accomodation is not a standalone service, you can only book an
              accomodation through us when you use our transportation service
            </p>
          </div>
          <div className="back3">
            <p>
              <span className="header">LOGISTICS</span>
            </p>
            <p>
              Are you moving from one house to another? Are you moving from one
              office to another? we've gat you covered with the best trucks for
              good delivery, and manpower require to help you load and offload
            </p>
          </div>
          <div className="back3">
            <p>
              <span className="header">LOGISTICS</span>
            </p>
            <p>
              Are you moving from one house to another? Are you moving from one
              office to another? we've gat you covered with the best trucks for
              good delivery, and manpower require to help you load and offload
            </p>
          </div>
        </div>
      </DashDiv>
    </>
  );
};
export default Dashboard;
