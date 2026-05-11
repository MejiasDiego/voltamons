import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CategoriesIndex({ categories }) {
    const { props } = usePage();
    const successMessage = props.flash?.success;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Gestió de categories</h2>}>
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl space-y-6 sm:px-6 lg:px-8">
                    {successMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMessage}</div>}

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="text-lg font-medium text-stone-900">Categories</h3>
                                <Link
                                    href={route('admin.categories.create')}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
                                >
                                    Nova categoria
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-amber-200">
                                <thead className="bg-amber-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Nom</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Slug</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Activa</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">Accions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-200 bg-white">
                                    {categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">{category.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{category.slug}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">
                                                {category.is_active ? 'Sí' : 'No'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <Link
                                                    href={route('admin.categories.edit', category.id)}
                                                    className="text-sm font-semibold text-amber-700 hover:text-amber-900"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-amber-200 px-6 py-4 text-sm text-stone-600">
                            <span>Mostrant {categories.data.length} de {categories.total} categories</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.links.map((link) => (
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
