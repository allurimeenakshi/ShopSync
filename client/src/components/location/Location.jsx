import React, { useState } from 'react';
import './Location.css';

function Location() {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [
    { name: 'Home Department', iframeUrl: '//momento360.com/e/u/172c9e518438473a8c56154644a9786b?utm_campaign=embed&utm_source=other&heading=16.59&pitch=-40.55&field-of-view=77&size=medium&display-plan=true' },
    { name: 'Grocery Department', iframeUrl: '//momento360.com/e/u/88ce75275e8f4671b2a7ce85b3bf625d?utm_campaign=embed&utm_source=other&heading=-115.35&pitch=2.61&field-of-view=100&size=medium&display-plan=true' },
    { name: 'Sports Department', iframeUrl: '//momento360.com/e/u/b2df8a9c9ce84380843fba644a8c4ba0?utm_campaign=embed&utm_source=other&heading=-85.72&pitch=13.16&field-of-view=100&size=medium&display-plan=true' },
    
   
  ];

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div className="image-selector">
      <select onChange={handleDepartmentChange}  className="shine-select">
        <option value="">Select a Department</option>
        {departments.map((dept) => (
          <option key={dept.name} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
      {selectedDepartment && (
        <div className="iframe-container mt-5">
          <iframe
            height="500px"
            width="100%"
            allowFullScreen={true}
            src={departments.find((dept) => dept.name === selectedDepartment).iframeUrl}
          />
        </div>
      )}
    </div>
  );

}


export default Location