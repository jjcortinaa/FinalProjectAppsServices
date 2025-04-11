'use client';

import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import styles from '../crear_subasta/page.module.css';
import { useRouter } from 'next/navigation';

const CrearSubasta = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creationDate] = useState(new Date().toISOString());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/auctions/categories/');
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          setCategories(data.results);
        } else {
          console.error('La respuesta no contiene categorías:', data);
        }
      } catch (err) {
        console.error('Error al obtener categorías', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !stock || !endDate || !category) {
      setError('Todos los campos obligatorios deben completarse.');
      return;
    }

    const endDateWithTime = new Date(endDate).toISOString();

    const postData = {
      title,
      description,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : null,
      stock: parseInt(stock),
      brand,
      category: parseInt(category),
      thumbnail,
      creation_date: creationDate,
      closing_date: endDateWithTime,
      isOpen: true,
    };

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auctions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push('/subastas');
      } else {
        const errorData = await response.json();
        if (typeof errorData === 'object') {
          const messages = Object.entries(errorData)
            .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
            .join(' | ');
          setError(messages || 'Hubo un error en el servidor.');
        } else {
          setError('Error desconocido del servidor.');
        }
      }
    } catch (err) {
      console.error('Error al conectar:', err);
      setError('Error de conexión con el servidor.');
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
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
              >
                <option value="">Selecciona una categoría</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option value="">Cargando categorías...</option>
                )}
              </select>
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

            <div className={styles.formControl}>
              <label>Fecha límite para el cierre:</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                required 
              />
            </div>

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
