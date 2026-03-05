export const runtime = 'edge';

import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FadeIn from '@/components/FadeIn';
import styles from './page.module.css';

export default function OmdomenFaqPage() {
    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <FadeIn direction="down">
                    <span className={styles.label}>Kundupplevelsen</span>
                    <h1 className={styles.title}>Omdömen & Vanliga Frågor</h1>
                </FadeIn>
                <FadeIn direction="up" delay={0.2}>
                    <p className={styles.description}>
                        Läs vad våra gäster tycker om sin upplevelse hos oss, och hitta svar
                        på vanliga funderingar kring vår meny, takeaway och restaurang.
                    </p>
                    <div className={styles.divider} />
                </FadeIn>
            </header>

            <main className={styles.mainContent}>
                <Reviews />
                <FAQ />
            </main>
        </div>
    );
}
