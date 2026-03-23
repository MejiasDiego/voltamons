import { useState } from 'react';
import { addToCart } from '@/lib/cart';

export default function AddToCartButton({ book, compact = false }) {
    const [feedback, setFeedback] = useState('');

    const outOfStock = Number(book.stock) <= 0;

    const handleAdd = () => {
        if (outOfStock) {
            return;
        }

        addToCart(book, 1);
        setFeedback('Afegit');

        window.setTimeout(() => {
            setFeedback('');
        }, 1300);
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                    outOfStock
                        ? 'cursor-not-allowed bg-stone-200 text-stone-500'
                        : 'bg-amber-800 text-white hover:bg-amber-900'
                } ${compact ? 'w-full' : ''}`}
            >
                {outOfStock ? 'Sense estoc' : 'Afegir a cistella'}
            </button>
            {feedback && <p className="mt-1 text-xs font-medium text-emerald-700">{feedback}</p>}
        </div>
    );
}
