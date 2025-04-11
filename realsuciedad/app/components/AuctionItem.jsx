'use client';

import Link from 'next/link';
import styles from './AuctionItem.module.css';

const AuctionItem = ({ name, thumbnail, description, id }) => {
  return (
    <article className={styles.reloj}>
      <figure>
        <h2 className={styles.title}>{name}</h2> 
        <Link href={`../detalle/${id}`}>
          <img src={thumbnail} alt={name} className={styles.img} />
        </Link>
      </figure>
      <p>{description}</p>
    </article>
  );
};

export default AuctionItem;
