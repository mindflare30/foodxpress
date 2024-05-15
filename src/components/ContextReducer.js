import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();
//The reducer function takes the current state and an action object as arguments.
// It handles different action types and updates the state accordingly.
//The actions handled are: "ADD" to add an item to the cart, "REMOVE" to remove an item from the cart,
// "DROP" to clear the cart, and "UPDATE" to update the quantity and price of an item in the cart.
//here state is empty array reducer fxn state ko update krdega with an action
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD"://new array square bracket h spread se purana  , ek new added at last
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1) //remove vo index vala element
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE": //ek hi item or mangana hai
            let arr = [...state] //spread operator
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};


//exporting 3 things here se
// The CartProvider component uses the useReducer hook to create a state with the initial value of 
// an empty array ([]).
//  It also provides both the state and dispatch values to the context providers.
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        //providers to consumers
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

//Here, we create two custom hooks useCart and useDispatchCart. useCart returns the current cart state,
//and useDispatchCart returns the dispatch function.
//Components can use these hooks to access the cart state and dispatch actions to update it.
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


// Now, let's say you have a component that needs to access the cart state and dispatch actions:

// import React from 'react';
// import { useCart, useDispatchCart } from './CartProvider';

// function ShoppingCart() {
//   const cartState = useCart();
//   const dispatch = useDispatchCart();

//   // Use cartState to display the cart items and dispatch to update the cart

//   return (
//     // JSX for shopping cart component
//   );
// }

// export default ShoppingCart;

// In this example, the ShoppingCart component uses the useCart hook to get the current cart state and 
// useDispatchCart hook to get the dispatch function.With these hooks, it can read the cart items from the state
// and dispatch actions to update the cart as needed.

// By using the CartProvider and custom hooks (useCart and useDispatchCart), 
// components in your application can easily access and modify the shopping cart state
//  without the need for prop drilling, making the state management more organized and efficient.

//Prop Drilling:
// In React, data is typically passed from a parent component to its child components through props. 
// If a component needs to access data from its grandparent or some higher-level ancestor, 
// the data must be passed through all intermediate components. This process is called "prop drilling."