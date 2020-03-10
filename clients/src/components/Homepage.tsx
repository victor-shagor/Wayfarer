import React from "react";
import Navbar from "./Navbar";
import {
  NavDiv,
  SectionDiv,
  Services,
  Section1Div,
  FooterDiv
} from "./styled-components";
import transpo from "../connect-assests/trasport.png";
import hotel from "../connect-assests/hotels.png";
import logistics from "../connect-assests/logistics.png";
import travelers from "../connect-assests/travelers.png";
import facebook from "../connect-assests/faceebook...png";
import insta from "../connect-assests/insta.png";
import twitter from "../connect-assests/twitter.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <NavDiv marginTop="-50px">
        <Navbar />
        <div className="middle">
          <p>
            {" "}
            <span className="h1"> Bus Connect</span>
          </p>
          <p>
            {" "}
            <span className="h2">Transport Service</span>
          </p>
          <p>
            {" "}
            <span className="p">Book a trip at the comfort of your home</span>
          </p>
          <Link to="/signup">
            <input type="submit" value="Explore us"></input>
          </Link>
        </div>
      </NavDiv>
      <Services>
        <div className="services">
          <p>
            <span className="h1"> SERVICES</span>
          </p>
          <h2>
            <span className="h2">Our Agency Provides</span>
          </h2>
        </div>
      </Services>
      <SectionDiv>
        <div className="section2">
          <div className="back1">
            <img src={transpo} alt=""></img>
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
            <img src={hotel} alt=""></img>
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
            <img src={logistics} alt=""></img>
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
      </SectionDiv>
      <Section1Div>
        <div className="img1">
          <img src={travelers} alt=''></img>
        </div>
        <div className="img2">
          <p>
            <span className="top">Easy Booking</span>
          </p>
          <p>
            <span className="btw">
              {" "}
              You can book any of our services with your devices from anywhere
              you are, there are also customer care personal online 24hours a
              day to chat with you and pick your calls anytime you reach out{" "}
            </span>
          </p>
          <Link to="/signup">
            <input type="submit" value="Get Started"></input>
          </Link>
        </div>
      </Section1Div>
      <FooterDiv>
        <div className="footer">
          <div className="secti1">
            <img src="./images/digisol-blue.svg" alt="Bus-Connect"></img>
            <p>
              mg.bus-connect.me <br></br> +234-813-937-1140
            </p>
          </div>
          <div className="secti2">
            <h2>Services</h2>
            <p>
              Transportation <br></br> Accomodations <br></br> Logistics{" "}
            </p>
          </div>
          <div className="secti3">
            <h2>About Us</h2>
            <p>
              About <br></br> Service <br></br> Blog <br></br> Privacy Policy
            </p>
          </div>
          <div className="secti4">
            <h2>Our Address</h2>
            <p>
              59/B mobolaji Estate, <br></br> Lagos, Nigeria <br></br> Email:
              admin@mg.bus-connect.me
            </p>
            <div className="social">
              <img src={facebook} alt='facebook'></img>
              <img src={insta} alt='insta' className="ist"></img>
              <img src={twitter} alt='twitter' className="second"></img>
            </div>
          </div>
        </div>
      </FooterDiv>
    </>
  );
};

export default Homepage;
