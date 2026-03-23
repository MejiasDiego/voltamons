import { Head, Link } from '@inertiajs/react';
import BookCover from '@/Components/BookCover';
import AddToCartButton from '@/Components/AddToCartButton';
import StoreLayout from '@/Layouts/StoreLayout';
import { formatPrice } from '@/lib/cart';

export default function CatalogShow({ book, relatedBooks }) {
    return (
        <>
            <Head title={book.title} />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                        <BookCover src={book.cover_url} title={book.title} className="h-[420px] w-full rounded-lg bg-amber-100 object-cover" />

                        <div>
                            <p className="text-xs uppercase tracking-wide text-stone-500">{book.category?.name}</p>
                            <h1 className="mt-2 text-3xl font-bold text-amber-950">{book.title}</h1>
                            <p className="mt-2 text-base text-stone-700">{book.author}</p>
                            <p className="mt-1 text-sm text-stone-500">ISBN: {book.isbn}</p>

                            <div className="mt-5 flex items-end gap-4">
                                <p className="text-2xl font-bold text-amber-900">{formatPrice(book.price)}</p>
                                <p className="text-sm text-stone-600">Estoc: {book.stock}</p>
                            </div>

                            <p className="mt-5 leading-relaxed text-stone-700">
                                {book.description || 'Aquest llibre encara no te descripcio detallada.'}
                            </p>

                            <div className="mt-6 max-w-xs">
                                <AddToCartButton book={book} compact />
                            </div>

                            <div className="mt-6">
                                <Link href={route('catalog.index')} className="text-sm font-semibold text-amber-800 hover:text-amber-900">
                                    Tornar al cataleg
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedBooks.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-xl font-bold text-amber-950">Relacionats</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedBooks.map((item) => (
                                <Link key={item.id} href={route('catalog.show', { slug: item.slug })} className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                                    <BookCover src={item.cover_url} title={item.title} className="h-56 w-full bg-amber-100 object-cover" />
                                    <div className="p-3">
                                        <p className="line-clamp-2 text-sm font-semibold text-stone-900">{item.title}</p>
                                        <p className="mt-1 text-xs text-stone-600">{item.author}</p>
                                        <p className="mt-2 text-sm font-bold text-amber-900">{formatPrice(item.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </StoreLayout>
        </>
    );
}
