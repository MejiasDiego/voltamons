import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OrdersIndex({ orders, statuses }) {
    const { props } = usePage();
    const successMessage = props.flash?.success;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Gestió de comandes</h2>}>
            <Head title="Gestió de comandes" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl space-y-6 sm:px-6 lg:px-8">
                    {successMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMessage}</div>}

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-stone-900">Comandes</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-amber-200">
                                <thead className="bg-amber-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">Estat</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">Accions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-200 bg-white">
                                    {orders.data.map((order) => (
                                        <OrderRow key={order.id} order={order} statuses={statuses} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-amber-200 px-6 py-4 text-sm text-stone-600">
                            <span>Mostrant {orders.data.length} de {orders.total} comandes</span>
                            <div className="flex flex-wrap gap-2">
                                {orders.links.map((link) => (
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

function OrderRow({ order, statuses }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status || 'pendent',
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.orders.update', order.id), { preserveScroll: true });
    };

    return (
        <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">{order.order_number}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{order.user?.name || 'Client'}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{order.email}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{Number(order.total_amount).toFixed(2)} EUR</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">
                <form onSubmit={submit} className="flex items-center gap-2">
                    <select
                        value={data.status}
                        onChange={(event) => setData('status', event.target.value)}
                        className="rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-amber-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                    >
                        Guardar
                    </button>
                </form>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                <button
                    type="button"
                    onClick={() => {
                        if (!window.confirm('Segur que vols eliminar aquesta comanda?')) {
                            return;
                        }
                        router.delete(route('admin.orders.destroy', order.id), { preserveScroll: true });
                    }}
                    className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
