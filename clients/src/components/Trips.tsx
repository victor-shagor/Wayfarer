import React, { useEffect, useContext, useState, useRef } from "react";
import { Table, Button, Modal, Icon, Header, Input } from "semantic-ui-react";
import { SideNav } from "./Dashboard";
import { TabDiv } from "./styled-components";
import { TripContext } from "../context/TripContext";
import { useHistory } from "react-router-dom";

const Triptable = () => {
  const history = useHistory();
  if (!localStorage.getItem("token")) {
    history.push("/");
  }
  type Open = {
    open: boolean;
    closeOnEscape?: any;
    closeOnDimmerClick?: any;
  };
  const [Open, setOpen] = useState<Open>({
    closeOnDimmerClick: false,
    open: false
  });
  const origin: any = useRef();
  const destination: any = useRef();
  const [id, setId] = useState();
  const [originquery, setOrigin] = useState("");
  const [destinationquery, setDestination] = useState("");
  const { trips, getTrips, message, handleClick } = useContext(TripContext);
  const { open, closeOnDimmerClick } = Open;
  const handleBook = (e: any) => {
    e.preventDefault();
    handleClick(id);
    setOpen({ open: false });
  };
  useEffect(() => {
    getTrips(originquery, destinationquery);
  }, [originquery, destinationquery]);
  return (
    <div>
      <SideNav />
      <TabDiv>
        <form action="">
          <Input
            icon="search"
            placeholder="Origin"
            ref={origin}
            onChange={e => setOrigin(e.target.value)}
          />
          <Input
            icon="search"
            placeholder="Destination"
            ref={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </form>
        <p
          style={
            message ? { display: "block", color: "green" } : { display: "none" }
          }
        >
          {message}
        </p>
        <Table style={{ color: "#00bfa6" }} color={"green"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Trip Date</Table.HeaderCell>
              <Table.HeaderCell>Trip Time</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {trips.map((trip: any) => (
              <Table.Row key={trip.id}>
                <Table.Cell>{trip.origin}</Table.Cell>
                <Table.Cell>{trip.destination}</Table.Cell>
                <Table.Cell>
                  {new Date(trip.trip_date).toDateString()}
                </Table.Cell>
                <Table.Cell>{trip.trip_time}</Table.Cell>
                <Table.Cell>{trip.fare}</Table.Cell>
                <Table.Cell>
                  <Button
                  id={trip.id}
                    onClick={() => {
                      setId(trip.id);
                      setOpen({ closeOnDimmerClick: true, open: true });
                    }}
                    style={{ backgroundColor: "#00bfa6" }}
                    positive
                  >
                    Book
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TabDiv>
      <Modal
        open={open}
        closeOnDimmerClick={closeOnDimmerClick}
        onClose={() => setOpen({ open: false })}
        size="tiny"
      >
        <Header icon="bus" content="Trip Booking" />
        <Modal.Content>
          <p>Are you sure you want to book this trip?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen({ open: false });
            }}
            basic
            color="red"
          >
            <Icon name="remove" /> No
          </Button>
          <Button onClick={handleBook} color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default Triptable;
