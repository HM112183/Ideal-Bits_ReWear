// src/pages/AddNewItemPage.js
import React, { useState } from 'react';
import styles from '../styles/addItem.module.css'; // Import CSS Module

function AddNewItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '', // Comma-separated string
    images: [], // File objects
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // In a real application, you would send this data to your backend API
    // This typically involves FormData for file uploads.
    // Example using Axios for a multipart/form-data request:
    /*
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('type', formData.type);
    data.append('size', formData.size);
    data.append('condition', formData.condition);
    data.append('tags', formData.tags.split(',').map(tag => tag.trim())); // Send tags as an array

    formData.images.forEach(image => {
      data.append('images', image); // 'images' should match your backend's field name for file array
    });

    try {
      const response = await axios.post('/api/items', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Item added successfully:', response.data);
      setSuccess(true);
      // Reset form
      setFormData({
        title: '', description: '', category: '', type: '', size: '', condition: '', tags: '', images: []
      });
      setImagePreviews([]);
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
    */

    // Simulate API call for demonstration
    console.log('Simulating API call with data:', formData);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        title: '', description: '', category: '', type: '', size: '', condition: '', tags: '', images: []
      });
      setImagePreviews([]);
      console.log('Item submitted successfully (simulated).');
    }, 1500);
  };

  return (
    <div className={styles.addItemPage}>
      <h1>List a New Item</h1>

      <form onSubmit={handleSubmit} className={styles.addForm}>
        <div className={styles.formGrid}>
          <div className="form-group fullWidth">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group fullWidth">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Dresses">Dresses</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type">Type (e.g., T-shirt, Jeans, Jacket)</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="size">Size (e.g., S, M, L, XL, 32, One Size)</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New with tags">New with tags</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="form-group fullWidth">
            <label htmlFor="tags">Tags (comma-separated, e.g., casual, summer, boho)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., vintage, casual, party"
            />
          </div>

          <div className="form-group fullWidth">
            <label htmlFor="images">Upload Images (max 5)</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
            {imagePreviews.length > 0 && (
              <div className={styles.imageUploadPreview}>
                {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index}`} className={styles.imagePreview} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className="button button-primary submitButton" disabled={loading}>
            {loading ? 'Submitting...' : 'List Item'}
          </button>
        </div>

        {loading && <p className={styles.loadingMessage}>Adding your item...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>Item listed successfully!</p>}
      </form>
    </div>
  );
}

export default AddNewItemPage;