import { Head } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function LegalNotice() {
    return (
        <>
            <Head title="Avís legal" />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Informació legal</p>
                    <h1 className="mt-2 text-3xl font-bold text-amber-950">Avís legal</h1>
                    <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                        Aquest lloc web forma part del projecte acadèmic Voltamons. El contingut, la marca i les peces
                        visuals s'utilitzen amb finalitat educativa i demostrativa dins del Projecte Transversal DAW2.
                    </p>
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-2">
                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Titularitat</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Responsable del lloc: Voltamons (projecte formatiu). Dades de contacte disponibles a la secció
                            de contacte. L'ús del web implica l'acceptació de les condicions d'aquest avís legal.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Propietat intel·lectual</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            El disseny, el codi i l'estructura de la interfície són desenvolupaments propis del projecte.
                            Els recursos de tercers mantenen la seva autoria i llicència original.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Responsabilitat d'ús</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Voltamons no es fa responsable d'un ús inadequat del lloc ni de decisions preses a partir de
                            contingut extern enllaçat. L'usuari és responsable de verificar la informació rellevant abans
                            de realitzar una compra.
                        </p>
                    </article>

                    <article className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-amber-950">Actualitzacions</h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">
                            Aquest avís legal es pot actualitzar per adaptar-se a canvis del projecte, del marc normatiu o
                            de les funcionalitats disponibles a la web.
                        </p>
                    </article>
                </section>
            </StoreLayout>
        </>
    );
}
