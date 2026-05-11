import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UsersEdit({ user, roles }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role_id: user.role_id || '',
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Editar usuari</h2>}>
            <Head title="Editar usuari" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 sm:px-6 lg:px-8">
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4 px-6 py-5">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-stone-700">Nom</label>
                                <input
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-stone-700">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-stone-700">Rol</label>
                                <select
                                    value={data.role_id}
                                    onChange={(event) => setData('role_id', event.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                >
                                    <option value="">Selecciona un rol</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.role_id && <p className="mt-1 text-xs text-rose-600">{errors.role_id}</p>}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {processing ? 'Guardant...' : 'Guardar canvis'}
                                </button>
                                <Link
                                    href={route('admin.users.index')}
                                    className="text-sm font-semibold text-stone-600 hover:text-amber-900"
                                >
                                    Tornar al llistat
                                </Link>
                            </div>
                        </form>
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-stone-900">Eliminar usuari</h3>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm text-stone-700">Aquesta acció no es pot desfer.</p>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    if (!window.confirm('Segur que vols eliminar aquest usuari?')) {
                                        return;
                                    }
                                    router.delete(route('admin.users.destroy', user.id));
                                }}
                            >
                                <button
                                    type="submit"
                                    className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                                >
                                    Eliminar usuari
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
