import styled from "styled-components";
import bookings from "../connect-assests/travel_booking.png";
import signpics from "../connect-assests/bus1.jpg";


export const Nav = styled.div`
height:8vh;
background-color: #00bfa6;
color: white;
h3 {
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 15vh;
  }
  .nav {
    display: flex;
    margin-top: -90px;
  }
  ul {
    float: right;
    display: flex;
    list-style: none;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-left: 880px;
  }

  li a {
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    letter-spacing: 0;
    color: #c4c9d9;
    cursor: pointer;
  }
  li a:hover {
    background-color: #00bfa6;
    border-radius: 10%;
    border: none;
    width: 150px;
    height: 40px;
    color: white;
  }
`

export const NavDiv = styled.div<{marginTop?: string}>`
  background: url(${bookings});
  background-repeat: no-repeat;
  background-position: right -50px top -34px;
  background-size: 1000px;
  height: 60vh;
  h3 {
    font-size: 30px;
    margin-top: 20px;
    margin-left: 15vh;
  }
  .nav {
    display: flex;
    margin-top: ${({marginTop})=> marginTop};
  }
  ul {
    float: right;
    display: flex;
    list-style: none;
    margin-left: 880px;
  }

  li a {
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    letter-spacing: 0;
    color: #c4c9d9;
    cursor: pointer;
  }
  li a:hover {
    background-color: #00bfa6;
    border-radius: 10%;
    border: none;
    width: 150px;
    height: 40px;
    color: white;
  }
  .middle {
    margin-top: 150px;
    text-align: left;
    margin-left: 20vh;
    color: #31384e;
  }

  .middle .h1 {
    font-size: 50px;
    font-family: "Open Sans", sans-serif;
    color: #31384e;
    font-weight: bold;
  }
  .middle .h2 {
    font-size: 31px;
    font-family: "Open Sans", sans-serif;
    color: #31384e;
    font-weight: lighter;
  }
  .middle .p {
    text-align: left;
    font-family: "Open Sans", sans-serif;
    font-size: 18px;
    color: #697598;
    opacity: 0.8;
    font-weight: normal;
  }
  .middle input {
    background-color: #00bfa6;
    border-radius: 10%;
    border: none;
    width: 150px;
    height: 40px;
    color: white;
    cursor: pointer;
  }
  .middle input:hover {
    background-color: white;
    color: #00bfa6;
    border: 1px solid #00bfa6;
  }
`;

export const SectionDiv = styled.div`
  .section2 {
    display: flex;
    margin-left: 20vh;
    margin-top: 86px;
    margin-bottom: 30px;
  }

  .section2 .back1 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: transparent linear-gradient(134deg, #00bfa6 0%, #83e0bd 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e1a;
    margin-right: 37px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    text-align: center;
    transition: transform 0.5s;
  }
  .back1:hover {
    transform: scale(1.1);
  }
  .section2 .back2 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e14;
    margin-right: 37px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    transition: transform 0.5s;
  }
  .back2:hover {
    transform: scale(1.1);
  }
  .section2 .back3 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e14;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    transition: transform 0.5s;
  }
  .back3:hover {
    transform: scale(1.1);
  }
  .section2 p {
    padding-bottom: 10px;
    font-size: 13px;
    font-family: "Open Sans", sans-serif;
  }
  .header {
    font-weight: 800;
  }
  img {
    margin-top: 20px;
  }
`;
export const Services = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: -60px;
  justify-content: center;
  .services .h1 {
    color: #00bfa6;
    font-family: "Open Sans", sans-serif;
  }
  .services .h2 {
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
  }
`;
export const Section1Div = styled.div`
  display: flex;
  .img1 {
    margin-left: 10vh;
    margin-right: 10px;
    margin-top: -15px;
  }
  .img2 {
    text-align: center;
    margin-right: 97px;
    margin-top: 50px;
  }
  .top {
    font-weight: 500;
    font-size: 40px;
    width: 400px;
    height: 97px;
  }
  .btw {
    padding-top: 10px;
  }
  input {
    background-color: #00bfa6;
    border-radius: 10%;
    border: none;
    width: 150px;
    height: 40px;
    color: white;
    cursor: pointer;
  }
  input:hover {
    background-color: white;
    color: #00bfa6;
    border: 1px solid #00bfa6;
  }
`;

export const FooterDiv = styled.div`
  display: flex;
  height: 30vh;
  background-color: #00bfa6;
  color: white;

  .secti1 {
    margin-top: 5vh;
    margin-left: 280px;
    margin-right: 150px;
  }
  .secti2 {
    margin-top: 2vh;
    margin-right: 130px;
  }
  .secti3 {
    margin-top: 2vh;
    margin-right: 130px;
  }
  .secti4 {
    margin-top: 2vh;
    margin-right: 50px;
  }
  img {
    height: 30px;
    margin: 2px;
    transition: transform 0.2s;
  }
  img:hover {
    transform: scale(1.1);
  }
`;
export const SignDiv = styled.div<{ cardHeight?: string, cardWidth?: string}>`
  height: 92vh;
  background: url(${signpics});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
h3{
    margin-bottom: 20px;
}
  .card{
    background-color: white;
    height: ${({ cardHeight }) => cardHeight};
    width: ${({ cardWidth }) => cardWidth};
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
}
input{
    height: 45px;
    width: 250px;
    border-radius: 10px;
    border: #00bfa6 1px solid;
    margin-top: 10px;
}
input:focus{
    border-radius: 10px;
    border: #00bfa6 1px solid;
}
.fir{
margin-bottom: 20px;
}
.button{
    background-color: #00bfa6;
    color: white;
}
.button:hover{
    background-color: white;
    color:  #00bfa6;
}
`;
SignDiv.defaultProps = {
    cardHeight: '600px',
    cardWidth: '400px'
  };

  export const DashDiv = styled.div`
  .section2 {
    grid-gap: 0px;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 25vw;
    margin-top: 86px;
    margin-bottom: 30px;
  }

  .section2 .back1 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: transparent linear-gradient(134deg, #00bfa6 0%, #83e0bd 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e1a;
    margin-right: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 20px;
    color: white;
    text-align: center;
    transition: transform 0.5s;
  }
  .back1:hover {
    transform: scale(1.1);
  }
  .section2 .back2 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e14;
    margin-right: 5px;
    margin-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    transition: transform 0.5s;
  }
  .back2:hover {
    transform: scale(1.1);
  }
  .section2 .back3 {
    height: 250px;
    width: 348px;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 50px #31384e14;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    transition: transform 0.5s;
  }
  .back3:hover {
    transform: scale(1.1);
  }
  .section2 p {
    padding-bottom: 10px;
    font-size: 13px;
    font-family: "Open Sans", sans-serif;
  }
  .header {
    font-weight: 800;
  }
`;

export const TabDiv = styled.div`
margin-left: 10vw;
margin-right: 5vw
`