'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../components/Layout";
import styles from '../usuario/page.module.css';

import Link from "next/link"
import Image from 'next/image';

export default function Usuario() {
  const id = localStorage.getItem('user_id')
  const router = useRouter();

  return(
      <Layout>
      <header className={styles.header}>
        <h1>Usuario</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header>
      <main>
      {/* TODO */}
      {/* Botón log out y función fetch */}


      <button onClick={() => router.push(`/mis_subastas/${id}`)} className={styles.button}>Mis Subastas</button>

      {/* TODO */}
      {/* Botón mis pujas  que envíe a la carpeta mis_pujas/[id]*/}
      <button onClick={() => router.push(`/mis_pujas/${id}`)} className={styles.button}>Mis Pujas</button>

      {/* TODO */}
      {/* Botón info personal*/}

      {/* TODO */}
      {/* Cambiar contraseña*/}
      </main>

      </Layout>
  )



}
