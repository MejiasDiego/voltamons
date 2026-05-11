import { Head } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

const cookies = [
    {
        type: 'Tècniques',
        purpose: 'Permeten la navegació, la sessió d\'usuari i el funcionament bàsic de la botiga.',
    },
    {
        type: 'Preferències',
        purpose: "Conserven opcions de l'usuari per millorar la navegació i oferir una experiència coherent.",
    },
    {
        type: 'Rendiment',
        purpose: 'Ajuden a detectar incidències de càrrega i a optimitzar la resposta de la web.',
    },
];

export default function CookiesPolicy() {
    return (
        <>
            <Head title="Política de cookies" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Privacitat i dades</p>
                    <h1 className="mt-2 text-3xl font-bold text-amber-950">Política de cookies</h1>
                    <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                        A Voltamons utilitzem cookies per assegurar el funcionament correcte del lloc i oferir una
                        experiència estable de navegació i compra.
                    </p>
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-3">
                    {cookies.map((cookie) => (
                        <article key={cookie.type} className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-amber-950">{cookie.type}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-stone-700">{cookie.purpose}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-6 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-amber-950">Gestió del consentiment</h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">
                        Pots configurar o bloquejar cookies des del navegador. Tingues en compte que desactivar determinades
                        cookies pot afectar funcionalitats com el manteniment de sessió o l'estabilitat de determinades
                        pàgines.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-700">
                        Per a dubtes addicionals, consulta la secció de contacte i t'atendrem amb la màxima transparència.
                    </p>
                </section>
            </StoreLayout>
        </>
    );
}
