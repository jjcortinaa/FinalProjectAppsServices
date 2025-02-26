"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './detalle.module.css';

const watches = {
  daytona: { name: "Rolex Cosmograph Daytona", price: 35000, image: "/fotos/cosmograph.png" },
  cartier: { name: "Cartier Santos", price: 6500, image: "/fotos/cartier_santos.png" },
  cr7: { name: "Jacob & Co. FLIGHT OF CR7", price: 62800, image: "/fotos/cr7.png" },
  nautilus: { name: "Patek Philippe Nautilus", price: 150000, image: "/fotos/patek_nautilus.png" },
  apple: { name: "Apple Watch", price: 320, image: "/fotos/apple_watch.png" },
  richard: { name: "Richard Mille RM35-02 Rafael Nadal", price: 369000, image: "/fotos/richard.png" }
};

const DetalleSubasta = ({ params }) => {
  const { id } = use(params); // 
  const router = useRouter();
  const reloj = watches[id];

  const [precioActual, setPrecioActual] = useState(reloj?.price || 0);
  const [puja, setPuja] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar precio guardado en localStorage
  useEffect(() => {
    const storedPrice = localStorage.getItem(id);
    if (storedPrice) {
      setPrecioActual(parseInt(storedPrice));
    }
  }, [id]);

  const handlePuja = () => {
    const cantidad = parseInt(puja);

    if (!cantidad || cantidad <= 0) {
      setMensaje("Introduce una cantidad válida.");
      return;
    }

    if (cantidad <= precioActual) {
      setMensaje("La puja debe ser mayor al precio actual.");
    } else {
      setPrecioActual(cantidad);
      localStorage.setItem(id, cantidad);
      setMensaje(`Puja realizada por ${cantidad} euros. ¡Buena suerte!`);
    }
  };

  if (!reloj) {
    return <p>Reloj no encontrado.</p>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Detalle de la Subasta</h1>
        <div className={styles.detalleReloj}>
          <div className={styles.detalleIzquierda}>
            <h2>{reloj.name}</h2>
            <img src={reloj.image} alt={reloj.name} className={styles.imagenReloj} />
          </div>

          <div className={styles.detalleDerecha}>
            <p>Precio actual: <strong>{precioActual} euros</strong></p>
            <label htmlFor="puja">Ingrese su puja:</label>
            <input
              type="number"
              id="puja"
              min="1"
              step="1"
              value={puja}
              onChange={(e) => setPuja(e.target.value)}
              className={styles.inputNumber}  // Añadir clase para el input
            />
            <button onClick={handlePuja} className={styles.button}>Pujar</button>
            <p id="mensaje-puja" className={styles.mensajePuja}>{mensaje}</p>
          </div>
        </div>
        <button onClick={() => router.push("/subastas")} className={styles.button}>Volver a los artículos</button>
      </div>
    </Layout>
  );
};

export default DetalleSubasta;
