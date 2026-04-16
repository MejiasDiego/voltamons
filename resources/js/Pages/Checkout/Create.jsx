import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import { formatPrice, getCartItems, getCartTotal } from '@/lib/cart';

export default function CheckoutCreate({ authUser }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCartItems());
    }, []);

    const subtotal = useMemo(() => getCartTotal(items), [items]);
    const taxAmount = useMemo(() => subtotal * 0.21, [subtotal]);
    const shippingAmount = useMemo(() => (subtotal >= 60 ? 0 : 3.95), [subtotal]);
    const totalAmount = useMemo(() => subtotal + taxAmount + shippingAmount, [subtotal, taxAmount, shippingAmount]);

    const { data, setData, post, processing, errors } = useForm({
        full_name: authUser?.name || '',
        email: authUser?.email || '',
        phone: authUser?.phone || '',

        shipping_address: authUser?.shipping_address || '',
        shipping_city: authUser?.shipping_city || '',
        shipping_region: authUser?.shipping_region || '',
        shipping_postal_code: authUser?.shipping_postal_code || '',

        billing_same_as_shipping: true,
        billing_full_name: authUser?.name || '',
        billing_address: authUser?.billing_address || authUser?.shipping_address || '',
        billing_city: authUser?.billing_city || authUser?.shipping_city || '',
        billing_region: authUser?.billing_region || authUser?.shipping_region || '',
        billing_postal_code: authUser?.billing_postal_code || authUser?.shipping_postal_code || '',

        card_number: '',
        card_expiry: '',
        card_cvv: '',

        items: [],
    });

    useEffect(() => {
        setData(
            'items',
            items.map((item) => ({
                id: item.id,
                quantity: Number(item.quantity),
            })),
        );
    }, [items, setData]);

    useEffect(() => {
        if (!data.billing_same_as_shipping) {
            return;
        }

        setData('billing_full_name', data.full_name);
        setData('billing_address', data.shipping_address);
        setData('billing_city', data.shipping_city);
        setData('billing_region', data.shipping_region);
        setData('billing_postal_code', data.shipping_postal_code);
    }, [
        data.billing_same_as_shipping,
        data.full_name,
        data.shipping_address,
        data.shipping_city,
        data.shipping_region,
        data.shipping_postal_code,
        setData,
    ]);

    const submit = (event) => {
        event.preventDefault();
        post(route('checkout.store'));
    };

    if (items.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <StoreLayout>
                    <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-bold text-amber-950">No hi ha productes a la cistella</h1>
                        <p className="mt-2 text-stone-700">Abans de pagar, afegeix algun llibre.</p>
                        <Link
                            href={route('catalog.index')}
                            className="mt-4 inline-flex rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900"
                        >
                            Tornar al cataleg
                        </Link>
                    </section>
                </StoreLayout>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout" />

            <StoreLayout>
                <h1 className="mb-5 text-3xl font-bold text-amber-950">Finalitzar compra</h1>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
                    <div className="space-y-6">
                        <section className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">Dades de contacte</h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <InputField label="Nom complet" value={data.full_name} onChange={(v) => setData('full_name', v)} error={errors.full_name} />
                                <InputField label="Email" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} />
                                <InputField label="Telefon" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} />
                            </div>
                        </section>

                        <section className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">Enviament</h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <InputField label="Adreca" value={data.shipping_address} onChange={(v) => setData('shipping_address', v)} error={errors.shipping_address} />
                                <InputField label="Ciutat" value={data.shipping_city} onChange={(v) => setData('shipping_city', v)} error={errors.shipping_city} />
                                <InputField label="Provincia" value={data.shipping_region} onChange={(v) => setData('shipping_region', v)} error={errors.shipping_region} />
                                <InputField label="Codi postal" value={data.shipping_postal_code} onChange={(v) => setData('shipping_postal_code', v)} error={errors.shipping_postal_code} />
                            </div>
                        </section>

                        <section className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">Facturacio</h2>
                            <label className="mt-3 inline-flex items-center gap-2 text-sm text-stone-700">
                                <input
                                    type="checkbox"
                                    checked={data.billing_same_as_shipping}
                                    onChange={(event) => setData('billing_same_as_shipping', event.target.checked)}
                                    className="rounded border-stone-300 text-amber-700 focus:ring-amber-500"
                                />
                                Mateixa adreca que enviament
                            </label>

                            {!data.billing_same_as_shipping && (
                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <InputField label="Nom facturacio" value={data.billing_full_name} onChange={(v) => setData('billing_full_name', v)} error={errors.billing_full_name} />
                                    <InputField label="Adreca facturacio" value={data.billing_address} onChange={(v) => setData('billing_address', v)} error={errors.billing_address} />
                                    <InputField label="Ciutat facturacio" value={data.billing_city} onChange={(v) => setData('billing_city', v)} error={errors.billing_city} />
                                    <InputField label="Provincia facturacio" value={data.billing_region} onChange={(v) => setData('billing_region', v)} error={errors.billing_region} />
                                    <InputField label="CP facturacio" value={data.billing_postal_code} onChange={(v) => setData('billing_postal_code', v)} error={errors.billing_postal_code} />
                                </div>
                            )}
                        </section>

                        <section className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">Pagament (fictici)</h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                <InputField label="Numero targeta" value={data.card_number} onChange={(v) => setData('card_number', v.replace(/\s+/g, ''))} error={errors.card_number} />
                                <InputField label="Caducitat (MM/YY)" value={data.card_expiry} onChange={(v) => setData('card_expiry', v)} error={errors.card_expiry} />
                                <InputField label="CVV" value={data.card_cvv} onChange={(v) => setData('card_cvv', v)} error={errors.card_cvv} />
                            </div>
                        </section>
                    </div>

                    <aside className="h-fit rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-amber-950">Resum compra</h3>
                        <ul className="mt-3 space-y-2">
                            {items.map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3 text-sm text-stone-700">
                                    <span>
                                        {item.title} x {item.quantity}
                                    </span>
                                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 border-t border-amber-100 pt-4 text-sm text-stone-700">
                            <p className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
                            <p className="mt-1 flex justify-between"><span>IVA 21%</span><span>{formatPrice(taxAmount)}</span></p>
                            <p className="mt-1 flex justify-between"><span>Enviament</span><span>{formatPrice(shippingAmount)}</span></p>
                            <p className="mt-3 flex justify-between text-lg font-bold text-amber-900"><span>Total</span><span>{formatPrice(totalAmount)}</span></p>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-5 w-full rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-60"
                        >
                            {processing ? 'Processant...' : 'Confirmar compra'}
                        </button>
                    </aside>
                </form>
            </StoreLayout>
        </>
    );
}

function InputField({ label, value, onChange, error, type = 'text' }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
            />
            {error && <p className="mt-1 text-xs font-medium text-rose-700">{error}</p>}
        </div>
    );
}
