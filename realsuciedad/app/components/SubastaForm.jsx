'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SubastaForm.module.css';

const SubastaForm = ({ id }) => {
  const router = useRouter();
  const [user,setUser] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener categorías
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/auctions/categories/')
      .then(res => res.json())
      .then(data => setCategories(data.results || []))
      .catch(err => console.error('Error al obtener categorías:', err));

    {/* TODO */}
    {/* Cambiar parsedUser.username por parsedUser.id (hacer antes el TODO de inicio) */}
    const storedUser = localStorage.getItem('accessToken');
    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.token;
      setUser(parsedUser.username);
    }
  }, []);
  

  // Si estamos editando, cargar datos
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/auctions/${id}/`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setRating(data.rating || '');
          setStock(data.stock);
          setBrand(data.brand);
          setCategory(data.category);
          setThumbnail(data.thumbnail);
          setEndDate(data.closing_date.split('T')[0]);
          setCreationDate(data.creation_date);
        })
        .catch(err => console.error('Error al cargar subasta para editar:', err));
    } else {
      setCreationDate(new Date().toISOString());
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !stock || !endDate || !category) {
      setError('Todos los campos obligatorios deben completarse.');
      return;
    }

    const payload = {
      title,
      description,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : null,
      stock: parseInt(stock),
      brand,
      category: parseInt(category),
      thumbnail,
      creation_date: creationDate,
      closing_date: new Date(endDate).toISOString(),
      isOpen: true,
      auctioneer: user,
    };

    const method = id ? 'PATCH' : 'POST';
    const url = id
      ? `http://127.0.0.1:8000/api/auctions/${id}/`
      : `http://127.0.0.1:8000/api/auctions/`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/subastas');
      } else {
        const errorData = await response.json();
        const messages = Object.entries(errorData)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
          .join(' | ');
        setError(messages || 'Hubo un error en el servidor.');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formControl}>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className={styles.formControl}>
          <label>Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className={styles.formControl}>
          <label>Precio inicial:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.1" />
        </div>

        <div className={styles.formControl}>
          <label>Valoración:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)}  step="0.1" />
        </div>

        <div className={styles.formControl}>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>

        <div className={styles.formControl}>
          <label>Marca:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div className={styles.formControl}>
          <label>Categoría:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formControl}>
          <label>Imagen (URL):</label>
          <input type="url" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        </div>

        <div className={styles.formControl}>
          <label>Fecha límite para el cierre:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear Subasta'}
        </button>
      </form>
    </div>
  );
};

export default SubastaForm;
