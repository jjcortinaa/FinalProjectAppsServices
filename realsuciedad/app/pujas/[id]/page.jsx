"use client";

import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './pujas.module.css';

const DetalleSubasta = ({ params }) => {
  const { id } = use(params);
  const [pujas, setPujas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeClase, setMensajeClase] = useState("");

  useEffect(() => {
    // Fetch de todas las pujas asociadas al id de la subasta
    fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/`)
      .then(res => res.json())
      .then(data => {
        setPujas(data.results); // Establecer las pujas obtenidas
      })
      .catch(err => {
        console.error('Error al obtener las pujas:', err);
        setMensaje("Error al cargar las pujas.");
        setMensajeClase(styles.mensajeError);
      });
  }, [id]);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Historial de Pujas</h1>
        
        {pujas.length > 0 ? (
          <ul>
            {pujas.map((puja, index) => (
              <li key={index}>
                <strong>{puja.bidder}</strong> pujó <strong>{puja.price} euros</strong> el {new Date(puja.creation_date).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pujas registradas para esta subasta.</p>
        )}

        <p id="mensaje-puja" className={`${styles.mensajePuja} ${mensajeClase}`}>{mensaje}</p>
      </div>
    </Layout>
  );
};

export default DetalleSubasta;
