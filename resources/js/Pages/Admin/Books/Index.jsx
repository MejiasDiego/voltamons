import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BooksIndex({ books }) {
    const { props } = usePage();
    const successMessage = props.flash?.success;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Gestió de productes</h2>}>
            <Head title="Productes" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl space-y-6 sm:px-6 lg:px-8">
                    {successMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMessage}</div>}

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="text-lg font-medium text-stone-900">Productes</h3>
                                <Link
                                    href={route('admin.books.create')}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
                                >
                                    Nou producte
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-amber-200">
                                <thead className="bg-amber-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Títol</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Categoria</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Subcategoria</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Preu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Estoc</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">Accions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-200 bg-white">
                                    {books.data.map((book) => (
                                        <tr key={book.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">{book.title}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{book.category?.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{book.subcategory?.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{Number(book.price).toFixed(2)} EUR</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{book.stock}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <Link
                                                    href={route('admin.books.edit', book.id)}
                                                    className="text-sm font-semibold text-amber-700 hover:text-amber-900"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!window.confirm('Segur que vols eliminar aquest producte?')) {
                                                            return;
                                                        }
                                                        router.delete(route('admin.books.destroy', book.id), { preserveScroll: true });
                                                    }}
                                                    className="ml-3 text-sm font-semibold text-rose-600 hover:text-rose-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-amber-200 px-6 py-4 text-sm text-stone-600">
                            <span>Mostrant {books.data.length} de {books.total} productes</span>
                            <div className="flex flex-wrap gap-2">
                                {books.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`rounded px-3 py-1 ${link.active ? 'bg-amber-700 text-white' : 'bg-amber-100 text-stone-700 hover:bg-amber-200'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
