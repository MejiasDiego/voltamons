import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import BookCover from '@/Components/BookCover';
import StoreLayout from '@/Layouts/StoreLayout';
import { clearCart, formatPrice, getCartItems, getCartTotal, removeFromCart, updateCartQuantity } from '@/lib/cart';

export default function CartIndex() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const sync = () => {
            setItems(getCartItems());
        };

        sync();
        window.addEventListener('cart:updated', sync);

        return () => {
            window.removeEventListener('cart:updated', sync);
        };
    }, []);

    const total = useMemo(() => getCartTotal(items), [items]);

    const handleChangeQuantity = (bookId, quantity) => {
        updateCartQuantity(bookId, quantity);
        setItems(getCartItems());
    };

    const handleRemove = (bookId) => {
        removeFromCart(bookId);
        setItems(getCartItems());
    };

    const handleClear = () => {
        clearCart();
        setItems(getCartItems());
    };

    return (
        <>
            <Head title="Cistella" />

            <StoreLayout>
                <div className="mb-5 flex items-end justify-between">
                    <h1 className="text-3xl font-bold text-amber-950">La teva cistella</h1>
                    <Link href={route('catalog.index')} className="text-sm font-semibold text-amber-800 hover:text-amber-900">
                        Continuar comprant
                    </Link>
                </div>

                {items.length === 0 ? (
                    <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-stone-700">No tens cap producte afegit encara.</p>
                        <Link
                            href={route('catalog.index')}
                            className="mt-4 inline-flex rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900"
                        >
                            Anar al cataleg
                        </Link>
                    </section>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                        <section className="space-y-4">
                            {items.map((item) => (
                                <article key={item.id} className="grid gap-4 rounded-xl border border-amber-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr]">
                                    <BookCover src={item.cover_url} title={item.title} className="h-40 w-full rounded-md bg-amber-100 object-cover" />

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-stone-500">{item.category}</p>
                                        <h2 className="text-lg font-semibold text-stone-900">{item.title}</h2>
                                        <p className="text-sm text-stone-600">{item.author}</p>

                                        <div className="mt-3 flex flex-wrap items-end gap-4">
                                            <p className="text-base font-semibold text-amber-900">{formatPrice(item.price)}</p>
                                            <p className="text-xs text-stone-500">Estoc max: {item.stock}</p>
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            <label htmlFor={`qty-${item.id}`} className="text-sm text-stone-600">
                                                Quantitat
                                            </label>
                                            <input
                                                id={`qty-${item.id}`}
                                                type="number"
                                                min="1"
                                                max={item.stock}
                                                value={item.quantity}
                                                onChange={(event) => handleChangeQuantity(item.id, event.target.value)}
                                                className="w-20 rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(item.id)}
                                                className="text-sm font-semibold text-rose-700 hover:text-rose-800"
                                            >
                                                Eliminar
                                            </button>
                                        </div>

                                        <p className="mt-3 text-sm font-medium text-stone-800">
                                            Subtotal: {formatPrice(Number(item.price) * Number(item.quantity))}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <aside className="h-fit rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-bold text-amber-950">Resum</h3>
                            <p className="mt-3 text-sm text-stone-600">Elements: {items.reduce((acc, item) => acc + Number(item.quantity), 0)}</p>
                            <p className="mt-1 text-sm text-stone-600">Total cistella</p>
                            <p className="text-2xl font-bold text-amber-900">{formatPrice(total)}</p>

                            <button
                                type="button"
                                onClick={() => (window.location.href = route('checkout.create'))}
                                className="mt-5 w-full rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900"
                            >
                                Continuar compra
                            </button>

                            <button
                                type="button"
                                onClick={handleClear}
                                className="mt-2 w-full rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                            >
                                Buidar cistella
                            </button>
                        </aside>
                    </div>
                )}
            </StoreLayout>
        </>
    );
}
