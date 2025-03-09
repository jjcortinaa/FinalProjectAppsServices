'use client';

import Layout from '../components/Layout'; 
import styles from './SobreNosotros.module.css'; 

const SobreNosotros = () => {
  return (
    <Layout>
      <header className={styles.header}>
        <h1>Sobre Nosotros</h1>
        <a href="/">
          <img src="/fotos/logo.webp" alt="Logo de la página" className={styles.headerLogo} />
        </a>
      </header>

      <main className={styles.main}>
        <img src="/fotos/empresarios.png" alt="nosotros" className={styles.mainImg} />

        <section className={styles.section}>
          <h2>Nuestra Historia</h2>
          <p>
            Somos una empresa madrileña apasionada por la relojería de lujo y la innovación en el comercio digital. Nuestra plataforma de
            subastas nace con el objetivo de ofrecer a coleccionistas y entusiastas una manera segura y transparente de adquirir piezas
            exclusivas.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Fundadores</h2>
          <p>
            La empresa fue fundada por José Juan Cortina Galindo y Xabier Albizu Arias, dos emprendedores jóvenes pero con muchas ganas y
            conocimiento en el mundo del comercio electrónico y la relojería de alta gama. Con una visión clara de modernizar el sector,
            el objetivo es lograr posicionar nuestra plataforma como un referente en el mercado.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Nuestro Compromiso</h2>
          <p>
            Nos comprometemos a ofrecer un servicio confiable, con subastas verificadas y procesos seguros para garantizar la satisfacción de
            nuestros usuarios. Trabajamos con expertos para autenticar cada pieza y brindamos asesoramiento personalizado a nuestros
            clientes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contáctanos</h2>
          <p>
            Si tienes alguna pregunta o deseas más información, no dudes en contactarnos a través de nuestro correo electrónico:{' '}
            <a href="mailto:contacto@nuestrasubastas.com">contacto@nuestrasubastas.com</a>.
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default SobreNosotros;
