"use client";

import { useState, useEffect } from "react";

const RatingForm = ({ auctionId, userId }) => {
  const [rating, setRating] = useState(null);
  const [ratingId, setRatingId] = useState(null);
  const [average, setAverage] = useState(null);

  const token = localStorage.getItem("authorization");

  const fetchAuctionRatingAverage = async (auctionId) => {
    const token = localStorage.getItem("authorization");
  
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/auctions/ratings/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("No se pudo obtener ratings");
  
      const data = await res.json();
      const ratings = Array.isArray(data) ? data : data.results;
      console.log("resultado del get",data.results)
      const auctionRatings = ratings.filter(r => r.auction == auctionId);

      if (auctionRatings.length === 0){
        await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating:1.00 }),
        });
        return null;
      } 
      const total = auctionRatings.reduce((sum, r) => sum + parseFloat(r.value), 0);
      const average = total / auctionRatings.length;



      await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating:average.toFixed(2) }),
      });


      return average.toFixed(2);
    } catch (err) {
      console.error("Error al obtener media de ratings:", err);
      return null;
    }
  };

  const isPatch = async (auctionId, userId) => {
    const token = localStorage.getItem("authorization");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auctions/ratings/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al cargar ratings:", errorData);
        throw new Error("No se pudo cargar las valoraciones.");
      }
  
      const data = await response.json();
      const ratings = data.results || data;
  
      // Filtramos los ratings por auctionId y userId
      console.log("ratings recibidos:", ratings);
      console.log("comparando con auctionId:", auctionId, "userId:", userId);

      const ratingExists = ratings.some(
        (rating) => rating.auction == auctionId && rating.user == userId
      );
      return ratingExists;
    } catch (err) {
      console.log("Error al verificar la valoración:", err);
      return false; // En caso de error, devolvemos false
    }
  };

  const getRatingId = async (auctionId, userId) => {
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auctions/ratings/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener las valoraciones");
      }
  
      const data = await response.json();
      const rating = data.results.find(
        (rating) => rating.auction == auctionId && rating.user == userId
      );
  
      return rating ? rating.id : null;
    } catch (err) {
      console.error("Error al obtener el ID de la valoración:", err);
      return null;
    }
  };

  const handleRatingChange = async (value, auctionId, userId) => {
    const is_patch = await isPatch(auctionId, userId);
    console.log(is_patch)
    try {
      let response;
      if (!is_patch) {
        // Si no existe, hacemos un POST para crear la valoración
        response = await fetch("http://127.0.0.1:8000/api/auctions/ratings/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            value: value,
            auction: auctionId,
            user: userId,
          }),
        });
      } else {
        // Si existe, hacemos un PATCH para actualizar la valoración
        const ratingId = await getRatingId(auctionId, userId); // Función para obtener el ID de la valoración existente
        response = await fetch(`http://127.0.0.1:8000/api/auctions/ratings/${ratingId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            value: value,
          }),
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(is_patch ? "Error al crear rating:" : "Error al actualizar rating:", errorData);
        throw new Error(is_patch ? "No se pudo crear la valoración." : "No se pudo actualizar la valoración.");
      }
  
      const data = await response.json();
      console.log(!is_patch ? "Rating creado:" : "Rating actualizado:", data);
      setRatingId(value)
      
  
    } catch (err) {
      console.error("Error al manejar la valoración:", err);
    }
  };

  const handleDelete = async () => {
    const id = await getRatingId(auctionId, userId);
  
    if (id) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/auctions/ratings/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al eliminar la valoración:", errorData);
          throw new Error("No se pudo eliminar la valoración.");
        }
  
        console.log("Valoración eliminada con éxito");
        setRating(null); // quita el bold de los botones
        setRatingId(prev => prev === null ? "deleted" : null); // fuerza rerender
        const avg = await fetchAuctionRatingAverage(auctionId);
        setAverage(avg);
  
      } catch (err) {
        console.error("Error al intentar eliminar la valoración:", err);
      }
    } else {
      console.log("No se encontró la valoración.");
    }
  };
  

  useEffect(() => {
    const updateData = async () => {
      const exists = await isPatch(auctionId, userId);
      setRating(exists);
  
      const avg = await fetchAuctionRatingAverage(auctionId);
      setAverage(avg);
    };
  
    updateData();
  }, [ratingId, userId, auctionId]); 
  

  return (
    <div>
      <h3>Valoración media: {average ?? "Sin votos"}</h3>
      <div>
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            onClick={() => handleRatingChange(val, auctionId, userId)}
            style={{ fontWeight: val === rating ? 'bold' : 'normal' }}
          >
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
