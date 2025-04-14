'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import styles from './CambiarContrasena.module.css';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const username = localStorage.getItem('user');
      const password = localStorage.getItem('password');

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

        const changePasswordResponse = await fetch('http://127.0.0.1:8000/api/users/change-password/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            old_password: currentPassword,
            new_password: newPassword,
          }),
        });

        const changePasswordData = await changePasswordResponse.json();
        localStorage.setItem('password', newPassword)

        if (changePasswordResponse.ok) {
          alert('Contraseña cambiada correctamente.');
          router.push('/usuario');
        } else {
          if (currentPassword !== password){
            setError('Mala contraseña actual')
          }
          else {
            setError('Error al cambiar la contraseña');
          }

        }
      } else {

        setError('Error al autenticar el usuario');
      }
    } catch (error) {
      setError('Hubo un problema al cambiar la contraseña');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1>Cambiar Contraseña</h1>
      </header>

      <main className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="currentPassword" className={styles.label}>
            Contraseña Actual:
            <input
              type="password"
              id="currentPassword"
              className={styles.input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>

          <label htmlFor="newPassword" className={styles.label}>
            Nueva Contraseña:
            <input
              type="password"
              id="newPassword"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </main>
    </Layout>
  );
}
