import { Head } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacitat" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Protecció de dades</p>
                    <h1 className="mt-2 text-3xl font-bold text-amber-950">Política de privacitat</h1>
                    <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                        Aquesta política explica quines dades es tracten al projecte Voltamons i amb quina finalitat.
                        El tractament es limita a la gestió funcional de la botiga i a la comunicació associada a les
                        compres realitzades.
                    </p>
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-2">
                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Dades que es poden recollir</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Dades identificatives i de contacte, adreces d'enviament i facturació, i informació bàsica de
                            comandes necessària per completar el procés de compra.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Finalitat del tractament</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Gestionar registres d'usuari, processar comandes, generar factures i oferir suport postvenda.
                            Les dades no es fan servir per finalitats alienes al servei.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Conservació i seguretat</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Les dades es conserven el temps necessari per complir les obligacions funcionals i legals del
                            servei. S'apliquen mesures de control d'accés i bones pràctiques de desenvolupament.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Drets de les persones usuàries</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Pots sol·licitar accés, rectificació o supressió de dades, així com la limitació del seu
                            tractament. Per exercir drets, utilitza el canal de contacte publicat al web.
                        </p>
                    </article>
                </section>
            </StoreLayout>
        </>
    );
}
