'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuctionItem from '../components/AuctionItem';

const Subastas = () => {
  const [watches, setWatches] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");   
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auctions/`)
      .then(res => res.json())
      .then(data => setWatches(data.results || []))
      .catch(err => console.error('Error al obtener categorías:', err));
      setLoading(false);
  }, []);

  const filteredWatches = Array.isArray(watches) ? watches.filter(watch =>
    (priceFilter === "" || (watch.price <= Number(priceFilter) && Number(priceFilter) > 0)) &&
    (categoryFilter === "" || watch.category === categoryFilter)
  ) : [];

  return (
    <Layout>
      <h1>Resultados de Búsqueda</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <label>
            Filtrar por precio:
            <input
              type="number"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              placeholder="Precio máximo"
            />
          </label>
          <label>
            Filtrar por categoría:
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option value="">Todas</option>
              <option value="Lujo">Lujo</option>
              <option value="Exclusivo">Exclusivo</option>
              <option value="Tecnología">Tecnología</option>
            </select>
          </label>
          <section id="relojes">
            {filteredWatches.map((watch, index) => (
              <AuctionItem key={index} {...watch} />
            ))}
          </section>
        </>
      )}
    </Layout>
  );
};

export default Subastas;
