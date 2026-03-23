import { Head, Link, router } from '@inertiajs/react';
import BookCover from '@/Components/BookCover';
import StoreLayout from '@/Layouts/StoreLayout';

const initialForm = {
    category: '',
    subcategory: '',
    search: '',
};

export default function CatalogIndex({ books, categories, subcategories, filters }) {
    const form = { ...initialForm, ...filters };

    const applyFilters = (nextFilters) => {
        router.get(route('catalog.index'), nextFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const onChange = (key, value) => {
        const next = { ...form, [key]: value };
        applyFilters(next);
    };

    const activeSubcategories = subcategories.filter((subcategory) => {
        if (!form.category) {
            return true;
        }

        const category = categories.find((item) => item.id === subcategory.category_id);

        return category?.slug === form.category;
    });

    return (
        <>
            <Head title="Cataleg" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label htmlFor="search" className="mb-1 block text-sm font-medium text-stone-700">
                                Cerca
                            </label>
                            <input
                                id="search"
                                value={form.search}
                                onChange={(event) => onChange('search', event.target.value)}
                                className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                placeholder="Titol, autor o ISBN"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="mb-1 block text-sm font-medium text-stone-700">
                                Categoria
                            </label>
                            <select
                                id="category"
                                value={form.category}
                                onChange={(event) => onChange('category', event.target.value)}
                                className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                            >
                                <option value="">Totes</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subcategory" className="mb-1 block text-sm font-medium text-stone-700">
                                Subcategoria
                            </label>
                            <select
                                id="subcategory"
                                value={form.subcategory}
                                onChange={(event) => onChange('subcategory', event.target.value)}
                                className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                            >
                                <option value="">Totes</option>
                                {activeSubcategories.map((subcategory) => (
                                    <option key={subcategory.id} value={subcategory.slug}>
                                        {subcategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                <section className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-amber-950">Cataleg de llibres</h1>
                        <p className="text-sm text-stone-600">{books.total} resultats</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {books.data.map((book) => (
                            <article key={book.id} className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                                <BookCover
                                    src={book.cover_url}
                                    title={book.title}
                                    className="h-72 w-full bg-amber-100 object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-xs uppercase tracking-wide text-stone-500">{book.category?.name}</p>
                                    <h2 className="mt-1 line-clamp-2 text-base font-semibold text-stone-900">{book.title}</h2>
                                    <p className="mt-1 text-sm text-stone-600">{book.author}</p>
                                    <p className="mt-3 text-lg font-bold text-amber-900">{book.price} EUR</p>
                                    <p className="text-xs text-stone-500">Estoc: {book.stock}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {books.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url || '#'}
                                preserveScroll
                                className={`rounded px-3 py-2 text-sm ${
                                    link.active
                                        ? 'bg-amber-800 text-white'
                                        : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </section>
            </StoreLayout>
        </>
    );
}
