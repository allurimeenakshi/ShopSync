import React from 'react';
import Product from '../clothing/Product'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const OutfitRecommendation = () => {
  let [products, setProducts] = useState([])
  let [image, setImage] = useState(null)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()



  
async function getProds(){
    let res = await fetch('http://localhost:4000/products/clothing-accessories/all')
    let prodData = await res.json()
    setProducts(prodData.payload)
}

useEffect(()=>{
  getProds();
},[])


const handleImageUpload = async (event) => {
  const imageFile = event.target.files[0];
  setImage(imageFile);
  console.log(imageFile);

  setLoading(true); 
  const formData = new FormData();
  formData.append("image", imageFile);

  
  const result = await axios.post(
    "http://localhost:4000/products/images/upload-image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log("formData", formData);

  try {
    const res = await fetch('http://localhost:4000/products/images/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to process image');
    }

    const data = await res.json();
    setLoading(false);

  } catch (error) {
    console.error('Error processing image:', error);
    setLoading(false);
  }

 
};

const handleUpload =   (event) => {
    navigate(`/chatbot`);
}
  return (
    
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">   

            <h5 className="card-title text-primary">Upload   
Your Image</h5>
            <div className="upload-section">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
              />
              <p className="upload-instructions">(Supported image formats: JPG, PNG)</p>
              <button className="btn btn-outline-primary" onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className="recommendation-container">
        {products.length > 0 ? (
          <h2 className="recommendation-header">Recommended Outfits</h2>
        ) : null}
        <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((prodObj) => (
            <div className="col" key={prodObj.id}>
              <Product prodObj={prodObj} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;