import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { DashDiv, Name } from './styled-components';
import { Link, useHistory } from 'react-router-dom';

export const SideNav = () => {
 const name = localStorage.first_name
 const history = useHistory()
  return (
      <>
      <Name>
         Welcome {name} 
    </Name>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
        style={{width:"120px", backgroundColor:"#00bfa6"}}
      >
          <h3 style={{color:"white", marginTop:"40px"}}>Dashboard</h3>
        <Menu.Item as={Link} to="/" style={{marginTop:'60px'}}>
          <Icon name='home'/>
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/trips">
          <Icon name='bus' />
          Trips
        </Menu.Item>
        <Menu.Item as={Link} to="/bookings">
          <Icon name='book' />
          Bookings
        </Menu.Item>
        <Menu.Item as={Link} to="/hire">
          <Icon name='truck' />
         Hire Truck
        </Menu.Item>
        <Menu.Item as={Link} to="/accomodations" style={{marginBottom:'100px'}}>
          <Icon name='home' />
          Accomodations
        </Menu.Item>
        <Menu.Item as='a' style={{marginBottom:'100px'}} onClick={() => {localStorage.clear() 
          history.push('/')}}>
          <Icon name='log out' />
          Log out
        </Menu.Item>
        </Sidebar>
        </>
      )
      }

const Dashboard = () => {
  
 const name = localStorage.first_name
 const history = useHistory()
if(!localStorage.token){
  history.push('/')
}

  return (
      <>
      <Name>
         Welcome {name} 
        </Name>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
        style={{width:"120px", backgroundColor:"#00bfa6"}}
      >
          <h3 style={{color:"white", marginTop:"40px"}}>Dashboard</h3>
          <Menu.Item as='a' style={{marginTop:'60px'}}>
          <Icon name='home'/>
          Home
        </Menu.Item>
        <Menu.Item to="/trips" as={Link}>
          <Icon name='bus' />
          Trips
        </Menu.Item>
        <Menu.Item to="/bookings" as={Link}>
          <Icon name='book' />
          Bookings
        </Menu.Item>
        <Menu.Item to="/hire" as={Link}>
          <Icon name='truck' />
         Hire Truck
        </Menu.Item>
        <Menu.Item to="/accomodations" as={Link} style={{marginBottom:'100px'}}>
          <Icon name='home' />
          Accomodations
        </Menu.Item>
        <Menu.Item as='a' style={{marginBottom:'100px'}} onClick={() => {localStorage.clear() 
          history.push('/')}}>
          <Icon name='log out' />
          Log out
        </Menu.Item>
        </Sidebar>
        
        <DashDiv>
    <div className="section2">
     <div className="back1">
         <p> <span className="header"> TRANSPORTATION SERVICES</span></p>
         <p>We provide transportation services to and from everywhere in Nigeria, with a knack for satisfy our customers</p>
     </div>
     <div className="back2">
         <p><span className="header">ACCOMODATIONS</span></p>
         <p>We provide Accomodation services in any state, although accomodation is not a standalone service, you can only book an accomodation through us when you use our transportation service</p>
     </div>
     <div className="back3">
         <p><span className="header">LOGISTICS</span></p>
         <p>Are you moving from one house to another? Are you moving from one office to another? we've gat you covered with the best trucks for good delivery, and manpower require to help you load and offload</p>
     </div>
     <div className="back3">
         <p><span className="header">LOGISTICS</span></p>
         <p>Are you moving from one house to another? Are you moving from one office to another? we've gat you covered with the best trucks for good delivery, and manpower require to help you load and offload</p>
     </div>
 </div>
 </DashDiv>
      </>
  )
}
export default Dashboard 