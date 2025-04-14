'use client';

import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";

const MisPujas = () => {
  const id = localStorage.getItem('user_id')
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener todas las subastas
    fetch("http://127.0.0.1:8000/api/auctions/")
      .then(res => res.json())
      .then(async data => {
        const auctions = data.results || data;
        const pujasUsuario = [];

        await Promise.all(auctions.map(async (auction) => {
          const res = await fetch(`http://127.0.0.1:8000/api/auctions/${auction.id}/bids/`);
          const datos = await res.json();
          const bids = datos.results || datos;

          bids.forEach(bid => {
            if (bid.bidder_id == id) {
              pujasUsuario.push({
                ...bid,
                auctionName: auction.name,
              });
            }
          });
        }));

        setPujas(pujasUsuario);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener pujas:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <Layout>
      <h1>Mis Pujas</h1>
      {loading ? <p>Cargando...</p> : (
        pujas.length === 0 ? (
          <p>No has realizado ninguna puja.</p>
        ) : (
          <ul>
            {pujas.map((puja, index) => (
              <li key={index}>
                <strong>{puja.auctionName}</strong>: {puja.price} € (Puja ID: {puja.id})
              </li>
            ))}
          </ul>
        )
      )}
    </Layout>
  );
};

export default MisPujas;
