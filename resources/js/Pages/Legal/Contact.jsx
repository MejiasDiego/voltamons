import { Head } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

const contactItems = [
    { label: 'Nom comercial', value: 'Voltamons' },
    { label: 'Correu', value: 'contacte@voltamons.cat' },
    { label: 'Telèfon', value: '+34 600 123 456' },
    { label: 'Horari', value: 'Dilluns a divendres, 9:00 - 18:00' },
    { label: 'Adreça de referència', value: 'Passeig de Gràcia, 1, Barcelona' },
];

export default function Contact() {
    return (
        <>
            <Head title="Contacte" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Atenció i ubicació</p>
                    <h1 className="mt-2 text-3xl font-bold text-amber-950">Contacte</h1>
                    <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                        Aquest espai centralitza les dades de contacte de Voltamons i la ubicació de referència per a
                        consultes, reclamacions o seguiment de comandes.
                    </p>
                </section>

                <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Dades de contacte</h2>
                        <dl className="mt-4 space-y-3">
                            {contactItems.map((item) => (
                                <div key={item.label} className="rounded-lg border border-amber-100 bg-amber-50/40 p-3">
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-amber-700">{item.label}</dt>
                                    <dd className="mt-1 text-sm text-stone-700">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </article>

                    <article className="overflow-hidden rounded-xl border border-amber-200 bg-white p-4 shadow-sm sm:p-5">
                        <h2 className="text-lg font-bold text-amber-950">On som</h2>
                        <p className="mt-2 text-sm text-stone-700">
                            Punt de referència integrat amb Google Maps per facilitar la ubicació.
                        </p>

                        <div className="mt-4 overflow-hidden rounded-lg border border-amber-100">
                            <iframe
                                title="Ubicació Voltamons"
                                src="https://www.google.com/maps?q=Passeig%20de%20Gracia%201%20Barcelona&output=embed"
                                className="h-80 w-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </article>
                </section>
            </StoreLayout>
        </>
    );
}
