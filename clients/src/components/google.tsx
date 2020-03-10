import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
// import FacebookLogin from "react-facebook-login";

const Google = () => {
  const history = useHistory();
  const handleGoogle = async (data: any) => {
    localStorage.clear();
    try {
      await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("first_name", res.data.first_name);
            localStorage.setItem("id", res.data.user_id);
            history.push("/dashboard");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // const handleFacebook = async (data: any) => {
  //   localStorage.clear();
  //   try {
  //     await fetch("/api/v1/auth/facebook", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json"
  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then(response => response.json())
  //       .then(res => {
  //         if (res.status === 200) {
  //           localStorage.setItem("token", res.data.token);
  //           localStorage.setItem("first_name", res.data.first_name);
  //           localStorage.setItem("id", res.data.user_id);
  //           history.push("/dashboard");
  //         }
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const responseGoogle = (response: any) => {
    console.log(response.profileObj);
    const { googleId, email, givenName, familyName } = response.profileObj;
    const data = {
      google_id: googleId,
      email,
      first_name: givenName,
      last_name: familyName
    };
    handleGoogle(data);
  };

  // const responseFacebook = (response: any) => {
  //   console.log(response);
  // };

  return (
    <>
      <GoogleLogin
        clientId="440467217911-qsviehe0g93jaiva4lnlro0famcg93oe.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      {/* <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture,"
    callback={responseFacebook} /> */}
    </>
  );
};

export default Google;
