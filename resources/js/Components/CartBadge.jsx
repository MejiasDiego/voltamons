import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getCartItems } from '@/lib/cart';

function countItems(items) {
    return items.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export default function CartBadge() {
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const sync = () => {
            setTotalItems(countItems(getCartItems()));
        };

        sync();
        window.addEventListener('cart:updated', sync);

        return () => {
            window.removeEventListener('cart:updated', sync);
        };
    }, []);

    return (
        <Link
            href={route('cart.index')}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-amber-100 hover:text-amber-900"
        >
            <span>Cistella</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-amber-800 px-2 py-0.5 text-xs font-bold text-white">
                {totalItems}
            </span>
        </Link>
    );
}
