// src/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css'; // Import CSS Module

function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    // In a real application, you'd fetch this data from an API
    // Example: axios.get('/api/user/profile').then(res => setProfile(res.data));
    // Example: axios.get('/api/user/items').then(res => setUploadedItems(res.data));
    // Example: axios.get('/api/user/swaps').then(res => setSwaps(res.data));

    // Dummy data for demonstration
    setProfile({
      name: 'John Doe',
      email: 'john.doe@example.com',
      points: 250,
    });

    setUploadedItems([
      { id: 1, name: 'Red Scarf', status: 'Available', imageUrl: 'https://via.placeholder.com/100/ff0000/ffffff?text=Scarf' },
      { id: 2, name: 'Winter Gloves', status: 'Pending Swap', imageUrl: 'https://via.placeholder.com/100/0000ff/ffffff?text=Gloves' },
      { id: 3, name: 'Denim Jacket', status: 'Swapped', imageUrl: 'https://via.placeholder.com/100/333333/ffffff?text=Jacket' },
    ]);

    setSwaps([
      { id: 1, itemName: 'Blue Shirt (My Item)', swapWith: 'Jane Smith (Her Jeans)', status: 'Ongoing' },
      { id: 2, itemName: 'Sneakers (Her Item)', swapWith: 'Mike Brown (My Jacket)', status: 'Completed' },
      { id: 3, itemName: 'Green Dress (My Item)', swapWith: 'Sarah Lee (Her Bag)', status: 'Pending Approval' },
    ]);
  }, []);

  if (!profile) {
    return <div className={styles.emptyState}>Loading dashboard...</div>;
  }

  return (
    <div className={styles.dashboardPage}>
      <h1>Welcome, {profile.name}!</h1>

      <section className={styles.profileSection}>
        <h2 className={styles.sectionTitle}>Your Profile</h2>
        <div className={styles.profileInfo}>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Points Balance:</strong> <span className={styles.pointsBalance}>{profile.points}</span></p>
          {/* Add option to edit profile */}
          <button className="button button-secondary">Edit Profile</button>
        </div>
      </section>

      <section className={styles.itemsSection}>
        <h2 className={styles.sectionTitle}>Your Uploaded Items</h2>
        {uploadedItems.length === 0 ? (
          <p className={styles.emptyState}>You haven't listed any items yet. <Link to="/add-item">List an item now!</Link></p>
        ) : (
          <div className={styles.itemsGrid}>
            {uploadedItems.map(item => (
              <div key={item.id} className={styles.itemTile}>
                <img src={item.imageUrl} alt={item.name} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Status: {item.status}</p>
                  <Link to={`/item/${item.id}`}>View Item</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.swapsSection}>
        <h2 className={styles.sectionTitle}>Your Swaps</h2>
        {swaps.length === 0 ? (
          <p className={styles.emptyState}>No ongoing or completed swaps yet.</p>
        ) : (
          <ul className={styles.swapList}>
            {swaps.map(swap => (
              <li key={swap.id} className={styles.swapItem}>
                <p><strong>{swap.itemName}</strong> {swap.status === 'Ongoing' ? 'is swapping with' : 'swapped with'} <strong>{swap.swapWith}</strong></p>
                <p className={`${styles.swapStatus} ${swap.status === 'Ongoing' ? styles.ongoing : styles.completed}`}>{swap.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;