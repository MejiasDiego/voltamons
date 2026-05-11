import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UsersIndex({ users }) {
    const { props } = usePage();
    const successMessage = props.flash?.success;
    const errorMessage = props.flash?.error;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Gestió d'usuaris</h2>}>
            <Head title="Gestió d'usuaris" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl space-y-6 sm:px-6 lg:px-8">
                    {successMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMessage}</div>}
                    {errorMessage && <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{errorMessage}</div>}

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-stone-900">Usuaris registrats</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-amber-200">
                                <thead className="bg-amber-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Nom</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Rol</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">Accions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-200 bg-white">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">{user.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{user.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{user.role?.name || 'Sense rol'}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
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
                            <span>Mostrant {users.data.length} de {users.total} usuaris</span>
                            <div className="flex flex-wrap gap-2">
                                {users.links.map((link) => (
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
