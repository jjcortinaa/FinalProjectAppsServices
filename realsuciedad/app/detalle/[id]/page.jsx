"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "@/app/components/Layout";
import styles from './detalle.module.css';
import RatingForm from "@/app/components/RatingForm";
import CommentForm from "@/app/components/CommentForm";


const DetalleSubasta = ({ params }) => {

  const [yaPujado, setYaPujado] = useState(false);
  const { id } = use(params); 
  const router = useRouter();
  const [reloj, setWatches] = useState([]);
  const [user, setUser] = useState(false);
  const [userID, setUserId] = useState(false);
  const [bidId, setBidId] = useState(0);
  const [isOwner, setOwner] = useState(false);

  const [precioActual, setPrecioActual] = useState(0);
  const [puja, setPuja] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeClase, setMensajeClase] = useState(""); // Nuevo estado para la clase de mensaje
 
useEffect(() => {
  const storedPrice = localStorage.getItem(id);

  if (storedPrice) {
    setPrecioActual(parseInt(storedPrice));
  }
  const storedId =  localStorage.getItem('user_id')
  const storedUser = localStorage.getItem('accessToken');
  if (storedUser && storedUser !== 'undefined') {
    const parsedUser = JSON.parse(storedUser);
    const token = parsedUser.token;
    setUser(parsedUser.username);
    setUserId(storedId)

    // Obtener el ID de la puja del usuario para esta subasta
    fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/`)
      .then(res => res.json())
      .then(data => {
        const bids = data.results || data; // por si no tiene paginación
        const bid = bids.find(b => b.bidder === parsedUser.username);
        if (bid) {
          setBidId(bid.id);
          setYaPujado(true); // si quieres marcarlo como ya pujador
        }
      })
      .catch(err => console.error("Error al obtener bid del usuario:", err));
  } else {
    console.warn("Token no encontrado");
  }
  fetch(`http://127.0.0.1:8000/api/auctions/${id}/`)
  .then(res => res.json())
  .then(data => {
    // Si la API devuelve los datos directamente sin `results`, usa `data` directamente
    const auction = data;  // No es necesario acceder a data.results

    if (auction) {
      setWatches(auction || []);
      setPrecioActual(auction.price || 0);
      if (parseInt(auction.auctioneer) === parseInt(storedId)){
        setOwner(true);
      }
    }
  })
  .catch(error => {
    console.error("Error fetching auction:", error);
  });
}, [id, precioActual]);


  useEffect(() => {

  }, []);
  
  const deletePuja = () => {
    fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/${bidId}`, {
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          setYaPujado(!yaPujado)
          setMensaje(`Puja eliminada correctamente!`);
          console.log("Puja eliminada correctamente");
        } else {
          console.error("Error al eliminar la puja");
        }
      })
      .catch(err => console.error("Error en la petición:", err));
      
  }

  const modifyPuja = () => {
    const cantidad = parseInt(puja);
    if (!cantidad || cantidad <= 0) {
      setMensaje("Introduce una cantidad válida.");
      setMensajeClase(styles.mensajeError);
      return;
    }
    else if (cantidad <= precioActual) {
      setMensaje("La puja debe ser mayor al precio actual.");
      setMensajeClase(styles.mensajeError);
    }
    else {
      fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/${bidId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: Number(cantidad) }),
      })
        .then(res => {
          if (!res.ok){
            throw new Error("Error al actualizar el precio")
          }else{
            setMensaje(`Puja modificada correctamente a ${cantidad}!`)
            setPrecioActual(cantidad);
          } ;
          return res.json();
        })
        .then(data => {
          console.log("Precio actualizado:", data);
          
        })
        .catch(err => {
          console.error("Error al registrar la puja en el servidor:", err);
          setMensaje("Error al registrar la puja en el servidor.");
          setMensajeClase(styles.mensajeError);
        })
    }
    
  }


  const handlePuja = () => {
    const cantidad = parseInt(puja);

  
    if (!cantidad || cantidad <= 0) {
      setMensaje("Introduce una cantidad válida.");
      setMensajeClase(styles.mensajeError);
      return;
    }
  
    else if (cantidad <= precioActual) {
      setMensaje("La puja debe ser mayor al precio actual.");
      setMensajeClase(styles.mensajeError);
    }
    else if (user === false ){
      setMensaje("Solo disponible para usuarios registrados.");
      setMensajeClase(styles.mensajeError);
    } else {
      setMensajeClase(styles.mensajeExito);
      setMensaje(`Puja realizada por ${cantidad} euros. ¡Buena suerte!`);
  
      // POST al backend para registrar la puja
      fetch(`http://127.0.0.1:8000/api/auctions/${id}/bids/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          auction: id,
          price: cantidad,
          bidder: user,
          bidder_id: userID
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al registrar la puja");
          return res.json();
        })
        .then(data => {
          console.log("Puja registrada:", data);
          setBidId(data.id); // Aquí obtienes el ID de la puja
          setPrecioActual(data.auction_price)
          setYaPujado(true);

        })
        .catch(err => {
          console.error("Error al registrar la puja en el servidor:", err);
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
          {userID && (
             <RatingForm auctionId={id} userId={userID} />
          )}
          <div className={styles.detalleDerecha}>
            <p>Precio actual: <strong>{precioActual} euros</strong></p>
            

            {!yaPujado? (
              <>
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
              </>
            ) : 
            (
              <>
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
              <button onClick={modifyPuja} className={styles.button}>Modificar Puja</button>
              <button onClick={deletePuja} className={styles.button}>Eliminar Puja</button>

              </>
            )}
            <CommentForm auctionId={id} userId={userID || null} />

          </div>
        </div>
        <button onClick={() => router.push("/subastas")} className={styles.button}>Volver a los artículos</button>
        <button onClick={() => router.push(`/pujas/${id}`)} className={styles.button}>Ver Historial de Pujas</button>
        {isOwner? (
          <>
          <button onClick={() => router.push(`/editar_subasta/${id}`)} className={styles.button}>Modificar subasta</button>
          </>

        ) : (
          <>
          </>
        )}

      </div>
      
    </Layout>
  );
};

export default DetalleSubasta;
