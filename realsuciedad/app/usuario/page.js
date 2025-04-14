'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import styles from '../usuario/page.module.css';
import Link from "next/link";
import Image from 'next/image';

export default function Usuario() {
  const router = useRouter();
  
  const [userId, setUserId] = useState(null);
  const [subastas, setSubastas] = useState([]);
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener ID del usuario del localStorage
    const storedUser = localStorage.getItem('accessToken');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.user_id); // Suponiendo que 'user_id' está almacenado en el token
      } catch (err) {
        console.warn("Error al procesar el token.");
      }
    } else {
      console.warn("Token no encontrado.");
    }
  }, []);

  useEffect(() => {
    // Si no tenemos el ID del usuario, no hacemos la solicitud
    if (!userId) return;

    // Realizamos fetch para obtener las subastas y pujas del usuario
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener subastas del usuario
        const subastasResponse = await fetch(`http://127.0.0.1:8000/api/auctions/?auctioneer=${userId}`);
        const subastasData = await subastasResponse.json();
        setSubastas(subastasData.results || []);
        
        // Obtener pujas del usuario
        const pujasResponse = await fetch(`http://127.0.0.1:8000/api/bids/?user=${userId}`);
        const pujasData = await pujasResponse.json();
        setPujas(pujasData.results || []);
        
      } catch (err) {
        setError('Hubo un error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Usuario</h1>
        <a href="/">
          <Image
            src="/fotos/logo.webp"
            alt="Logo de la página"
            className={styles.headerLogo}
            width={50}
            height={50}
          />
        </a>
      </header>

      <main className={styles.main}>

        <section className={styles.section}>
          <h2>Mis Subastas</h2>
          {subastas.length > 0 ? (
            <ul className={styles.buttonList}>
              {subastas.map(subasta => (
                <li key={subasta.id} className={styles.buttonItem}>
                  <Link href={`/subasta/${subasta.id}`}>
                    {subasta.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes subastas activas.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2>Mis Pujas</h2>
          {pujas.length > 0 ? (
            <ul className={styles.buttonList}>
              {pujas.map(puja => (
                <li key={puja.id} className={styles.buttonItem}>
                  <Link href={`/puja/${puja.id}`}>
                    {puja.amount} en la subasta de {puja.auction.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No has realizado pujas aún.</p>
          )}
        </section>
      </main>
    </Layout>
  );
}
