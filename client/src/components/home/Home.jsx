import React from 'react';
import './Home.css'

const Home = () => {
  const shopCategories = [
    { id: 'wing1', title: 'Home Appliances', link: 'http://localhost:5173/homeApp' },
    { id: 'wing2', title: 'Sports & Gym', link: 'http://localhost:5173/sports' },
    { id: 'wing3', title: 'Clothing & Accessories', link: 'http://localhost:5173/clothing' },
    { id: 'wing4', title: 'Grocery', link: 'http://localhost:5173/grocery' },
  ];

  return (
    <div className="shop-sync">
      <header>
        <h1>Shop Sync</h1>
      </header>
      <main>
        <div className="grid-container">
          {shopCategories.map((category) => (
            <section key={category.id} className="wing" id={category.id}>
              <h2>{category.title}</h2>
              <a href={category.link} target="_blank" rel="noopener noreferrer">
                Visit {category.title}
              </a>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
