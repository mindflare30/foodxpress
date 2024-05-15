import React from 'react'
// The provided code represents a carousel component in a React application. 
// A carousel is a slideshow component that allows multiple images or content to be displayed
//  one at a time in a loop, with the ability to navigate forward and backward.
export default function Carousel() {
    return (
        <div>
            {/* here goes carousel */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'> 
                {/* search bar over carousel */}
                    <div class=" carousel-caption " style={{ zIndex: "9" }}>
                        <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>

                {/* item 1 and active */}
                    <div className="carousel-item active"  >
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                {/* item 2 */}
                    <div className="carousel-item" id='Fade'>
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                {/* item3 */}
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
            {/* carousel controls */}
                {/* 1.prev button */}
                <button className="carousel-control-prev" type="button" data-bs-target="#Fade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                {/* 2.next button */}
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>


        </div>
    )
}
