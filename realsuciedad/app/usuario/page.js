'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../components/Layout";
import styles from '../usuario/page.module.css';

import Link from "next/link"
import Image from 'next/image';

export default function Usuario() {


  return(
      <Layout>
      <header className={styles.header}>
        <h1>Usuario</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header>
      <main>
        
      </main>

      </Layout>
  )



}
