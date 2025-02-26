import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/cuenta">Tu Cuenta</Link></li>
          <li><Link href="/sobre_nosotros">Sobre Nosotros</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>
        <p>Creada por <b>José Juan Cortina y Xabier Albizu</b> <i>- 2025</i></p>
      </footer>
    </div>
  );
};

export default Layout;