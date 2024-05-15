import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  // Three state variables are declared: foodCat, foodItems, and search. foodCat and foodItems are used to 
  // store data fetched from theAPI, while search is used for user input to filter the food items.

  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')

  // The function loadFoodItems is an asynchronous function that sends a POST request to the specified API 
  // endpoint. The response is then converted to 
  // JSON format and sets the foodItems and foodCat state variables with the fetched data.

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    //kch bhej nhi rhe yaha bss maang rhe 
    });
    response = await response.json()
    //basically response ye de rha [global.foodData, global.foodCategory] database se
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  //The useEffect hook is used to fetch data when the component mounts. The loadFoodItems function is
  //called only once (thanks to the empty dependency array []), ensuring it doesn't cause an infinite loop.
  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                {/* setSearch empty kr diye toh ab space wala chij dikahyega */}
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="http://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="http://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="http://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          (foodCat !== []) ? foodCat.map((data) => {  //foodCat array of objects
              return (
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName} 
                    {/* food category 1 print kiye */}
                  </div>
                  
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {/* horizontal line lagaye */}

                  {foodItems !== [] ? foodItems.filter( //foodItems array of objects ko filter kr rhe A/Q to search initially space (toh sara dikhega)
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => { //ab filtered array of objects pe iterate krke card return krke display krayenge
                      return (
                        // ek unique id dena hoga and grid banaye hai 12 column wala for virtual DOM
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>

             {/* food category 1  ka sara card show kr rhe */}
             <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>

             {/* option is array of 1 element */}
             {/* item is array of objects */}
                        </div>
                      )
                    }) : <div> No Such Data </div>}

                </div>
              )
            })  : ""}
      </div>
      <Footer />
    </div>









  )
}
 