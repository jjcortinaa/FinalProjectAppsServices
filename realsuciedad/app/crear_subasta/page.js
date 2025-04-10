'use client';

import { useState } from 'react';
import Layout from "../components/Layout";
import styles from '../crear_subasta/page.module.css'; // Asegúrate de tener los estilos

const CrearSubasta = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [endDate, setEndDate] = useState(''); // Fecha límite para el cierre
  const [creationDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de creación
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!title || !description || !price || !stock || !endDate) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://das-p2-backend.onrender.com/api/subastas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description, 
          price,
          discount_percentage: discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          creation_date: creationDate, // Fecha de creación
          end_date: endDate, // Fecha límite de cierre
        }),
      });

      if (response.ok) {
        // Redirige o muestra un mensaje de éxito
        alert('Subasta creada con éxito');
        // Aquí podrías redirigir a otra página
      } else {
        setError('Hubo un problema al crear la subasta');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1>Crear una Subasta</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formControl}>
              <label>Título:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                placeholder="Título de la subasta"
              />
            </div>

            <div className={styles.formControl}>
              <label>Descripción:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                placeholder="Descripción de la subasta"
              />
            </div>

            <div className={styles.formControl}>
              <label>Precio inicial:</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
                step="0.01"
                min="0"
                placeholder="Precio de la subasta"
              />
            </div>

            <div className={styles.formControl}>
              <label>Descuento (%):</label>
              <input 
                type="number" 
                value={discountPercentage} 
                onChange={(e) => setDiscountPercentage(e.target.value)} 
                step="0.01" 
                min="0"
                placeholder="Descuento en porcentaje"
              />
            </div>

            <div className={styles.formControl}>
              <label>Valoración:</label>
              <input 
                type="number" 
                value={rating} 
                onChange={(e) => setRating(e.target.value)} 
                step="0.1" 
                min="0" max="5" 
                placeholder="Valoración (0-5)"
              />
            </div>

            <div className={styles.formControl}>
              <label>Stock:</label>
              <input 
                type="number" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                required 
                placeholder="Stock disponible"
              />
            </div>

            <div className={styles.formControl}>
              <label>Marca:</label>
              <input 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
                placeholder="Marca del producto"
              />
            </div>

            <div className={styles.formControl}>
              <label>Categoría:</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="Categoría del producto"
              />
            </div>

            <div className={styles.formControl}>
              <label>Imagen (URL):</label>
              <input 
                type="url" 
                value={thumbnail} 
                onChange={(e) => setThumbnail(e.target.value)} 
                placeholder="URL de la imagen"
              />
            </div>

            {/* Fecha límite para el cierre */}
            <div className={styles.formControl}>
              <label>Fecha límite para el cierre:</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                required 
              />
            </div>

            {/* Error message */}
            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Cargando...' : 'Crear Subasta'}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default CrearSubasta;
