import React from 'react'
import Product from './Product'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './Clothing.css'

function Clothing() {
  let [products, setProducts] = useState([])
  let navigate = useNavigate()

async function getProds(){
    let res = await fetch('http://localhost:4000/products/clothing-accessories/all')
    let prodData = await res.json()
    setProducts(prodData.payload)
}

useEffect(()=>{
  getProds();
},[])

function handleClick(){
  navigate('/outfits')
}


  return (
    <div className="outfit-recommendation d-flex flex-column align-items-center">
      <button className="find-recommendation-btn" onClick={handleClick}>
                Find Recommendations </button>
    <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {products.map((prodObj) => (
        <div className="col" key={prodObj.id}>
          <Product prodObj={prodObj} />
        </div>
      ))}
    </div>
  </div>
    
  )
}

export default Clothing