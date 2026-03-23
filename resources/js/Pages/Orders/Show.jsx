import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import { clearCart, formatPrice } from '@/lib/cart';

export default function OrdersShow({ order }) {
    useEffect(() => {
        const stored = window.sessionStorage.getItem('cleared-order-cart-id');

        if (stored !== String(order.id)) {
            clearCart();
            window.sessionStorage.setItem('cleared-order-cart-id', String(order.id));
        }
    }, []);

    return (
        <>
            <Head title={`Comanda ${order.order_number}`} />

            <StoreLayout>
                <section className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Compra confirmada</p>
                    <h1 className="mt-1 text-3xl font-bold text-amber-950">Comanda {order.order_number}</h1>
                    <p className="mt-2 text-stone-700">
                        Hem enviat la confirmacio a <strong>{order.email}</strong>.
                    </p>

                    <div className="mt-5 grid gap-6 md:grid-cols-2">
                        <div>
                            <h2 className="text-lg font-bold text-amber-950">Enviament</h2>
                            <p className="mt-2 text-sm text-stone-700">
                                {order.full_name}
                                <br />
                                {order.shipping_address}
                                <br />
                                {order.shipping_postal_code} {order.shipping_city}
                                <br />
                                {order.shipping_region}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-amber-950">Pagament</h2>
                            <p className="mt-2 text-sm text-stone-700">Targeta acabada en **** {order.payment_card_last4}</p>
                            <p className="text-sm text-stone-700">Estat: {order.status}</p>
                        </div>
                    </div>
                </section>

                <section className="mt-6 overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-amber-100">
                            <thead className="bg-amber-50">
                                <tr>
                                    <Th>Llibre</Th>
                                    <Th>Preu</Th>
                                    <Th>Qty</Th>
                                    <Th>Subtotal</Th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-amber-100">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <Td>{item.title_snapshot}</Td>
                                        <Td>{formatPrice(item.unit_price)}</Td>
                                        <Td>{item.quantity}</Td>
                                        <Td>{formatPrice(item.line_total)}</Td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-amber-100 px-6 py-4 text-sm text-stone-700">
                        <p className="flex justify-end gap-10"><span>Subtotal</span><strong>{formatPrice(order.subtotal)}</strong></p>
                        <p className="mt-1 flex justify-end gap-10"><span>IVA</span><strong>{formatPrice(order.tax_amount)}</strong></p>
                        <p className="mt-1 flex justify-end gap-10"><span>Enviament</span><strong>{formatPrice(order.shipping_amount)}</strong></p>
                        <p className="mt-2 flex justify-end gap-10 text-base"><span>Total</span><strong className="text-amber-900">{formatPrice(order.total_amount)}</strong></p>
                    </div>
                </section>

                <div className="mt-5 flex flex-wrap gap-3">
                    <a
                        href={route('orders.invoice', { order: order.id })}
                        className="rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900"
                    >
                        Descarregar factura PDF
                    </a>
                    <Link
                        href={route('orders.index')}
                        className="rounded-md border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
                    >
                        Veure historial
                    </Link>
                </div>
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
