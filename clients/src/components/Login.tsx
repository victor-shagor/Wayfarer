import React,{useState, useContext} from "react";
import Navbar from "./Navbar";
import { SignDiv, Nav, Sign } from "./styled-components";
import { useHistory} from 'react-router-dom'
import {UserContext} from '../context/userContext'

const Login = () => {
    const {error, token, handleSubmit} = useContext(UserContext)
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submit = async (e:any) =>{
        e.preventDefault()
        const data = {
            email,
            password
        }
        
        await handleSubmit(data)
        if(localStorage.token){
            history.push('/dashboard')
        }
    
        
    }
    
  return (
    <Sign>
      <Nav>
        <Navbar />
      </Nav>
      <SignDiv cardHeight="400px">
        <div className="card">
            <p style={error ? {display: "block", color: 'red', paddingLeft: "20px", paddingRight:"20px"} : {display:'none'}}>{error}</p>
            <h3>Signin</h3>
          <form onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <br></br>
            <input required onChange={(e)=> setEmail(e.target.value)} className="fir" type="email" id="email" /> <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <input pattern=".{5,20}" required title="password as to be atleast five characters" onChange={(e)=> setPassword(e.target.value)} className="fir" type="password" id="password" /> 
            <br></br>
            <input className="button" type="submit" value="Signin" />
          </form>
        </div>
      </SignDiv>
    </Sign>
  );
};

export default Login;