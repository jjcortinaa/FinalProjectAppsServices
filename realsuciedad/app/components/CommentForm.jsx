"use client";

import { useState, useEffect } from "react";
import styles from './CommentForm.module.css';

const CommentForm = ({ auctionId, userId }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const [token, setToken] = useState(null);

  console.log("auctionId recibido en CommentForm:", auctionId);
  useEffect(() => {
    const localToken = localStorage.getItem("authorization");
    setToken(localToken);
    console.log("Ejecutando useEffect para cargar comentarios...");
  
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/`, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log("Comentarios recibidos:", data);
        const commentList = Array.isArray(data) ? data : data.results || [];
        setComments(commentList);
      })
      .catch(err => console.error("Error al obtener comentarios:", err));
  }, [auctionId, token]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];

    const commentData = {
      title,
      text,
      creation_date: today,
      modification_date: today,
      user: userId,
      auction: auctionId
    };

    fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al enviar comentario");
        return res.json();
      })
      .then(data => {
        setComments(prev => [...prev, data]);
        setMensaje("Comentario enviado con éxito");
        setTitle("");
        setText("");
      })
      .catch(err => {
        console.error(err);
        setMensaje("Error al enviar comentario");
      });
  };

  const handleDelete = (commentId) => {
    fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al eliminar comentario");
        setComments(prev => prev.filter(c => c.id != commentId));
      })
      .catch(err => console.error("Error eliminando comentario:", err));
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedTitle(comment.title);
    setEditedText(comment.text);
  };

  const handleSaveEdit = () => {
    const today = new Date().toISOString().split('T')[0];

    fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/${editingCommentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editedTitle,
        text: editedText,
        modification_date: today
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al editar comentario");
        return res.json();
      })
      .then(updated => {
        setComments(prev => prev.map(c => c.id ==editingCommentId ? { ...c, ...updated } : c));
        setEditingCommentId(null);
      }) 
      .catch(err => console.error("Error editando comentario:", err));
  };

  return (
    <div className={styles.commentContainer}>
      <h3>Comentarios</h3>
  
      {userId ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formField}>
            <textarea
              placeholder="Escribe tu comentario..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Enviar Comentario</button>
          <p className={styles.message}>{mensaje}</p>
        </form>
      ) : (
        <p className={styles.message}>Inicia sesión para dejar un comentario.</p>
      )}
  
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              {editingCommentId === comment.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Guardar</button>
                  <button onClick={() => setEditingCommentId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>{comment.title}</strong>
                  <p>{comment.text}</p>
                  {userId && comment.user == userId && (
                    <div className={styles.commentActions}>
                      <button onClick={() => handleEdit(comment)}>Editar</button>
                      <button onClick={() => handleDelete(comment.id)}>Eliminar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
};

export default CommentForm;
