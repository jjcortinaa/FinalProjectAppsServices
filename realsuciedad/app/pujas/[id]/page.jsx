'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './pujas.module.css';

const DetalleSubasta = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
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
        <h1 className={styles.titulo}>Historial de Pujas</h1>

        {pujas.length > 0 ? (
          <ul className={styles.listaPujas}>
            {pujas.map((puja, index) => (
              <li key={index} className={styles.pujaItem}>
            <strong>{puja.bidder}</strong>&nbsp;&nbsp;pujó&nbsp;&nbsp;<strong>{puja.price} €</strong>&nbsp;&nbsp;el&nbsp;&nbsp;{new Date(puja.creation_date).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.mensajeInfo}>No hay pujas registradas para esta subasta.</p>
        )}

        <p id="mensaje-puja" className={`${styles.mensajePuja} ${mensajeClase}`}>{mensaje}</p>
        <button onClick={() => router.push(`/detalle/${id}`)} className={styles.button}>Volver a la puja</button>
      </div>
    </Layout>
  );
};

export default DetalleSubasta;
