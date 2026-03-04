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
        <FadeIn direction="left" delay={0.2} className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/Imagetoimage_enhancement_using_the_provided_refere_delpmaspu.png"
              alt="Yours Sushi Restaurang"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="overlap-secondary overlap-top-left overlap-portrait">
            <Image
              src="/Just_the_bowl_wood_table_kartong_bowl_2k_delpmaspu.png"
              alt="Sushi Bowl"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </div>
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
