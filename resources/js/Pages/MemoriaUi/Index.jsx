import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';

const tabs = [
    { id: 'identitat', label: 'Identitat i marca' },
    { id: 'estils', label: "Guia d'estils" },
    { id: 'estructura', label: 'Estructura web' },
    { id: 'ecommerce', label: 'Fase ecommerce' },
];

const tabContent = {
    identitat: {
        title: 'Un projecte amb personalitat de llibreria',
        intro: "Voltamons neix com una llibreria online amb mirada editorial: proximitat, criteri i una experiència de compra clara.",
        points: [
            {
                title: 'Marca comercial i eslògan',
                text: "El nom Voltamons i l'eslògan " +
                    '"La llibreria que t\'obre el món" defineixen una proposta centrada en descobriment i cultura.',
            },
            {
                title: 'Mercat i projecció',
                text: "La base és el mercat nacional, amb escalat previst a nous idiomes i canals digitals quan el catàleg creixi.",
            },
            {
                title: 'Domini proposat',
                text: 'La proposta principal és `voltamons.cat`, amb alternatives previstes per garantir continuïtat de marca.',
            },
        ],
    },
    estils: {
        title: 'Coherència visual i llegibilitat',
        intro: "La direcció gràfica busca transmetre un ambient càlid de llibreria, amb jerarquia clara i lectura còmoda.",
        points: [
            {
                title: 'Paleta de colors aplicada',
                text: "S'ha treballat una gamma amb base ambre i tons pedra per reforçar la identitat editorial i mantenir contrastos segurs.",
            },
            {
                title: 'Tipografia funcional',
                text: 'La composició tipogràfica prioritza claredat en producte, formularis i contingut informatiu, evitant recursos decoratius que penalitzin UX.',
            },
            {
                title: 'Logo en evolució',
                text: 'El logotip es tracta com una línia viva de treball: la proposta actual fixa direcció i permet iterar sense trencar la marca.',
            },
        ],
    },
    estructura: {
        title: 'Arquitectura orientada a navegació real',
        intro: 'La web està plantejada com un recorregut simple: descoberta, comparació, compra i seguiment de comandes.',
        points: [
            {
                title: 'Plantilla principal reusable',
                text: 'Header, cos central i peu legal es mantenen consistents per facilitar orientació en qualsevol pantalla.',
            },
            {
                title: 'Responsive en ús quotidià',
                text: 'Les graelles de catàleg, targetes de producte, taules i formularis s\'adapten a mòbil, tauleta i escriptori.',
            },
            {
                title: 'Jerarquia de contingut',
                text: 'Cada vista separa accions primàries (comprar, filtrar, confirmar) de contingut de suport per reduir fricció.',
            },
        ],
    },
    ecommerce: {
        title: 'Integració dels blocs comercials demanats',
        intro: "La implementació prioritza un flux de botiga usable i auditable, connectant la part de catàleg amb compra i postvenda.",
        points: [
            {
                title: 'Navegació clau al menú',
                text: "La capçalera pública ofereix accés directe a Inici, Catàleg, Cistella, Compte i aquesta Memòria UI.",
            },
            {
                title: 'Peu legal transversal',
                text: "El peu incorpora avís legal, cookies, privacitat, condicions d'enviament i contacte a totes les pantalles públiques.",
            },
            {
                title: 'Contacte amb mapa integrat',
                text: "L'apartat Contacte inclou dades de la marca i un iframe de Google Maps per ubicar el punt de referència.",
            },
        ],
    },
};

const evidenceBlocks = [
    {
        title: 'Inici i presentació del negoci',
        copy: 'Hero de marca, categories destacades i novetats per explicar proposta de valor i orientar el primer clic.',
        href: 'home',
        cta: 'Veure inici',
    },
    {
        title: 'Marketplace / secció de producte',
        copy: 'Catàleg filtrable, fitxa completa i vista ràpida asíncrona per comparar llibres sense perdre context.',
        href: 'catalog.index',
        cta: 'Veure catàleg',
    },
    {
        title: 'Consultes, compra i confiança',
        copy: 'Checkout amb dades de contacte, enviament i facturació; després, historial i detall de comandes amb factura.',
        href: 'checkout.create',
        cta: 'Veure checkout',
        authRequired: true,
    },
    {
        title: 'FAQ i ajuda de navegació',
        copy: 'S\'incorpora una guia contextual amb dubtes habituals dins aquesta mateixa memòria per facilitar avaluació i autoexplicació.',
        href: 'memoria.index',
        cta: 'Obrir guia',
    },
    {
        title: 'On som i informació pública',
        copy: 'La pàgina Contacte centralitza canals i mapa; les seccions legals reforcen transparència i marc jurídic.',
        href: 'legal.contact',
        cta: 'Anar a contacte',
    },
];

const faqs = [
    {
        question: "Per què la memòria està dins la web i no en un PDF separat?",
        answer: 'Perquè el tutor pugui revisar cada criteri en context real, navegant per la interfície exacta on s\'aplica.',
    },
    {
        question: "Com s'ha buscat una experiència dinàmica?",
        answer: 'Amb pestanyes temàtiques, blocs expandibles i enllaços directes a pantalles funcionals del projecte.',
    },
    {
        question: 'Com es connecta aquesta memòria amb la fase comercial?',
        answer: "Relacionant cada decisió d'interfície amb un objectiu clar: conversió, confiança, usabilitat i mantenibilitat.",
    },
    {
        question: 'Quin paper tenen els apartats legals i contacte?',
        answer: "Donen cobertura als requisits d'avís jurídic i aporten confiança d'usuari abans i després de la compra.",
    },
];

export default function MemoriaUiIndex() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const currentTab = useMemo(() => tabContent[activeTab], [activeTab]);

    return (
        <>
            <Head title="Memòria UI" />

            <StoreLayout>
                <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 p-6 shadow-sm sm:p-8">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" aria-hidden />
                    <div className="relative max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Documentació integrada</p>
                        <h1 className="mt-3 text-3xl font-bold text-amber-950 sm:text-4xl">Memòria UI</h1>
                        <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
                            Aquesta secció recull de forma narrativa com s'han aplicat els criteris d'interfície del projecte.
                            L'objectiu és que la revisió sigui visual, navegable i connectada directament amb la web real.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href={route('home')}
                                className="rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900"
                            >
                                Anar a l'inici
                            </Link>
                            <Link
                                href={route('legal.contact')}
                                className="rounded-md border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                            >
                                Veure contacte
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeTab === tab.id
                                        ? 'bg-amber-800 text-white'
                                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                            <h2 className="text-2xl font-bold text-amber-950">{currentTab.title}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-base">{currentTab.intro}</p>

                            <div className="mt-5 space-y-3">
                                {currentTab.points.map((point) => (
                                    <article key={point.title} className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                                        <h3 className="text-sm font-semibold text-stone-900 sm:text-base">{point.title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-stone-700">{point.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-xl border border-amber-100 bg-gradient-to-b from-white to-amber-50 p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Punts que es poden revisar ara</p>
                            <ul className="mt-3 space-y-2 text-sm text-stone-700">
                                <li>• Navegació pública consistent amb header i footer globals.</li>
                                <li>• Catàleg com a eix de descoberta i comparació.</li>
                                <li>• Flux de compra amb dades de contacte i enviament.</li>
                                <li>• Historial de comandes i traçabilitat postcompra.</li>
                                <li>• Bloc legal complet per transparència informativa.</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="mb-4 flex items-end justify-between gap-3">
                        <h2 className="text-2xl font-bold text-amber-950">Recorregut d'evidències</h2>
                        <p className="text-sm text-stone-600">Entrades ràpides a les parts del web</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {evidenceBlocks.map((block) => (
                            <article key={block.title} className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                                <h3 className="text-base font-semibold text-stone-900">{block.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-stone-700">{block.copy}</p>
                                <Link
                                    href={route(block.href)}
                                    className="mt-4 inline-flex text-sm font-semibold text-amber-800 transition hover:text-amber-900"
                                >
                                    {block.cta}
                                </Link>
                                {block.authRequired && (
                                    <p className="mt-2 text-xs text-stone-500">Accés disponible per usuari autenticat.</p>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-2xl font-bold text-amber-950">Guia breu de lectura (FAQ)</h2>
                    <p className="mt-2 text-sm text-stone-700">Respostes ràpides per entendre el criteri de disseny i implementació.</p>

                    <div className="mt-4 space-y-3">
                        {faqs.map((item, index) => {
                            const isOpen = index === openFaqIndex;

                            return (
                                <article key={item.question} className="rounded-xl border border-amber-100 bg-amber-50/40">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                                    >
                                        <span className="text-sm font-semibold text-stone-900 sm:text-base">{item.question}</span>
                                        <span className="text-xl leading-none text-amber-800">{isOpen ? '-' : '+'}</span>
                                    </button>
                                    {isOpen && <p className="px-4 pb-4 text-sm leading-relaxed text-stone-700">{item.answer}</p>}
                                </article>
                            );
                        })}
                    </div>
                </section>
            </StoreLayout>
        </>
    );
}
