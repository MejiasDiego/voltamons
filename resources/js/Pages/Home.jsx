import { Head, Link } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function Home({ featuredBooks, categories }) {
    return (
        <>
            <Head title="Voltamons" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100 p-6 shadow-sm sm:p-10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Llibreria online</p>
                    <h1 className="mt-3 text-3xl font-bold text-amber-950 sm:text-4xl">La llibreria que t'obre el mon</h1>
                    <p className="mt-3 max-w-2xl text-stone-700">
                        Descobreix novetats, classics i recomanacions personalitzades per gaudir de la lectura a qualsevol lloc.
                    </p>
                    <div className="mt-6">
                        <Link
                            href={route('catalog.index')}
                            className="inline-flex rounded-md bg-amber-800 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-amber-900"
                        >
                            Explorar cataleg
                        </Link>
                    </div>
                </section>

                <section className="mt-10">
                    <div className="mb-4 flex items-end justify-between">
                        <h2 className="text-2xl font-bold text-amber-950">Categories destacades</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('catalog.index', { category: category.slug })}
                                className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                            >
                                <p className="text-lg font-semibold text-stone-900">{category.name}</p>
                                <p className="mt-1 text-sm text-stone-600">{category.books_count} llibres disponibles</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-10">
                    <div className="mb-4 flex items-end justify-between">
                        <h2 className="text-2xl font-bold text-amber-950">Novetats</h2>
                        <Link href={route('catalog.index')} className="text-sm font-semibold text-amber-800 hover:text-amber-900">
                            Veure tot
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredBooks.map((book) => (
                            <article key={book.id} className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase tracking-wide text-stone-500">{book.category?.name}</p>
                                <h3 className="mt-1 line-clamp-2 text-base font-semibold text-stone-900">{book.title}</h3>
                                <p className="mt-1 text-sm text-stone-600">{book.author}</p>
                                <p className="mt-3 text-lg font-bold text-amber-900">{book.price} EUR</p>
                                <p className="text-xs text-stone-500">Estoc: {book.stock}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </StoreLayout>
        </>
    );
}
