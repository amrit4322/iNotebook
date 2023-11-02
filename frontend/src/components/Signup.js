import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword} = credentials;
        if(password!==cpassword){
          alert("Password and confirm password should be same")
        }
        else{
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email,password}),
        });
        const jsonResult = await response.json();
        if(jsonResult.success){
            //redirect
            localStorage.setItem('token',jsonResult.authToken);
            navigate("/");
            props.showAlert("Account created Successfully","success");
        }
        else{
           props.showAlert("Invalid credentials","danger");
        }
        
      }
      };

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            
            onChange={onChange}
          />
          
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
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
  )
}

export default Signup
