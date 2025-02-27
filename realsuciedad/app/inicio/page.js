'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../components/Layout"
import styles from '../inicio/page.module.css'

import Link from "next/link"
import Image from 'next/image';

const Inicio = () => {

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
               <Link href={"/"} passHref>
                    <Image src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} width={size.width} height={size.height}></Image>
                </Link>
            </header>

            <main>
                <button type='button' onClick={() => router.push('/subastas')}>
                    IR A SUBASTAS
                </button>
            </main>
        </Layout>
    )



}
export default Inicio;