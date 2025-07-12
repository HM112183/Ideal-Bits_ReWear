// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/landingPage.module.css'; // Import CSS Module

function LandingPage() {
  // Dummy data for demonstration
  const featuredItems = [
    { id: 1, name: 'Vintage Denim Jacket', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Item+1' },
    { id: 2, name: 'Summer Dress', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Item+2' },
    { id: 3, name: 'Running Shoes', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Item+3' },
  ];

  const categories = [
    { id: 1, name: 'Tops' },
    { id: 2, name: 'Bottoms' },
    { id: 3, name: 'Dresses' },
    { id: 4, name: 'Outerwear' },
    { id: 5, name: 'Accessories' },
    { id: 6, name: 'Footwear' },
  ];

  const productListings = [
    { id: 101, name: 'Blue Jeans', imageUrl: 'https://via.placeholder.com/200x200/dddddd/000000?text=Product+A', price: 'Swap/100 points' },
    { id: 102, name: 'Leather Bag', imageUrl: 'https://via.placeholder.com/200x200/dddddd/000000?text=Product+B', price: 'Swap/150 points' },
    { id: 103, name: 'Graphic T-Shirt', imageUrl: 'https://via.placeholder.com/200x200/dddddd/000000?text=Product+C', price: 'Swap/80 points' },
    { id: 104, name: 'Winter Coat', imageUrl: 'https://via.placeholder.com/200x200/dddddd/000000?text=Product+D', price: 'Swap/200 points' },
  ];

  return (
    <div className={styles.landingPage}>
      <section className={styles.heroSection}>
        <h1>ReWear: Community Clothing Exchange</h1>
        <p>Promoting sustainable fashion and reducing textile waste by encouraging reuse.</p>
        <div className={styles.callToActionButtons}>
          <Link to="/add-item" className="button button-primary">List an Item</Link>
          <Link to="/browse-items" className="button button-success">Browse Items</Link>
          <Link to="/dashboard" className="button button-secondary">Start Swapping</Link>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionHeader}>Featured Items</h2>
        <div className={styles.featuredItemsGrid}>
          {featuredItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <img src={item.imageUrl} alt={item.name} />
              <div className={styles.itemCardContent}>
                <h3>{item.name}</h3>
                <Link to={`/item/${item.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionHeader}>Browse Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.name.toLowerCase()}`} className={styles.categoryCard}>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionHeader}>Latest Listings</h2>
        <div className={styles.productListingsGrid}>
          {productListings.map(product => (
            <div key={product.id} className={styles.itemCard}>
              <img src={product.imageUrl} alt={product.name} />
              <div className={styles.itemCardContent}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <Link to={`/item/${product.id}`}>View Item</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;