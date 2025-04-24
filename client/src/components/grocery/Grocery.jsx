import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

function Grocery() {
  let [products, setProducts] = useState([]);
  let navigate = useNavigate();

  async function getProds() {
    let res = await fetch("http://localhost:4000/products/grocery/all");
    let prodData = await res.json();
    setProducts(prodData.payload);
  }

  useEffect(() => {
    getProds();
  }, []);

  const handleClick = () => {
    navigate("/recipes");
  };

  function handleCalorieClick() {
    navigate("/calorie");
  }

  return (
    <div>

      <div className="d-flex justify-content-between">

        <button
          className="find-recommendation-btn "
          onClick={handleCalorieClick}
        >
          Nutri-Find
        </button>
        <button className="find-recommendation-btn me-5" onClick={handleClick}>
          Find Recipes{" "}
        </button>

      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

        {products.map((prodObj) => (
          <div className="col" key={prodObj.id}>
             <Product prodObj={prodObj} />         {" "}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Grocery;
