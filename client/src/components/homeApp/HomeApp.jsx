import React from 'react'
import Product from './Product'
import { useState } from 'react'
import { useEffect } from 'react'

function HomeApp() {
  let [products, setProducts] = useState([])

async function getProds(){
    let res = await fetch('http://localhost:4000/products/home-appliances/all')
    let prodData = await res.json()
    setProducts(prodData.payload)
}

useEffect(()=>{
  getProds();
},[])


  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {products.map((prodObj) => (
        <div className="col" key={prodObj.id || prodObj.name}> 
          <Product prodObj={prodObj}  />
        </div>
      ))}
      
    </div>
  )
}

export default HomeApp