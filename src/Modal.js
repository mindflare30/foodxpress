import React from 'react'
import ReactDom from 'react-dom'
// The provided code represents a simple modal component in React. A modal is a popup or dialog box that 
// appears on top of the main content and typically provides additional(Cart website ke upar with a cross button)
//  information or allows users to perform specific actions without navigating to a new page.
const MODAL_STYLES = { //modal
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = { //background
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
    {/* inline css */}
      <div style={OVERLAY_STYLES} /> 
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    //on close mtlb uss pop up ko close krne pe kya hoga
    document.getElementById('cart-root')
  )
}