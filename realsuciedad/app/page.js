'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../app/components/Layout"
import styles from "../app/inicio/page.module.css"

import Link from "next/link"
import Image from 'next/image';
export default function Home() {

  const imgRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    if (imgRef.current) {
      const styles = window.getComputedStyle(imgRef.current);
      setSize({
        width: parseInt(styles.width, 10),
        height: parseInt(styles.height, 10),
      });
    }
  }, []);

  return(
      <Layout>
      <header className={styles.header}>
        <h1>Inicio</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header>
          <main className={styles.main}>
              <button type='button' onClick={() => router.push('/subastas')} className={styles.customButton}>
                  IR A SUBASTAS
              </button>
          </main>
      </Layout>
  )



}
