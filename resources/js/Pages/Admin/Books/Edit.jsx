import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookForm from './Form';

export default function BooksEdit({ book, categories, subcategories }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        description: book.description || '',
        price: book.price || '',
        stock: book.stock || '',
        cover_image: book.cover_image || '',
        category_id: book.category_id || '',
        subcategory_id: book.subcategory_id || '',
        is_active: Boolean(book.is_active),
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.books.update', book.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Editar producte</h2>}>
            <Head title="Editar producte" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5 px-6 py-5">
                            <BookForm data={data} setData={setData} categories={categories} subcategories={subcategories} errors={errors} />

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {processing ? 'Guardant...' : 'Guardar canvis'}
                                </button>
                                <Link
                                    href={route('admin.books.index')}
                                    className="text-sm font-semibold text-stone-600 hover:text-amber-900"
                                >
                                    Tornar al llistat
                                </Link>
                            </div>
                        </form>
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-stone-900">Eliminar producte</h3>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm text-stone-700">Aquesta acció és permanent.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!window.confirm('Segur que vols eliminar aquest producte?')) {
                                        return;
                                    }
                                    router.delete(route('admin.books.destroy', book.id));
                                }}
                                className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Eliminar producte
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
