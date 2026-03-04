import styles from './Reviews.module.css';
import FadeIn from '@/components/FadeIn';

export default function Reviews() {
    const reviews = [
        {
            name: "Anna R.",
            text: "Väldigt god och känns fräsch. Ett av de bättre sushiställena på söder! Liten lokal, så passar bäst för takeaway.",
            rating: 4,
        },
        {
            name: "Mikael S.",
            text: "Alltid fräscht och supergott! Deras anka är riktigt bra. Har blivit vårt stammisställe när suget efter asiatiskt slår till.",
            rating: 5,
        },
        {
            name: "Sofia L.",
            text: "Otroligt bra sushi för priset. Rullarna är fantastiska och de snålar inte med bitarna. Rekommenderas starkt!",
            rating: 5,
        }
    ];

    return (
        <section className={styles.reviewsSection}>
            <div className={styles.container}>
                <FadeIn direction="up">
                    <h2 className={styles.heading}>Vad våra kunder säger</h2>
                </FadeIn>
                <div className={styles.grid}>
                    {reviews.map((review, i) => (
                        <FadeIn key={i} direction="up" delay={0.2 + i * 0.15} className={styles.card}>
                            <div className={styles.stars}>
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <span key={j} className={j < review.rating ? styles.activeStar : styles.star}>★</span>
                                ))}
                            </div>
                            <p className={styles.text}>"{review.text}"</p>
                            <div className={styles.author}>
                                <span className={styles.name}>{review.name}</span>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
