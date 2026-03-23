import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminDashboard({ stats, latestBooks }) {
    const cards = [
        { label: 'Llibres', value: stats.books },
        { label: 'Categories', value: stats.categories },
        { label: 'Subcategories', value: stats.subcategories },
        { label: 'Estoc baix (< 5)', value: stats.lowStockBooks },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Panel admin</h2>}>
            <Head title="Panel admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {cards.map((card) => (
                            <article key={card.label} className="overflow-hidden bg-white p-5 shadow-sm sm:rounded-lg">
                                <p className="text-sm text-gray-600">{card.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-gray-900">{card.value}</p>
                            </article>
                        ))}
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Ultims llibres registrats</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Titol
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Autor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Categoria
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Estoc
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {latestBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{book.title}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{book.author}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{book.category?.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{book.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
