import { Head, Link } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import { formatPrice } from '@/lib/cart';

export default function OrdersIndex({ orders }) {
    return (
        <>
            <Head title="Historial comandes" />

            <StoreLayout>
                <h1 className="mb-5 text-3xl font-bold text-amber-950">Historial de comandes</h1>

                <section className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-amber-100">
                            <thead className="bg-amber-50">
                                <tr>
                                    <Th>Comanda</Th>
                                    <Th>Data</Th>
                                    <Th>Estat</Th>
                                    <Th>Total</Th>
                                    <Th>Accio</Th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-amber-100">
                                {orders.data.map((order) => (
                                    <tr key={order.id}>
                                        <Td>{order.order_number}</Td>
                                        <Td>{new Date(order.created_at).toLocaleString('ca-ES')}</Td>
                                        <Td>{order.status}</Td>
                                        <Td>{formatPrice(order.total_amount)}</Td>
                                        <Td>
                                            <Link
                                                href={route('orders.show', { order: order.id })}
                                                className="text-sm font-semibold text-amber-800 hover:text-amber-900"
                                            >
                                                Veure detall
                                            </Link>
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </StoreLayout>
        </>
    );
}

function Th({ children }) {
    return <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-600">{children}</th>;
}

function Td({ children }) {
    return <td className="px-4 py-3 text-sm text-stone-700">{children}</td>;
}
