'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuctionItem from '../components/AuctionItem';

const Subastas = () => {
  const [categories, setCategories] = useState([]);
  const [watches, setWatches] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");   
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");  // Nuevo estado para el filtro de estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingMin, setRatingMin] = useState(0);
  const states = { "abierto": true, "cerrado": false};  // Diccionario de estados
  const lastCall = {"true": true, "false":false};
  const [stateCall, setStateCall] = useState("");



  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auctions/`)
      .then(res => res.json())
      .then(data => setWatches(data.results || []))
      .catch(err => console.error('Error al obtener categorías:', err));
      setLoading(false);

    fetch("http://localhost:8000/api/auctions/categories/") // ajusta la URL si es necesario
      .then(res => res.json())
      .then(data => setCategories(data.results))
      .catch(err => console.error("Error al cargar categorías:", err));

  }, []);

  const filteredWatches = Array.isArray(watches) ? watches.filter(watch => {
    console.log("Valor de watch.is_open:", watch.isOpen);  // Para depurar
    return (
      (priceFilter === "" || (watch.price <= Number(priceFilter) && Number(priceFilter) > 0)) &&
      (categoryFilter === "" || watch.category == categoryFilter) && 
      ratingMin < Number(watch.rating) &&
      (stateFilter === "" || watch.isOpen === states[stateFilter]) && (watch.lastCall === lastCall[stateCall])
    );
  }) : [];

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
            Filtrar por rating minimo:
            <input
              type="number"
              value={ratingMin}
              onChange={e => setRatingMin(e.target.value)}
              placeholder="Rating minimo"
            />
          </label>
          <label>
            Filtrar por categoría:
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option value="">Todas</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
            </select>
          </label>
          <label>
            Filtrar por estado:
            <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option value="">Todos</option>
              <option value="abierto">Abierto</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </label>
          <label>
            Filtrar por last call:
            <select value={stateCall} onChange={e => setStateCall(e.target.value)}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <section id="relojes" >
            {filteredWatches.map((watch, index) => (
              watch.lastCall ?
              (
              <AuctionItem key={index} {...watch } />
              )
              : (<AuctionItem key={index} {...watch }  />)

            ))}
          </section>
        </>
      )}
    </Layout>
  );
};

export default Subastas;
