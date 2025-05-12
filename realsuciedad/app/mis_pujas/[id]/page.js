'use client';

import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './misPujas.module.css';  // Asegúrate de tener este archivo CSS

const MisPujas = () => {
  
  const user = localStorage.getItem('user')
  const id = localStorage.getItem('user_id')
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auctionName, setAuctionName] = useState("")

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
            if (bid.bidder == user) {
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
      <h1 className={styles.pageTitle}>Mis Pujas</h1>
      {loading ? <p className={styles.loadingText}>Cargando...</p> : (
        pujas.length === 0 ? (
          <p className={styles.noBidsText}>No has realizado ninguna puja.</p>
        ) : (
          <ul className={styles.bidList}>
            {pujas.map((puja, index) => (
              <li key={index} className={styles.bidCard}>
                <h3 className={styles.auctionName}>{puja.auctionName}</h3>
                <p className={styles.bidDetails}>
                  <strong>Puja ID:</strong> {puja.id} <br />
                  <strong>Precio:</strong> {puja.price} € <br />
                  <strong>Auction ID:</strong> {puja.auction} 
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </Layout>
  );
};

export default MisPujas;
