/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer'; //navbar se hm edit nhi krenge dispatchCart fxn not needed here
import Modal from '../Modal'; //to view a popup on screen
import Cart from '../screens/Cart';
export default function Navbar(props) {
    // Here, the component uses the useState hook to create a state variable cartView and its 
    // corresponding setter function setCartView. The initial state of cartView is set to false. 
    // The line localStorage.setItem('temp', "first") 
    // sets an item in the local storage with the key 'temp' and the value 'first'.
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login") //yaha link nhi likh skte kyuki link koi chij hota hai ye bss navigate krdega
        //isme end point likhte h frontend ka host ke baad likha hua chij
    }
    // The handleLogout function removes the item with the key 'token' from the local storage and then 
    // navigates the user to the "/login" route.
    const loadCart = () => {
        setCartView(true)
    }
    //  The loadCart function sets the cartView state to true,indicating that the cart should be shown.
    const items = useCart(); //hook ko aise hi activate krte h
    //The component uses the useCart hook from the './ContextReducer' file to get the items array, which seems 
    // to represent the items in the cart.
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">FoodXpress</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                                {/* to represent end points */}
                            </form> :
                            <div>
                                {/* div ko hi har chij ki tarah use krlo bro by adding classNames */}
                                <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        {/* array ka size */}
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                {/* close button fxn */}
                                {(cartView) ? <Modal onClose={() => setCartView(false)}> 
                                    <Cart></Cart> </Modal>
                                    // cart component called as modal
                                     : ""}

                                <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
// Conditionally Rendering Elements:
// Several parts of the JSX are conditionally rendered based on whether the user is logged in 
// (localStorage.getItem("token")) and whether the cartView state is true or false.

// Overall, this Navbar component serves as a navigation bar for the web application. It
//  displays different links based on the user's login status, allows users to view their cart, and
//   provides buttons for login/logout actions.
//  The shopping cart modal will be shown when the user clicks on the cart icon.
