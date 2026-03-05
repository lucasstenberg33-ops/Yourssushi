import Image from 'next/image';
import { getAbout, getContact } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
import styles from './page.module.css';

export default function OmOss() {
  const about = getAbout() as { title: string; text: string };
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  return (
    <div className={styles.page}>
      <section className={styles.heroBlock}>
        <FadeIn direction="up" className={styles.heroTextWrap}>
          <span className={styles.label}>Om oss</span>
          <h1 className={styles.title}>{about.title || 'Om Oss'}</h1>
          <p className={styles.heroText}>{about.text}</p>
        </FadeIn>
      </section>

      <FadeIn direction="up" className={styles.content}>
        <div className={styles.map}>
          <span className={styles.label}>Hitta hit</span>
          <p className={styles.address}>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Öppna i Google Maps
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
