import React from "react";
import ThreeSixty from "react-360-view";

function Model() {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h1>View the 3D model</h1>
      <ThreeSixty
        amount={1}
        imagePath="/images/img-1.jpg?v1" 
        fileName="img-{index}.jpg?v1"
      />
  
    </div>
  );
}

export default Model;
