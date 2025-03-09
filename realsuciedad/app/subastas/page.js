// /app/subastas/page.js

'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import AuctionItem from '../components/AuctionItem';

const watches = [
  { name: "Rolex Cosmograph Daytona", image: "/fotos/cosmograph.png", description: "El Rolex Cosmograph Daytona es un reloj cronógrafo con escala taquimétrica, ideal para medir velocidad. Tiene un movimiento automático certificado como cronómetro y es conocido por su diseño robusto y elegante. Lanzado en 1963, es famoso por su vínculo con el automovilismo y con Paul Newman.", link: "../detalle/daytona", price: 35000, category: "Lujo" },
  { name: "Cartier Santos", image: "/fotos/cartier_santos.png", description: "El Cartier Santos es uno de los relojes más icónicos de la marca, lanzado en 1904. Es conocido por su caja cuadrada, sus tornillos visibles en el bisel y su diseño elegante.", link: "/detalle/cartier", price: 6500, category: "Lujo" },
  { name: "Jacob & Co. FLIGHT OF CR7", image: "/fotos/cr7.png", description: "El Jacob & Co. Flight of CR7 es un reloj exclusivo diseñado en honor a Cristiano Ronaldo. Su diseño es llamativo, con puja en negro y rojo, que reflejan la estética deportiva y elegante del futbolista.", link: "/detalle/cr7", price: 62800, category: "Exclusivo" },
  { name: "Patek Philippe Nautilus", image: "/fotos/patek_nautilus.png", description: "El Patek Philippe Nautilus es un reloj de lujo icónico, diseñado por Gerald Genta en 1976. Con bisel octagonal, es un símbolo de elegancia deportiva.", link: "/detalle/nautilus", price: 150000, category: "Lujo" },
  { name: "Apple Watch", image: "/fotos/apple_watch.png", description: "El Apple Watch es un reloj inteligente que combina tecnología y estilo. Ofrece funciones como seguimiento de actividad física, monitoreo de salud y compatibilidad con diversas apps.", link: "/detalle/apple", price: 320, category: "Tecnología" },
  { name: "Richard Mille RM35-02 Rafael Nadal", image: "/fotos/richard.png", description: "El Richard Mille RM35-02 Black Carbon NTPT Automatic Rafael Nadal es un reloj de alta gama diseñado en colaboración con el tenista Rafael Nadal. Destaca por su caja hecha de NTPT Carbon, un material ultraligero y resistente.", link: "/detalle/richard", price: 369000, category: "Exclusivo" }
];

const Subastas = () => {
  const [priceFilter, setPriceFilter] = useState("");   
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredWatches = watches.filter(watch =>
    (priceFilter === "" || (watch.price <= Number(priceFilter) && Number(priceFilter) > 0)) &&
    (categoryFilter === "" || watch.category === categoryFilter)
  );

  return (
    <Layout>
      <h1>Resultados de Búsqueda</h1>
      <label>
        Filtrar por precio:
        <input
          type="number"
          value={priceFilter}
          onChange={e => setPriceFilter(e.target.value)}
          placeholder="Precio máximo"
        />
      </label>
      <label>
        Filtrar por categoría:
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">Todas</option>
          <option value="Lujo">Lujo</option>
          <option value="Exclusivo">Exclusivo</option>
          <option value="Tecnología">Tecnología</option>
        </select>
      </label>
      <section id="relojes">
        {filteredWatches.map((watch, index) => (
          <AuctionItem key={index} {...watch} />
        ))}
      </section>
    </Layout>
  );
};

export default Subastas;
