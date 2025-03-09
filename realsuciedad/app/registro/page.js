'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usado para redirigir después del registro

import Layout from "../components/Layout"
import styles from '../inicio/page.module.css'

import Link from "next/link"
import Image from 'next/image';

const RegistroPage = () => {
    const router = useRouter();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [community, setCommunity] = useState('');
    const [province, setProvince] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const provinces = {
        Andalucia: ['Sevilla', 'Málaga'],
        Catalunya: ['Barcelona', 'Girona'],
        Madrid: ['Madrid'],
        Galicia: ['A Coruña', 'Lugo'],
        PaisVasco: ['Bizkaia', 'Gipuzkoa'],
        ComunidadValenciana: ['Valencia', 'Alicante'],
        CastillaLeon: ['Valladolid', 'Burgos'],
        CastillaLaMancha: ['Toledo', 'Albacete'],
        Murcia: ['Murcia'],
        Aragon: ['Zaragoza', 'Huesca'],
        Extremadura: ['Badajoz', 'Cáceres'],
        Cantabria: ['Santander'],
        Navarra: ['Pamplona'],
        LaRioja: ['Logroño'],
        Baleares: ['Palma', 'Ibiza'],
        Canarias: ['Las Palmas de Gran Canaria', 'Santa Cruz de Tenerife'],
        Asturias: ['Oviedo'],
        Ceuta: ['Ceuta'],
        Melilla: ['Melilla'],
    };
    const communityProvinces = provinces[community] || [];


    const handleSubmit = (e) => {
            e.preventDefault();

            // Validación de la contraseña
            if (password.length < 8) {
                setError('La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            // Validación de las contraseñas coincidentes
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden.');
                return;
            }
            if (community === '') {
                setError('Por favor, selecciona tu comunidad autónoma.');
                return;
            }
            if (province === '') {
                setError('Por favor, selecciona tu provincia.');
                return;
            }
            if (address.trim() === '') {
                setError('La dirección es un campo obligatorio.');
                return;
            }

            // Validación de la edad (debe ser mayor de 18 años)
            const today = new Date();
            const birthDate = new Date(birthdate);
            const age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();

            if (age < 18 || (age === 18 && month < 0)) {
                setError('Debes ser mayor de 18 años para registrarte.');
                return;
            }

            // Si todo está correcto, limpiar los errores y mostrar mensaje de éxito
            setError('');
            setSuccess(true);

            // Aquí puedes agregar el código para enviar los datos al servidor

            // Redirigir a la página de inicio de sesión después de un registro exitoso
            setTimeout(() => {
                router.push('/inicio');
            }, 2000);
        };

    return (
        <Layout>
            <header className={styles.header}>
                <h1>Registro </h1>
                <a href="/">
                    <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
                </a>
            </header><br/><br/>
            <main>
                <form onSubmit={handleSubmit} className={styles.formContainer_}>
                    <fieldset className={styles.fieldset_}>
                        <legend className={styles.legend_}>Crea una cuenta:</legend>
                        <label htmlFor="user" className={styles.label_}>Usuario:</label>
                        <input 
                            type="text" 
                            id="user" 
                            name="user" 
                            placeholder="nombre.usuario" 
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
                        <label htmlFor="confirmPassword" className={styles.label_}>Confirmar Contraseña:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            placeholder="********" 
                            required 
                            className={styles.input_}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="birthdate" className={styles.label_}>Fecha de Nacimiento:</label>
                        <input 
                            type="date" 
                            id="birthdate" 
                            name="birthdate" 
                            required 
                            className={styles.input_}
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <label htmlFor="address" className={styles.label_}>Dirección:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            placeholder="Tu dirección completa" 
                            required 
                            className={styles.input_}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                                                <label htmlFor="community" className={styles.label_}>Comunidad Autónoma:</label>
                        <select 
                            id="community" 
                            name="community" 
                            required 
                            className={styles.input_}
                            value={community}
                            onChange={(e) => setCommunity(e.target.value)}
                        >
                            <option value="">Selecciona tu comunidad autónoma</option>
                            <option value="Andalucia">Andalucía</option>
                            <option value="Catalunya">Cataluña</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Galicia">Galicia</option>
                            <option value="PaisVasco">País Vasco</option>
                            <option value="Valencia">Comunidad Valenciana</option>
                            <option value="CastillaLeon">Castilla y León</option>
                            <option value="CastillaLaMancha">Castilla-La Mancha</option>
                            <option value="Murcia">Región de Murcia</option>
                            <option value="Aragon">Aragón</option>
                            <option value="Extremadura">Extremadura</option>
                            <option value="Cantabria">Cantabria</option>
                            <option value="Navarra">Navarra</option>
                            <option value="LaRioja">La Rioja</option>
                            <option value="Baleares">Islas Baleares</option>
                            <option value="Canarias">Canarias</option>
                            <option value="Asturias">Asturias</option>
                            <option value="Ceuta">Ceuta</option>
                            <option value="Melilla">Melilla</option>
                        </select>

                        {communityProvinces.length > 0 && (
                            <>
                                <label htmlFor="province" className={styles.label_}>Provincia:</label>
                                <select 
                                    id="province" 
                                    name="province" 
                                    required 
                                    className={styles.input_}
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                >
                                    <option value="">Selecciona tu provincia</option>
                                    {communityProvinces.map((provincia, index) => (
                                        <option key={index} value={provincia}>
                                            {provincia}
                                        </option>
                                    ))}
                                </select>
                            </>
                            )}
                        {error && <p className={styles.error_}>{error}</p>}
                        {success && <p className={styles.success_}>¡Registro exitoso! Redirigiendo...</p>}
                        <input type="submit" value="Registrarse" className={styles.submitButton_} />
                    </fieldset>
                </form><br /><br />
                <p className={styles.registerLink_}>
                    Si tienes cuenta, <Link href="/inicio">inicia sesión aquí</Link>
                </p><br />
            </main>
        </Layout>
    );
}

export default RegistroPage;
