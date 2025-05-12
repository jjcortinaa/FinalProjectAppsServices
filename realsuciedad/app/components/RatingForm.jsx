"use client";

import { useState, useEffect } from "react";

const RatingForm = ({ auctionId, userId }) => {
  const [rating, setRating] = useState(null);
  const [average, setAverage] = useState(null);
  const [ratingId, setRatingId] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auctions/ratings/auction/${auctionId}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de ratings");
        return res.json();
      })
      .then(data => {
        const ratings = data.results || data; // ← aquí puede venir el error si falta algo
  
        if (!Array.isArray(ratings)) {
          throw new Error("Respuesta inesperada: se esperaba una lista");
        }
  
        const myRating = ratings.find(r => parseInt(r.user) === parseInt(userId));
        setRating(myRating?.value || null);
  
        if (ratings.length > 0) {
          const total = ratings.reduce((sum, r) => sum + r.value, 0);
          const avg = total / ratings.length;
          setAverage(avg.toFixed(2));
        }
      })
      .catch(err => console.error("Error al cargar valoraciones:", err));
  }, [auctionId, userId]);
  

  const handleRatingChange = (value) => {
    const token = localStorage.getItem('authorization'); 
    fetch(`http://127.0.0.1:8000/api/auctions/ratings/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }, 
    body: JSON.stringify({ value: value, auction: auctionId })
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(errData => {
            console.error("Detalles del error al enviar valoración:", errData);
            throw new Error("Error al enviar valoración");
          });
        }
        return res.json();
      })
      
    .then(() => {
    setRating(value);
    location.reload();
    })
    .catch(err => console.error(err));
  };

  const handleDelete = () => {
    if (!ratingId) return;

    fetch(`http://127.0.0.1:8000/api/auctions/ratings/${ratingId}/delete/`, {
      method: "DELETE"
    })
      .then(() => {
        setRating(null);
        setRatingId(null);
        location.reload();
      })
      .catch(err => console.error("Error al eliminar valoración", err));
  };

  return (
    <div>
      <h3>Valoración media: {average ?? "Sin votos"}</h3>
      <div>
        {[1, 2, 3, 4, 5].map(val => (
          <button key={val} onClick={() => handleRatingChange(val)} style={{ fontWeight: val === rating ? 'bold' : 'normal' }}>
            {val} ⭐
          </button>
        ))}
        {rating && (
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Quitar valoración
          </button>
        )}
      </div>
    </div>
  );
};

export default RatingForm;
