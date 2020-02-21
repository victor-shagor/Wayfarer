import React, { useEffect, useContext, useState, useRef } from "react";
import { Table, Button, Modal, Icon, Header, Input } from "semantic-ui-react";
import { UserContext } from "../context/userContext";
import { SideNav } from "./Dashboard";
import { TabDiv } from "./styled-components";
import {useHistory} from 'react-router-dom'

const BookingTable = () => {
  const history = useHistory()
  if(!localStorage.token){
    history.push('/')
  }
  type Booking = {
    id: number,
    trip_id: number,
    bus_id: number,
    user_id: number,
    origin: string,
    destination: string,
    fare: number,
    trip_date: string,
    status: string
  }
  type Open= {
    open: boolean,
    closeOnEscape?: any,
    closeOnDimmerClick?:any
  }
  // const [open, setOpen] = useState();
  const origin: any= useRef();
  const destination:any = useRef();
  const [id, setId] = useState();
  const [message, setMessage] = useState();
  const [trips, setTrips] = useState<Booking[]>([]);
  const [url, setUrl] = useState('/api/v1/trips');
  const [originquery, setOrigin] = useState('');
  const [destinationquery, setDestination] = useState('');
  const [Open, setOpen] = useState<Open>({closeOnDimmerClick:false, open: false });
  const { open, closeOnDimmerClick } = Open
  const handleClick = (e: any) => {
    e.preventDefault();
    try {
      fetch(`/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          token: localStorage.token
        },
      })
        .then(response => response.json())
        .then(res => {
          setTrips(trips.filter( booking => booking.id !== id ))
          if (res.data) {
              setMessage("Booking deleted succesfully");
          }
        });
    } catch (error) {}
    setOpen({open:false});
      setTimeout(() => {
        setMessage("");
      }, 3000);
  };
  const { token } = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      const get = await fetch(`/api/v1/bookings?origin=${originquery}&destination=${destinationquery}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: localStorage.token
          }
        }
      );
      const result = await get.json();
      if (result.data) {
        setTrips(result.data);
      }
    }
    getData();
  }, [originquery, destinationquery]); 
  return (
    <div>
      <SideNav />
      <TabDiv>
        <form  action="">
        <Input icon='search'
          placeholder="Origin"
          ref={origin}
          onChange={(e) => setOrigin(e.target.value) }
        />
        <Input
        icon='search'
          placeholder="Destination"
          ref={destination}
          onChange={(e) => setDestination(e.target.value) }
        /> 
        </form>
        <p style={message?({display:"block", color:"green"}):({display:"none"})}>{message}</p>
        <Table style={{ color: "#00bfa6" }} color={"green"}>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Bus id</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Trip Date</Table.HeaderCell>
              <Table.HeaderCell>Seat Number</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {trips.map((trip: any) => (
              <Table.Row>
                <Table.Cell>{trip.bus_id}</Table.Cell>
                <Table.Cell>{trip.origin}</Table.Cell>
                <Table.Cell>{trip.destination}</Table.Cell>
                <Table.Cell>{trip.trip_date}</Table.Cell>
                <Table.Cell>{trip.seat_number}</Table.Cell>
                <Table.Cell>{trip.status}</Table.Cell>
                <Table.Cell>
                </Table.Cell>
                <Button
                  onClick={() => {
                    setId(trip.id);
                    setOpen({closeOnDimmerClick:true, open: true }) 
                  }}
                  style={{ backgroundColor: "#00bfa6" }}
                  positive
                >
                  Delete
                </Button>
              </Table.Row>
              
            ))}
          </Table.Body>
        </Table>
      </TabDiv>
      <Modal
              open={open}
              closeOnDimmerClick={closeOnDimmerClick}
              onClose={() => setOpen({open:false})}
              size="tiny"
            >
              <Header icon="bus" content="Trip Booking" />
              <Modal.Content>
                <p>Are you sure you want to delete this booking?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    setOpen({open:false});
                  }}
                  basic
                  color="red"
                >
                  <Icon name="remove" /> No
                </Button>
                <Button onClick={handleClick} color="green" inverted>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
    </div>
  );
};
export default BookingTable;
