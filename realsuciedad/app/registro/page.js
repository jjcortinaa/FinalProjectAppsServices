'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import styles from '../registro/page.module.css';
import Link from "next/link";

const RegistroPage = () => {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [locality, setLocality] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const communityProvinces = provinces[locality] || [];

  const validateForm = () => {
    if (!user || !email || !password || !confirmPassword || !firstName || !lastName || !birthdate || !locality || !municipality) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    if (password.length < 8 || password !== confirmPassword) {
      setError('Las contraseñas deben coincidir y tener al menos 8 caracteres');
      return false;
    }
    const birthDate = new Date(birthdate);
    if (new Date().getFullYear() - birthDate.getFullYear() < 18) {
      setError('Debes ser mayor de 18 años para registrarte.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://das-p2-backend.onrender.com/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          birth_date: birthdate,
          locality: locality,
          municipality: municipality,
        }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/inicio'), 2000);
      } else {
        setError('Hubo un problema al intentar registrar el usuario.');
      }
    } catch {
      setError('Error en la conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1>Crear Cuenta</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header>
      <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formContainer_}>
        <fieldset className={styles.fieldset_}>
          <label htmlFor="user" className={styles.label_}>Usuario:</label>
          <input id="user" type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} className={styles.input_} required />
          <label htmlFor="email" className={styles.label_}>Email:</label>
          <input id = "email" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input_} required />
          <label htmlFor="password" className={styles.label_}>Contraseña:</label>
          <input id="password" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input_} required />
          <label htmlFor="confirmPassword" className={styles.label_}>Confirmar Contraseña:</label>
          <input id="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={confirmPassword} className={styles.input_} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <label htmlFor="confirmPassword" className={styles.label_}>Nombre:</label>
          <input id="nombre"type="text" placeholder="Nombre" value={firstName} className={styles.input_} onChange={(e) => setFirstName(e.target.value)} required />
          <label htmlFor="apellido" className={styles.label_}>Apellido:</label>
          <input id="apellido" type="text" placeholder="Apellido" value={lastName} className={styles.input_} onChange={(e) => setLastName(e.target.value)} required />
          <label htmlFor="birthdate" className={styles.label_}>Nacimiento:</label>
          <input id="birthdate" type="date" value={birthdate} className={styles.input_} onChange={(e) => setBirthdate(e.target.value)} required />
          <label htmlFor="locality" className={styles.label_}>Comunidad Autónoma:</label>
          <select id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} required>
          <option value="">Selecciona tu comunidad autónoma</option>
                  <option value="Andalucia">Andalucía</option>
                  <option value="Catalunya">Cataluña</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Galicia">Galicia</option>
                  <option value="PaisVasco">País Vasco</option>
                  <option value="ComunidadValenciana">Comunidad Valenciana</option>
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
              <><label htmlFor="municipality" className={styles.label_}>Provincia:</label>
              <select id="municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)} required>
                  <option value="">Selecciona tu provincia</option>
                  {communityProvinces.map((provincia, index) => (
                    <option key={index} value={provincia}>{provincia}</option>
                  ))}
                </select></>
            )}
            {error && <p>{error}</p>}
            {success && <p>¡Registro exitoso! Redirigiendo...</p>}
            <br/><br/><button type="submit" className={styles.submitButton_} disabled={loading}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>
            <p className={styles.registerLink_}>
            Si tienes cuenta, <Link href="/inicio">inicia sesión aquí</Link>
            </p>
        </fieldset>
      </form>
      </main>
    </Layout>
  );
};

export default RegistroPage;
