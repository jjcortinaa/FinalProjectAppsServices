"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './detalle.module.css';

const DetalleSubasta = ({ params }) => {
  const { id } = use(params); 
  const router = useRouter();
  const [reloj, setWatches] = useState([]);

  const [precioActual, setPrecioActual] = useState(0);
  const [puja, setPuja] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeClase, setMensajeClase] = useState(""); // Nuevo estado para la clase de mensaje
 
  useEffect(() => {
    const storedPrice = localStorage.getItem(id);
    if (storedPrice) {
      setPrecioActual(parseInt(storedPrice));
    }
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auctions/`)
      .then(res => res.json())
      .then(data => {
        const auction = data.results[id - 1];
        if (auction) {
          setWatches(auction || []);
          setPrecioActual(auction.price || 0); 
        }
      })
      .catch(err => console.error('Error al obtener subastas:', err));
  }, []);
  


  const handlePuja = () => {
    const cantidad = parseInt(puja);
  
    if (!cantidad || cantidad <= 0) {
      setMensaje("Introduce una cantidad válida.");
      setMensajeClase(styles.mensajeError);
      return;
    }
  
    if (cantidad <= precioActual) {
      setMensaje("La puja debe ser mayor al precio actual.");
      setMensajeClase(styles.mensajeError);
    } else {
      setPrecioActual(cantidad);
      localStorage.setItem(id, cantidad);
      setMensaje(`Puja realizada por ${cantidad} euros. ¡Buena suerte!`);
      setMensajeClase(styles.mensajeExito);
  
      // PUT al backend
      fetch(`http://127.0.0.1:8000/api/auctions/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: cantidad }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al actualizar el precio");
          return res.json();
        })
        .then(data => {
          console.log("Precio actualizado:", data);
  
          const nombreUsuario = localStorage.getItem("username") || "Anónimo";
  
          // POST al backend para registrar la puja
          return fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auction: id,
              price: cantidad,
              bidder: nombreUsuario,
            }),
          });
        })
        .then(res => {
          if (!res.ok) throw new Error("Error al registrar la puja");
          return res.json();
        })
        .then(data => console.log("Puja registrada:", data))
        .catch(err => {
          console.error("Error al hacer PUT o POST:", err);
          setMensaje("Error al registrar la puja en el servidor.");
          setMensajeClase(styles.mensajeError);
        });
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
            <img src={reloj.thumbnail} alt={reloj.name} className={styles.imagenReloj} />
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
              className={styles.inputNumber} 
            />
            <button onClick={handlePuja} className={styles.button}>Pujar</button>
            <p id="mensaje-puja" className={`${styles.mensajePuja} ${mensajeClase}`}>{mensaje}</p>
          </div>
        </div>
        <button onClick={() => router.push("/subastas")} className={styles.button}>Volver a los artículos</button>
        <button onClick={() => router.push(`/pujas/${id}`)} className={styles.button}>Ver Historial de Pujas</button>

      </div>
    </Layout>
  );
};

export default DetalleSubasta;
