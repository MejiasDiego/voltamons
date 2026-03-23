const placeholderCover = '/images/placeholders/book-cover.svg';

export default function BookCover({ src, title, className = '' }) {
    const resolvedSrc = src || placeholderCover;

    return (
        <img
            src={resolvedSrc}
            alt={`Portada de ${title}`}
            loading="lazy"
            className={className}
            onError={(event) => {
                if (event.currentTarget.src.includes(placeholderCover)) {
                    return;
                }

                event.currentTarget.src = placeholderCover;
            }}
        />
    );
}
