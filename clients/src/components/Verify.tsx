import React,{useEffect, useState} from 'react';
import {useLocation, Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'



function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Verify = () => {
    let query = useQuery()
    let token = query.get('token')
    const history = useHistory()
    if(!token){
      history.push('/')
    }

const [message, setMessage] = useState(`Email verified, kindly proceed to`)
    useEffect(() =>{
        fetch(`/api/v1/auth/verifyEmail?token=${token}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(response => response.json())
                .then(res => {
                    if(res.status !== 200){
                        setMessage('')
                    }
                    
                })
    })
    return (
        <div className="message">
            <p style={message ? {display:"block", marginLeft: "35vw", marginTop: "20vh"}:{display: "none"}}>{message} <Link to='/login'>login</Link></p> 
            <p style={message ? {display:"none"}:{ display:"block", marginLeft: "35vw", marginTop: "20vh"}}>Link expired kindly procced to <Link to='/login'>Signup</Link></p> 
        </div>
    );
};

export default Verify;