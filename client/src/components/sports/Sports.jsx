import React, { useState, useEffect } from 'react';
import Product from './Product';

function Sports() {
  let [products, setProducts] = useState([]);

  async function getProds() {
    let res = await fetch('http://localhost:4000/products/sports/all');
    let prodData = await res.json();
    setProducts(prodData.payload);
  }

  useEffect(() => {
    getProds();
  }, []);

 

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((prodObj) => (
          <div className="col" key={prodObj.id}>
            <Product prodObj={prodObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sports;