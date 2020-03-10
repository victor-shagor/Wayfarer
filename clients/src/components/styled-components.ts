import styled from "styled-components";
import bookings from "../connect-assests/travel_booking.png";
import signpics from "../connect-assests/bus1.jpg";

export const Nav = styled.div`
  height: 7vh;
  background-color: #00bfa6;
  color: white;
  .container {
    display: none;
    cursor: pointer;
    margin-top: 30px;
  }
  
  .bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
  }
  
  .change{
    margin-top: 30px;
  }
  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }
  
  .change .bar2 {opacity: 0;}
  
  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
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
    margin-left: 70vw;
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
  @media screen and (max-width: 426px) {
    ul{
      display: none;
    }
    .container{
      display: inline-block;
      margin-left: 80vw;
      margin-top: 30px;
    }
    .change{
      display: inline-block;
      margin-left: 80vw;
      margin-top: 30px;
    }
    h3{
      margin-left: 1vw;
    }
    height: 8vh;
  }
`;

export const NavDiv = styled.div<{ marginTop?: string }>`
  background: url(${bookings});
  background-repeat: no-repeat;
  background-position: right -50px top -34px;
  background-size: 1000px;
  height: 60vh;

  .container {
    display: none;
    cursor: pointer;
    margin-top: 30px;
  }
  
  .bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: #00bfa6;
    margin: 6px 0;
    transition: 0.4s;
  }
  
  .change{
    margin-top: 30px;
  }
  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }
  
  .change .bar2 {opacity: 0;}
  
  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
  h3 {
    font-size: 30px;
    margin-top: 20px;
    margin-left: 20vh;
  }
  .nav {
    display: flex;
    margin-top: ${({ marginTop }) => marginTop};
  }
  ul {
    float: right;
    display: flex;
    list-style: none;
    margin-left: 70vw;
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
  @media screen and (max-width: 426px) {
    background: url();
    .middle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      margin-left: 0px;
    }
    .container{
      display: inline-block;
      margin-left: 85vw;
      margin-top: 0px;
    }
    .change{
      display: inline-block;
      margin-left: 85vw;
      margin-top: 0px;
    }
    h3{
      margin-left: 2vw;
    }
    ul {
      margin-left: 90vw;
      margin-top: 15px;
      display: none;
    }
    .middle .h1 {
      font-size: 30px;
    }
    .middle .h2 {
      font-size: 20px;
    }
    .middle .p {
      font-size: 15px;
    }
  }
`;

export const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .section2 {
    display: flex;
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
  @media screen and (max-width: 426px) {
    width: 100vw;
    .section2 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      width: 100vw;
    }
    .section2 .back1 {
      margin-right: 0px;
      margin-bottom: 10px
    }
    .section2 .back2 {
      margin-right: 0px;
      margin-bottom: 10px
    }
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
  @media screen and (max-width: 426px) {
  margin-top: 2vh;
  margin-bottom: 5px;
  width: 100vw;
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
  @media screen and (max-width: 426px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 50px;
      .img1{
        display:none;
      }
      .img2 {
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 0px;
      padding:10px;
      }
      .top{
        font-size: 30px;
      }
  }
  
`;

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #00bfa6;
  height: 25vh;
  bottom: 0px;
  .footer {
    display: flex;
    color: white;
  }
  .secti1 {
    margin-top: 5vh;
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
  @media screen and (max-width: 426px) {
    .footer{
    grid-gap: 0px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 50px;
  }
  h2{
    font-size: 20px;
  }
    height: 59vh;
    width: 100vw;
    .secti1 {
      margin-right: 10px;
    }
    .secti2 {
      margin-right: 10px;
    }
    .secti3 {
      margin-right: 10px;
    }
    .secti4 {
      margin-right: 50px;
    }
}
`;
export const Sign = styled.div<{ cardHeight?: string; cardWidth?: string }>`
height: 100vh;
background: url(${signpics});
background-repeat: no-repeat;
background-position: center;
background-size: cover;
@media screen and (max-width: 426px) {
  background: url();
}
`
export const SignDiv = styled.div<{ cardHeight?: string; cardWidth?: string }>`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  h3 {
    margin-bottom: 20px;
  }
  .card {
    margin-top: 10vh;
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
  input {
    height: 45px;
    width: 250px;
    border-radius: 10px;
    border: #00bfa6 1px solid;
    margin-top: 10px;
  }
  input:focus {
    border-radius: 10px;
    border: #00bfa6 1px solid;
  }
  .fir {
    margin-bottom: 20px;
  }
  .button {
    background-color: #00bfa6;
    color: white;
  }
  .button:hover {
    background-color: white;
    color: #00bfa6;
  }
  @media screen and (max-width: 426px) {
    .card {
      margin-top: 0vh;
    } 
  }
`;
SignDiv.defaultProps = {
  cardHeight: "640px",
  cardWidth: "400px"
};

export const DashDiv = styled.div`
  .section2 {
    grid-gap: 0px;
    display: grid;
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
  @media screen and (max-width: 426px) {
    .section2 {
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 35vw;
    } 
    .section2 .back1 {
      height: 160px;
      width: 230px;
    }
    .section2 .back2 {
      height: 170px;
      width: 230px;
    }
    .section2 .back3 {
      height: 170px;
      width: 230px;
      margin-bottom: 20px;
    }
  }
`;

export const Name = styled.div`
margin-top:20px;
margin-left:90vw;
color:#00bfa6;
@media screen and (max-width: 426px) {
  margin-left:68vw;
}

`

export const TabDiv = styled.div`
  margin-left: 10vw;
  margin-right: 5vw;
  margin-bottom: 5vw;
  .form{
    margin-left: 35%;
    h3{
      margin-left: 16%
    }
    .button {
     cursor:pointer;
      padding: 10px;
      border-radius: 10%;
      border: none;
      background-color: #00bfa6;
      color: white;
      margin-left: 18%
    }
    .button:hover {
      background-color: white;
      color: #00bfa6;
    }
  }
  @media screen and (max-width: 426px) {
    margin-left:40vw;
  }
`;
