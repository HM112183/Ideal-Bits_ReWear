// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
// Assuming a shared table or list styling if not using CSS Modules for everything
// import styles from '../styles/admin.module.css';

function AdminDashboard() {
  const [pendingItems, setPendingItems] = useState([]);
  const [reportedItems, setReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, fetch data from admin-specific API endpoints
    // Example: axios.get('/api/admin/pending-items')
    // Example: axios.get('/api/admin/reported-items')

    // Dummy data for demonstration
    setTimeout(() => {
      setPendingItems([
        { id: 10, title: 'Vintage Leather Belt', uploader: 'User A', status: 'Pending' },
        { id: 11, title: 'Kids T-Shirt (Spam)', uploader: 'User B', status: 'Pending' },
      ]);
      setReportedItems([
        { id: 20, title: 'Broken Watch', reporter: 'User C', reason: 'Not clothing, poor condition' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (itemId) => {
    console.log(`Approving item ${itemId}`);
    // Call API to approve item
    setPendingItems(pendingItems.filter(item => item.id !== itemId));
    alert(`Item ${itemId} approved.`);
  };

  const handleReject = (itemId) => {
    console.log(`Rejecting item ${itemId}`);
    // Call API to reject item
    setPendingItems(pendingItems.filter(item => item.id !== itemId));
    alert(`Item ${itemId} rejected.`);
  };

  const handleRemove = (itemId) => {
    console.log(`Removing item ${itemId}`);
    // Call API to remove item
    setReportedItems(reportedItems.filter(item => item.id !== itemId));
    alert(`Item ${itemId} removed.`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading admin panel...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="admin-dashboard container p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <section className="pending-items card mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Item Listings</h2>
        {pendingItems.length === 0 ? (
          <p className="text-center text-gray-600">No items pending approval.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Uploader</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingItems.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.uploader}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="button button-success button-sm mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="button button-secondary button-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="reported-items card">
        <h2 className="text-2xl font-semibold mb-4">Reported Items</h2>
        {reportedItems.length === 0 ? (
          <p className="text-center text-gray-600">No reported items.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Reporter</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedItems.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.reporter}</td>
                  <td className="py-2 px-4">{item.reason}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="button button-danger button-sm" /* Assuming a 'button-danger' style for remove */
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;