import React, { useState } from 'react';


type Obj = {
    email: string,
    password: string
  }
  type ret= {
      first_name: string,
      token: string
  }

type UserContextType = { handleSubmit: (data:Obj) => Promise<void> | null, token:string, first_name:string, error:string }
const defaultValue = { handleSubmit: (data:Obj) => null, token:'', first_name:'', error: ''}

export const UserContext = React.createContext<UserContextType>(defaultValue)

const UserContextProvider = (props: any) => {
  const [token, setToken] = useState<string>('');
  const [first_name, setFirst_name] = useState<string>('');
  const [error, setError] = useState<string>('');

const handleSubmit = async (data:Obj) => {
        localStorage.clear();
            try {
                 await fetch('/api/v1/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                .then(res => {
                    if(res.status === 200){
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("first_name", res.data.first_name)
                        setToken(localStorage.token)
                        setFirst_name(res.data.first_name)
                    }
                    setError(res.error)
                    
                })
            } catch (error) {
                console.log(error);
                
            }
      setTimeout(() => {
        setError("");
      }, 3000);
             
}


  return (
    <UserContext.Provider value={{ handleSubmit, token, first_name, error }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider