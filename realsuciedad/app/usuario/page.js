'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../components/Layout";
import styles from '../usuario/page.module.css';

import Link from "next/link"
import Image from 'next/image';

export default function Usuario() {
  const router = useRouter();
  const id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const username = localStorage.getItem('user');
      const password = localStorage.getItem('password');

      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const accessToken = data.access;

          const userResponse = await fetch('http://127.0.0.1:8000/api/users/profile/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          const profileData = await userResponse.json();

          if (userResponse.ok) {
            setUserInfo(profileData);
            console.log('Información del usuario:', profileData);
          } else {
            console.error('Error al obtener la información del usuario:', profileData);
          }

        } else {
          console.error('Error al obtener el token:', data);
        }

      } catch (error) {
        console.error('Error en la autenticación:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Layout>
      <header className={styles.header}>
        <div className={styles.headerTitleContainer}>
          <h1>Usuario</h1>
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </div>
        <a href="/"></a>
      </header>
      <main className={styles.main}>
        {userInfo && (
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Información Personal</h2>
            <p><strong>Nombre:</strong> {userInfo.first_name}</p>
            <p><strong>Apellido:</strong> {userInfo.last_name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Fecha Nacimiento:</strong> {userInfo.birth_date}</p>
            <p><strong>Municipio:</strong> {userInfo.municipality}</p>
            <p><strong>Localidad:</strong> {userInfo.locality}</p>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button onClick={() => router.push(`/mis_subastas/${id}`)} className={styles.button}>Mis Subastas</button>
          <button onClick={() => router.push(`/mis_pujas/${id}`)} className={styles.button}>Mis Pujas</button>
          <button onClick={() => router.push(`/cambiar_contrasena`)} className={styles.button}>Cambiar Contraseña</button>
        </div>
      </main>
    </Layout>
  );
}
