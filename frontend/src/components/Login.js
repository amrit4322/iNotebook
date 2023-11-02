import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
        const jsonResult = await response.json();
        if(jsonResult.success){
            //redirect
            localStorage.setItem('token',jsonResult.authToken);
            props.showAlert("Logged in Successfully","success");
            navigate("/")
        }
        else{
          props.showAlert("Invalid credentials","danger");
        }
        
      };

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
