import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // If the data array (representing cart items) is empty, it returns a message indicating that the cart is empty.
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-light'>The Cart is Empty!</div>
      </div>
    )
  }
  

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // The fetch function is used to make a network request to the URL 
    // "http://localhost:5000/api/auth/orderData" using the HTTP method POST.
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      // The headers object in the request configuration is used to set various
      //  headers for the request. In this case, it sets the Content-Type header to 'application/json'.
      headers: {
        'Content-Type': 'application/json'
      },
      // The body property is used to include the data that will be sent in the request body. 
      // JSON.stringify() is used to convert the data
      //  (an object containing order_data, email, and order_date) into a JSON string before sending it.
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
      // This allows the server to correctly parse the request body and access the data sent by 
      // the client in the appropriate format. In the server-side code, the server might use 
      // a middleware (e.g., body-parser for Express) to parse the JSON data from the request body.
    });

    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) { //200 mtlb ok shi hai 
      dispatch({ type: "DROP" }) //khali kr diye hai cart ko after posting it on server
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0) //hoisting
  return (
    <div>

      {/* {console.log(data)} */}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md text-light' >
        <table className='table table-hover text-light'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-light"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
