export default function OpinionStars({ value = 0, interactive = false, onSelect = null, size = 'text-xl' }) {
    const rating = Number(value || 0);

    return (
        <div className="inline-flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= rating;

                if (!interactive) {
                    return (
                        <span key={star} className={`${size} ${active ? 'text-amber-500' : 'text-stone-300'}`}>
                            ★
                        </span>
                    );
                }

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onSelect?.(star)}
                        className={`${size} leading-none ${active ? 'text-amber-500' : 'text-stone-300'} transition hover:text-amber-500`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
}
