import React, { useState, useContext } from "react";
import Navbar from "../Navbar";
import { SignDiv, Nav, Sign } from "../styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Google from "../google";

const Login = () => {
  const { error, handleSubmit } = useContext(UserContext);
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    await handleSubmit(data);
    if (localStorage.token) {
      if (localStorage.is_admin !== "true") {
        history.push("/dashboard");
      } else {
        history.push("/admin/dashboard");
      }
    }
  };

  return (
    <Sign>
      <Nav>
        <Navbar />
      </Nav>
      <SignDiv cardHeight="500px">
        <div className="card">
          <p
            style={
              error
                ? {
                    display: "block",
                    color: "red",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                  }
                : { display: "none" }
            }
          >
            {error}
          </p>
          <h3>Signin</h3>
          <form onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              required
              onChange={e => setEmail(e.target.value)}
              className="fir"
              type="email"
              id="email"
            />{" "}
            <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              pattern=".{5,20}"
              required
              title="password as to be atleast five characters"
              onChange={e => setPassword(e.target.value)}
              className="fir"
              type="password"
              id="password"
            />
            <br></br>
            <input className="button" type="submit" title="Signin" value="Signin" />
          </form>
          <h4 style={{ marginTop: "5px" }}>
            don't have an account?{" "}
            <Link style={{ color: "#00bfa6" }} to="/signup">
              Signup
            </Link>
          </h4>
          <h3 style={{ marginTop: "0px" }}> OR </h3>
          <h4 style={{ marginTop: "0px" }}>
            Signin using{" "}
            <span style={{ marginLeft: "10px" }}>
              <Google />
            </span>
          </h4>
        </div>
      </SignDiv>
    </Sign>
  );
};

export default Login;
