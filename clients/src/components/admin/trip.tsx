import React, { useEffect, useContext, useState, useRef } from "react";
import { Table, Button, Modal, Icon, Header, Input } from "semantic-ui-react";
import { SideNav } from "../Dashboard";
import { TabDiv } from "../styled-components";
import { TripContext } from "../../context/TripContext";
import { useHistory } from "react-router-dom";

const Triptable = () => {
  const [bus_id, setBusId] = useState("");
  const [createOrigin, setCreateOrigin] = useState("");
  const [createDestination, setCreateDestination] = useState("");
  const [trip_date, setTripDate] = useState("");
  const [trip_time, setTripTime] = useState("");
  const [fare, setFare] = useState("");
  const history = useHistory();
  if (!localStorage.token) {
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
  const [createOpen, setCreateOpen] = useState<Open>({
    closeOnDimmerClick: false,
    open: false
  });
  const origin: any = useRef();
  const destination: any = useRef();
  const [id, setId] = useState();
  const [originquery, setOrigin] = useState("");
  const [destinationquery, setDestination] = useState("");
  const {
    trips,
    getTrips,
    handleSubmit,
    error,
    tripMessage,
    handleCancel,
    cancel
  } = useContext(TripContext);
  const { open, closeOnDimmerClick } = Open;

  const submit = async (e: any) => {
    e.preventDefault();
    const data = {
      bus_id,
      origin: createOrigin,
      destination: createDestination,
      fare,
      trip_date,
      trip_time
    };
    await handleSubmit(data);
    setCreateOpen({ closeOnDimmerClick: true, open: true });
  };
  const cancelClick = (e: any) => {
    e.preventDefault();
    handleCancel(id);
    setOpen({ open: false });
  };
  useEffect(() => {
    getTrips(originquery, destinationquery);
  }, [originquery, destinationquery]);
  return (
    <div>
      <SideNav />
      <TabDiv>
        <form className="form" onSubmit={submit}>
          <h3>Create Trip</h3>
          <Input
            focus
            placeholder="Bus Id"
            style={{ margin: "10px" }}
            required
            value={bus_id}
            onChange={e => setBusId(e.target.value)}
            className="fir"
            type="text"
          />
          <Input
            focus
            required
            style={{ margin: "10px" }}
            placeholder="Amount"
            value={fare}
            onChange={e => setFare(e.target.value)}
            className="fir"
            type="text"
            id="firstname"
          />
          <br></br>
          <Input
            focus
            placeholder="Origin"
            required
            value={createOrigin}
            style={{ margin: "10px" }}
            onChange={e => setCreateOrigin(e.target.value)}
            className="fir"
            type="text"
            id="lastname"
          />
          <Input
            focus
            style={{ margin: "10px" }}
            placeholder="Destination"
            required
            value={createDestination}
            onChange={e => setCreateDestination(e.target.value)}
            className="fir"
            type="text"
            id="email"
          />{" "}
          <br></br>
          <Input
            focus
            style={{ margin: "10px" }}
            placeholder="Trip Time"
            required
            value={trip_time}
            onChange={e => setTripTime(e.target.value)}
            className="fir"
            type="text"
            id="email"
          />
          <Input
            focus
            style={{ margin: "10px" }}
            required
            placeholder="Trip Date"
            value={trip_date}
            onChange={e => setTripDate(e.target.value)}
            className="fir"
            type="text"
            id="password"
          />
          <br></br>
          <input className="button" type="submit" value="Add Trip" />
        </form>
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
            cancel ? { display: "block", color: "green" } : { display: "none" }
          }
        >
          {cancel}
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
                    onClick={() => {
                      setId(trip.id);
                      setOpen({ closeOnDimmerClick: true, open: true });
                    }}
                    color="red"
                    inverted
                  >
                    Cancel
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
          <p>Are you sure you want to cancel this trip?</p>
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
          <Button onClick={cancelClick} color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        open={createOpen.open}
        closeOnDimmerClick={createOpen.closeOnDimmerClick}
        onClose={() => setCreateOpen({ open: false })}
        size="tiny"
      >
        <Header icon="bus" content="Trip Booking" />
        <Modal.Content>
          <p>{error ? error : tripMessage}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            onClick={() => {
              setCreateOpen({ open: false });
              if (tripMessage) {
                setTripDate("");
                setTripTime("");
                setBusId("");
                setCreateDestination("");
                setCreateOrigin("");
                setFare("");
              }
            }}
            inverted
          >
            <Icon name="checkmark" /> okay
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default Triptable;
