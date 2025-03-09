'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from "../components/Layout"
import styles from '../inicio/page.module.css'

import Link from "next/link"
import Image from 'next/image';

const Inicio = () => {

    const imgRef = useRef(null);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
        } else {
            setError('');
            alert('Formulario enviado correctamente.');
        }
    };

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
                <h1>Inicio Sesión</h1>
                <a href="/">
                    <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
                </a>
            </header>
            <main>
                <form id="login_form" className={styles.formContainer_} onSubmit={handleSubmit}>
                    <fieldset className={styles.fieldset_}>
                        <legend className={styles.legend_}>Iniciar Sesión:</legend>
                        <label htmlFor="user" className={styles.label_}>Usuario:</label>
                        <input 
                            type="text" 
                            id="user" 
                            name="user" 
                            placeholder="xabier.albizu" 
                            required 
                            className={styles.input_}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <label htmlFor="password" className={styles.label_}>Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="********" 
                            required 
                            className={styles.input_}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className={styles.error_}>{error}</p>}
                        <input type="submit" value="Ingresar" className={styles.submitButton_} />
                    </fieldset>
                </form>
                <p className={styles.registerLink_}>
                    Si no tienes cuenta, <Link href="/registro">regístrate aquí</Link>
                </p>
            </main>
        </Layout>
    )
    
}
export default Inicio;