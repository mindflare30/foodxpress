import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");
  let navigate = useNavigate()


  const handleClick = async (e) => {  //e is event
    // The first line inside the function prevents the default behavior of the event e. 
    // This is often used in event handlers to prevent page refresh or navigation:
    e.preventDefault();

    // The navLocation function is defined inside handleClick. It returns a Promise that attempts 
    // to get the user's geolocation using the navigator.geolocation.getCurrentPosition method:
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej); //(permission)
      });
    }
    // The await keyword is used to wait for the navLocation Promise to resolve. 
    // Once it resolves, the user's latitude and longitude are extracted and stored in the latlong variable:
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]  //multi lines of code
    })

    //The latitude and longitude values are then extracted from the latlong array and stored in 
    // separate variables lat and long:
    let [lat, long] = latlong //DeConstructing
    
    // The code makes a POST request to "http://localhost:5000/api/auth/getlocation" with the user's 
    // latitude and longitude in the request body. It uses the fetch function to perform the API call
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //req body  me  ye jayega
      body: JSON.stringify({ latlong: { lat, long } }) //latitude and longitude in the request body
    });
    
    // The response from the server is parsed as JSON, and the location property is extracted from it:
    const { location } = await response.json()
    // console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location }) //khud fill adress 
  }

  //details submit kr rhe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token to local storage and redirect
      // localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div style={{ backgroundImage: 'url("http://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover' ,height:'100vh'}}>
      <div> <Navbar/> </div>
      <div  style={{height : '70px'}}></div>
        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="text-center">
              <label htmlFor="name" className="form-label text-white h2 mt-3">SignUp</label>
            </div>
            <div className="m-3">
              <label htmlFor="name" className="form-label text-light">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>

            <div className="m-3">
              <label htmlFor="email" className="form-label text-light">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>

            <div className="m-3">
              <label htmlFor="address" className="form-label text-light">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>

            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>

            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
      </div>
  )
}