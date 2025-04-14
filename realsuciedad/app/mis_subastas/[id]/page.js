"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import AuctionItem from '@/app/components/AuctionItem';

const MisSubastas = ({ params }) => {
const { id } = use(params); 

const [categories, setCategories] = useState([]);
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

  fetch("http://localhost:8000/api/auctions/categories/") // ajusta la URL si es necesario
    .then(res => res.json())
    .then(data => setCategories(data.results))
    .catch(err => console.error("Error al cargar categorías:", err));
}, []);

const filteredWatches = Array.isArray(watches) ? watches.filter(watch =>
  (priceFilter === "" || (watch.price <= Number(priceFilter) && Number(priceFilter) > 0)) &&
  (categoryFilter === "" || watch.category == categoryFilter)  && ( watch.auctioneer == id)
) : [];

return (
  <Layout>
    <h1>Mis Subastas</h1>
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
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
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

export default MisSubastas;