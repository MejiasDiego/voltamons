import { Head } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

const shippingPoints = [
    {
        title: 'Cobertura',
        text: 'Servei d\'enviament disponible a territori nacional en la fase actual del projecte.',
    },
    {
        title: 'Temps orientatius',
        text: 'La preparació i l\'enviament s\'estimem entre 24 i 72 hores laborables, en funció de l\'estoc i del volum de comandes.',
    },
    {
        title: 'Cost d\'enviament',
        text: "S'aplica una tarifa estàndard en comandes petites i enviament gratuït a partir del llindar indicat al checkout.",
    },
    {
        title: 'Seguiment',
        text: "L'usuari pot consultar el resum de compra i l'historial de comandes des del seu compte.",
    },
];

export default function ShippingPolicy() {
    return (
        <>
            <Head title="Condicions d'enviament" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Logística de la botiga</p>
                    <h1 className="mt-2 text-3xl font-bold text-amber-950">Condicions d'enviament</h1>
                    <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                        Aquesta pàgina resumeix com fem arribar els productes i quines condicions comercials s'apliquen en
                        el procés de compra de Voltamons.
                    </p>
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-2">
                    {shippingPoints.map((item) => (
                        <article key={item.title} className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">{item.title}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-stone-700">{item.text}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-6 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-amber-950">Incidències i suport</h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">
                        En cas d'incidència amb l'entrega, recomanem contactar-nos indicant número de comanda i una breu
                        descripció del cas. El nostre objectiu és oferir resposta ràpida i traçable.
                    </p>
                </section>
            </StoreLayout>
        </>
    );
}
