'use client';

import Link from 'next/link';
import styles from './AuctionItem.module.css';

const AuctionItem = ({ title, thumbnail, description, id, lastCall }) => {

  return (
    <article className={styles.reloj}>
      <figure>
        <h2 className={styles.title}>{title} <br></br>ID:{id}</h2> 
        <Link href={`../detalle/${id}`}>
          <img src={thumbnail} alt={name} className={styles.img} />
        </Link>
      </figure>
      <p>{description}</p>
      <p>Aqui lastCall es {lastCall}</p>
    </article>
  );
};

export default AuctionItem;
