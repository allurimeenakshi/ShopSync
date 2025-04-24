import React, { useState, useEffect } from "react";
import Product from "../grocery/Product";
import "./Calorie.css";
function Calorie() {
  let [products, setProducts] = useState([]);
  const [isVitaminDropdownOpen, setIsVitaminDropdownOpen] = useState(false);

  async function getProds() {
    let res = await fetch("http://localhost:4000/products/grocery/all");
    let prodData = await res.json();
    setProducts(prodData.payload);
  }
  useEffect(() => {
    getProds();
  }, []);

  const [filters, setFilters] = useState({
    protein: "",
    carbohydrates: "",
    fats: "",
    energy: "",
    sugars: "",
    vitamins: [],
  });

  const [vitaminOptions, setVitaminOptions] = useState([
    {
      value: "vitaminA",
      label: "Vitamin A",
      tags: ["eye health", "skin health"],
    },
    {
      value: "vitaminC",
      label: "Vitamin C",
      tags: ["immune system", "antioxidant"],
    },
    // ... other vitamins
  ]);

  const handleVitaminChange = (vitamin) => {
    if (filters.vitamins.includes(vitamin)) {
      setFilters({
        ...filters,
        vitamins: filters.vitamins.filter((v) => v !== vitamin),
      });
    } else {
      setFilters({ ...filters, vitamins: [...filters.vitamins, vitamin] });
    }
  };

  const fetchFiltered = async (filters) => {
    setIsLoading(true); // Set loading state while fetching
    try {
      const response = await fetch(
        "http://localhost:4000/products/grocery/filtered",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data in fetch per filter:", data);
      return data.payload
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    } finally {
      setIsLoading(false); 
    }
  };

  const handleFilter = async () => {
    const filteredProducts = products.filter((product) => {
        const { nutrition_per_100g, tags } = product;
        const { protein, carbohydrates, fats, energy, sugars, vitamins } = filters;
    
        // Convert numerical values to numbers for comparison
        const productEnergy = Number(nutrition_per_100g.energy);
        const filterEnergy = Number(energy);
    
        return (
          product.name.toLowerCase().includes(protein.toLowerCase()) &&
          product.name.toLowerCase().includes(carbohydrates.toLowerCase()) &&
          product.name.toLowerCase().includes(fats.toLowerCase()) &&
          productEnergy <= filterEnergy &&
          product.name.toLowerCase().includes(sugars.toLowerCase()) &&
          vitamins.every((vitamin) => product.tags.includes(vitamin))
        );
      });
    
      return filteredProducts;
  };
  const handleFilterRecipes = () => {
    // Implement filter logic here based on filters state and recipe data
    const filteredProducts = products.filter((product) => {
      const { nutrition_per_100g, tags } = product;
      const { protein, carbohydrates, fats, energy, sugars, vitamins } = filters;
  
      // Convert numerical values to numbers for comparison
      const productEnergy = Number(nutrition_per_100g.energy);
      const filterEnergy = Number(energy);
  
      return (
        product.name.toLowerCase().includes(protein.toLowerCase()) &&
        product.name.toLowerCase().includes(carbohydrates.toLowerCase()) &&
        product.name.toLowerCase().includes(fats.toLowerCase()) &&
        productEnergy <= filterEnergy &&
        product.name.toLowerCase().includes(sugars.toLowerCase()) &&
        vitamins.every((vitamin) => product.tags.includes(vitamin))
      );
    });
  
    setProducts(filteredProducts);
  };

  const renderVitaminTags = () => {
    return filters.vitamins.map((vitamin) => {
      const vitaminData = vitaminOptions.find((option) => option.value === vitamin);
      return (
        <span
          key={vitamin}
          className="inline-flex items-center px-2 mr-2 rounded-full"
          style={{
            backgroundColor: '#f0f0f0', // Light gray background
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for shine
            padding: '8px 12px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {vitaminData.label}
        </span>
      );
    });
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4 text-primary">Nutri-Find</h2>
      <form className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="protein" className="form-label">
            Protein:
          </label>
          <input
            type="text"
            id="protein"
            value={filters.protein}
            onChange={(e) => handleFilterChange("protein", e.target.value)}
            className="form-control"
            placeholder="Filter by protein content"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="carbohydrates" className="form-label">
            Carbohydrates:
          </label>
          <input
            type="text"
            id="carbohydrates"
            value={filters.carbohydrates}
            onChange={(e) =>
              handleFilterChange("carbohydrates", e.target.value)
            }
            className="form-control"
            placeholder="Filter by carbohydrate content"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="fats" className="form-label">
            Fats:
          </label>
          <input
            type="text"
            id="fats"
            value={filters.fats}
            onChange={(e) => handleFilterChange("fats", e.target.value)}
            className="form-control"
            placeholder="Filter by fat content"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="energy" className="form-label">
            Energy (calories):
          </label>
          <input
            type="number"
            id="energy"
            value={filters.energy}
            onChange={(e) => handleFilterChange("energy", e.target.value)}
            className="form-control"
            placeholder="Max calories per serving"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="sugars" className="form-label">
            Sugars:
          </label>
          <input
            type="text"
            id="sugars"
            value={filters.sugars}
            onChange={(e) => handleFilterChange("sugars", e.target.value)}
            className="form-control"
            placeholder="Filter by sugar content"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="vitamins" className="form-label">
            Vitamins:
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full py-2 px-4 border rounded-md focus:outline-none"
              onClick={() => setIsVitaminDropdownOpen(!isVitaminDropdownOpen)}
            >
              {filters.vitamins.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {renderVitaminTags()}
                </span>
              ) : (
                "Select Vitamins "
              )}
            </button>
            {isVitaminDropdownOpen && (
              <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-md">
                <ul>
                  {vitaminOptions.map((option) => (
                    <li
                      key={option.value}
                      className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      onClick={() => {
                        handleVitaminChange(option.value);
                        setIsVitaminDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 mt-3 text-center">
          <button
            type="button"
            onClick={handleFilterRecipes}
            className="btn btn-primary"
          >
            Find items
          </button>
        </div>
      </form>

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

export default Calorie;
