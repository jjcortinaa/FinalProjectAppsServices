'use client';

import Link from 'next/link';
import styles from './AuctionItem.module.css';

const AuctionItem = ({ name, image, description, link }) => {
  return (
    <article className={styles.reloj}>
      <figure>
        <h2 className={styles.title}>{name}</h2> 
        <Link href={link}>
          <img src={image} alt={name} className={styles.img} />
        </Link>
      </figure>
      <p>{description}</p>
    </article>
  );
};

export default AuctionItem;
