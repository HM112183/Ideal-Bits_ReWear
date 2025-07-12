// src/pages/ItemDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/itemDetail.module.css'; // Import CSS Module

function ItemDetailPage() {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // In a real app, fetch item data based on 'id' from an API
    // Example: axios.get(`/api/items/${id}`).then(res => setItem(res.data));

    // Dummy data for demonstration
    const dummyItem = {
      id: id,
      name: 'Designer Handbag',
      description: 'A stylish and spacious designer handbag, perfect for everyday use or special occasions. Made from high-quality faux leather. Features multiple compartments and a durable zipper closure. Minor wear and tear visible on corners, consistent with gentle use.',
      images: [
        'https://via.placeholder.com/600x400/888888/ffffff?text=Handbag+Front',
        'https://via.placeholder.com/600x400/777777/ffffff?text=Handbag+Back',
        'https://via.placeholder.com/600x400/666666/ffffff?text=Handbag+Inside',
        'https://via.placeholder.com/600x400/555555/ffffff?text=Handbag+Detail'
      ],
      uploader: {
        name: 'Alice Johnson',
        userId: 'user123',
        location: 'Bengaluru, India',
      },
      category: 'Accessories',
      type: 'Bag',
      size: 'One Size',
      condition: 'Good',
      tags: ['fashion', 'accessory', 'luxury', 'faux-leather', 'handbag'],
      availability: 'Available',
      pointsCost: 180,
    };
    setItem(dummyItem);
    if (dummyItem.images.length > 0) {
      setSelectedImage(dummyItem.images[0]);
    }
  }, [id]);

  if (!item) {
    return <div className="loading-message">Loading item details...</div>;
  }

  const handleSwapRequest = () => {
    // In a real application, send a swap request to the backend
    console.log(`Swap request sent for "${item.name}"!`);
    alert(`Swap request sent for "${item.name}"!`);
    // After successful request, you might update UI or redirect
  };

  const handleRedeemPoints = () => {
    // In a real application, send a redeem request to the backend
    console.log(`Redeeming "${item.name}" for ${item.pointsCost} points!`);
    alert(`Redeeming "${item.name}" for ${item.pointsCost} points!`);
    // After successful redemption, update user's points and item availability
  };

  return (
    <div className={styles.itemDetailPage}>
      <div className={styles.imageGallery}>
        <img src={selectedImage} alt={item.name} className={styles.mainImage} />
        <div className={styles.thumbnailGallery}>
          {item.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${item.name} thumbnail ${index + 1}`}
              className={`${styles.thumbnail} ${selectedImage === img ? styles.selected : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className={styles.itemDetails}>
        <h1>{item.name}</h1>
        <p className={styles.description}>{item.description}</p>

        <div className={styles.infoSection}>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p>
            <strong>Availability:</strong>
            <span className={`${styles.availabilityStatus} ${item.availability === 'Available' ? styles.available : styles.unavailable}`}>
              {item.availability}
            </span>
          </p>
        </div>

        <div className={styles.uploaderInfo}>
          <h2>Uploader Info</h2>
          <p><strong>Name:</strong> {item.uploader.name}</p>
          <p><strong>Location:</strong> {item.uploader.location}</p>
          <Link to={`/user/${item.uploader.userId}`}>View Uploader's Profile</Link>
        </div>

        <div className={styles.actionButtons}>
          {item.availability === 'Available' ? (
            <>
              <button
                onClick={handleSwapRequest}
                className="button button-primary"
              >
                Swap Request
              </button>
              <button
                onClick={handleRedeemPoints}
                className="button button-success"
              >
                Redeem via {item.pointsCost} Points
              </button>
            </>
          ) : (
            <p className="unavailable-message">This item is currently unavailable.</p>
          )}
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <h3>Tags:</h3>
            <div className={styles.tagList}>
              {item.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetailPage;