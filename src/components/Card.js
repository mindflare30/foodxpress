
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer' //hmko add to cart krna hai jise cart modify
//so i need dispatchCart also and array items so useCart

// The Card component imports React, as well as various hooks like useState, 
// useRef, useEffect, and custom hooks useNavigate, useDispatchCart, and useCart from other modules.

export default function Card(props) {
  let data = useCart(); //activate hook  -->data = cart items array

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef(); //return an object -->priceref
  let options = props.options;//medium:412 , small :300 aisa hai 
  let priceOptions = Object.keys(options);
  // priceOptions: It stores the keys of the options object (representing the available sizes).
  let foodItem = props.item;
  const dispatch = useDispatchCart();//to dispatch actions to update the cart state.

  const handleClick = () => {

    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    // This function handles changes in the quantity select element and updates the quantity state.
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
// This function adds the selected food item to the cart using the dispatch function.
// It checks if the food item is already in the cart and updates its quantity or adds a new item accordingly.
// The finalPrice of the selected item is also calculated based on the selected quantity and size.
   if (!localStorage.getItem("token")) {
//This function handles clicks on the card and redirects to the login page if the user is not logged in.
     navigate("/login")
   } 

   let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item; //agr vo item mil gya toh food me rakhe usko
        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) { //update krenge 
      if (food.size === size) { //agr iss baar v same size order kr rhe uss chij ka
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) { //diff size
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        //yaha bell cnt bhi +1 hoga
        return
      }
      return
    }
    //add krenge kyuki food me nhi h
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
      
}


  useEffect(() => {
    // This useEffect hook runs once after the component is mounted.
  // It sets the initial size state based on the value of the priceRef select element.
    setSize(priceRef.current.value)//use state vala variable change hone pe render nhi hoga infinite times
  }, [])

//The finalPrice variable calculates the total price of the food item based on the selected quantity and size.
  let finalPrice = qty * parseInt(options[size]);
  
  return (
    <div>
         {/* Card content goes here */}
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
          {/* select list 1 */}
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }}  onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
{/* The Array.from method is used to generate options for the select element. It creates an 
array of length 6 (Array(6)) and maps each item to an option element with values from 1 to 6. 
The key is set to i + 1 to provide a unique key for 
each option, and the value attribute is set to i + 1 to represent the selected quantity. */}
            </select>
          {/* select list 2 */}
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={handleOptions}>
              {priceOptions.map((i) => { //priceOptions = [small ,medium ,large] //useRef basically innerHtml change krne ke liye used
                return <option key={i} value={i}>{i}</option>
              })}
{/* This select element represents a dropdown list for selecting the size of the food item. 
The options for size are derived from the priceOptions array, which is an array of 
strings representing available size options (e.g., ["small", "medium", "large"]). */}
            </select>
          {/* selected item ka total price hai ye a/q to qty and size */}
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/- 
            </div>

          </div>

          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        
        </div>
      </div>
    </div>
  )
}
//