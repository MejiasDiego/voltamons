import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import BookCover from '@/Components/BookCover';
import AddToCartButton from '@/Components/AddToCartButton';
import StoreLayout from '@/Layouts/StoreLayout';
import { formatPrice } from '@/lib/cart';

const initialForm = {
    category: '',
    subcategory: '',
    search: '',
};

export default function CatalogIndex({ books, categories, subcategories, filters }) {
    const form = { ...initialForm, ...filters };
    const [preview, setPreview] = useState(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [searchInput, setSearchInput] = useState(filters.search || '');
    const searchDebounce = useRef(null);
    const lastSentSearch = useRef(filters.search || '');

    useEffect(() => {
        if (filters.search !== lastSentSearch.current) {
            setSearchInput(filters.search || '');
            lastSentSearch.current = filters.search || '';
        }
    }, [filters.search]);

    useEffect(() => {
        if (searchDebounce.current) {
            clearTimeout(searchDebounce.current);
        }

        searchDebounce.current = setTimeout(() => {
            if (searchInput !== (filters.search || '')) {
                lastSentSearch.current = searchInput;
                router.get(route('catalog.index'), { ...form, search: searchInput }, {
                    preserveState: true,
                    replace: true,
                });
            }
        }, 300);

        return () => {
            if (searchDebounce.current) {
                clearTimeout(searchDebounce.current);
            }
        };
    }, [searchInput]);

    const applyFilters = (nextFilters) => {
        router.get(route('catalog.index'), nextFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const onChange = (key, value) => {
        if (key === 'search') {
            setSearchInput(value);
        } else {
            if (searchDebounce.current) {
                clearTimeout(searchDebounce.current);
                searchDebounce.current = null;
            }
            applyFilters({ ...form, search: searchInput, [key]: value });
        }
    };

    const activeSubcategories = subcategories.filter((subcategory) => {
        if (!form.category) {
            return true;
        }

        const category = categories.find((item) => item.id === subcategory.category_id);

        return category?.slug === form.category;
    });

    const openPreview = async (slug) => {
        setIsLoadingPreview(true);

        try {
            const response = await axios.get(route('catalog.preview', { slug }));
            setPreview(response.data.book);
        } catch {
            setPreview(null);
        } finally {
            setIsLoadingPreview(false);
        }
    };

    const closePreview = () => {
        setPreview(null);
    };

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
                                value={searchInput}
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
                                    <p className="mt-3 text-lg font-bold text-amber-900">{formatPrice(book.price)}</p>
                                    <p className="text-xs text-stone-500">Estoc: {book.stock}</p>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openPreview(book.slug)}
                                            className="rounded-md border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                                        >
                                            Vista rapida
                                        </button>

                                        <AddToCartButton book={book} compact />
                                    </div>

                                    <Link
                                        href={route('catalog.show', { slug: book.slug })}
                                        className="mt-2 inline-block text-sm font-semibold text-amber-800 hover:text-amber-900"
                                    >
                                        Veure fitxa completa
                                    </Link>
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

                {(isLoadingPreview || preview) && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/60 p-4">
                        <div className="w-full max-w-3xl rounded-xl border border-amber-200 bg-white p-5 shadow-2xl">
                            {isLoadingPreview ? (
                                <div className="flex min-h-52 items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-800" />
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-[230px_1fr]">
                                    <BookCover
                                        src={preview.cover_url}
                                        title={preview.title}
                                        className="h-72 w-full rounded-lg bg-amber-100 object-cover"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-stone-500">{preview.category?.name}</p>
                                        <h3 className="mt-1 text-2xl font-bold text-amber-950">{preview.title}</h3>
                                        <p className="mt-1 text-sm text-stone-700">{preview.author}</p>
                                        <p className="mt-4 text-lg font-bold text-amber-900">{formatPrice(preview.price)}</p>
                                        <p className="text-sm text-stone-600">Estoc: {preview.stock}</p>
                                        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-stone-700">
                                            {preview.description || 'Sense descripcio ampliada disponible.'}
                                        </p>

                                        <div className="mt-5 grid grid-cols-2 gap-2">
                                            <AddToCartButton book={preview} compact />
                                            <Link
                                                href={route('catalog.show', { slug: preview.slug })}
                                                className="rounded-md border border-amber-300 px-3 py-2 text-center text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                                            >
                                                Fitxa completa
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    onClick={closePreview}
                                    className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                                >
                                    Tancar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </StoreLayout>
        </>
    );
}
