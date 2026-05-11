import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';

const tabs = [
    { id: 'projecte', label: 'El projecte' },
    { id: 'identitat', label: 'Identitat i marca' },
    { id: 'estils', label: "Guia d'estils" },
    { id: 'arquitectura', label: 'Arquitectura web' },
    { id: 'accessibilitat', label: 'Accessibilitat' },
    { id: 'formularis', label: 'Formularis' },
    { id: 'rendiment', label: 'Rendiment' },
    { id: 'interaccio', label: 'Interacció' },
    { id: 'ecommerce', label: 'Fase ecommerce' },
];

const tabContent = {
    projecte: {
        title: 'Una llibreria online amb criteri propi',
        intro: 'Voltamons neix amb la idea de portar l\'experiència d\'una llibreria de barri al món digital. El projecte combina un catàleg viu, una navegació pensada per al descobriment i una capa d\'administració que separa clarament el que veu el client del que gestiona l\'equip.',
        points: [
            {
                title: 'Com s\'organitza la navegació',
                text: 'L\'usuari es mou entre Inici, Catàleg, Cistella i Compte. L\'administrador accedeix al panell des d\'un enllaç que només apareix si el seu rol ho permet. Aquesta separació evita barrejar fluxos i simplifica l\'experiència de cada perfil.',
            },
            {
                title: 'Per què una memòria dins la web',
                text: 'En lloc d\'un PDF extern, hem preferit que el professor pugui navegar per la interfície real mentre llegeix les justificacions. Cada criteri de rúbrica es pot comprovar in situ, sense sortir de l\'entorn del projecte.',
            },
            {
                title: 'Tecnologia i enfocament',
                text: 'Laravel al backend i React amb Inertia al frontend. La comunicació és reactiva però sense perdre el model clàssic de rutes i controladors. Les dades s\'entreguen amb Inertia i, quan cal més dinamisme, amb axios.',
            },
        ],
    },
    identitat: {
        title: 'Un projecte amb personalitat de llibreria',
        intro: "La marca Volta Mons vol suggerir moviment i descoberta, com quan passeges entre prestatges i trobes allò que no buscaves.",
        points: [
            {
                title: 'Marca comercial i eslògan',
                text: 'El nom "Voltamons" i l\'eslògan "La llibreria que t\'obre el món" juguen amb la idea de voltar per la botiga i, alhora, d\'un món de lectures per explorar. La proposta vol ser propera sense perdre ambició.',
            },
            {
                title: 'Mercat i projecció',
                text: 'La primera fase cobreix el públic català, amb una experiència completament en català. El catàleg inicial se centra en ficció, no ficció i infantil, amb plans d\'ampliar a altres gèneres i idiomes.',
            },
            {
                title: 'Domini i presència',
                text: 'El domini proposat és voltamons.cat, amb alternatives previstes per garantir la continuïtat de la marca. La coherència del nom es manté a l\'URL, al logotip i a les xarxes socials.',
            },
        ],
    },
    estils: {
        title: 'Coherència visual i contrastos segurs',
        intro: "L'apartat visual busca l'equilibri entre una calidesa de llibreria de barri i una llegibilitat que no cansi l'usuari durant la navegació.",
        points: [
            {
                title: 'Paleta de colors i contrast WCAG',
                text: 'Treball amb una gamma ambre (tons càlids que recorden la fusta i el paper) combinada amb pedra per al cos de text. Els contrastos s\'han comprovat per garantir llegibilitat: el text principal (stone-800 sobre fons ambre-50) passa el nivell AA de WCAG 2.1, i els botens d\'acció (ambre-700 sobre blanc) també superen el rati mínim. Es va descartar un gris fred perquè en proves d\'usuari es percebia com a genèric i allunyat de la identitat editorial.',
            },
            {
                title: 'Tipografia pensada per a lectura',
                text: 'Figtree per a titols i textos generals perquè ofereix una lectura còmoda fins i tot en pantalles petites. No s\'ha volgut recórrer a fonts decoratives que poguessin penalitzar la velocitat de càrrega o la claredat en paràgrafs llargs. Els pesos (semibold per a titols, normal per a cos) creen una jerarquia visual neta.',
            },
            {
                title: 'Jerarquia visual amb H1, H2 i H3',
                text: 'Cada pàgina té un únic H1 (el titol principal), els H2 separen seccions i els H3 introdueixen blocs dins d\'aquestes seccions. L\'espaiat entre nivells és consistent (2rem entre seccions, 1rem entre titol i text) perquè l\'escaneig visual sigui predictiu. A les fitxes de catàleg, per exemple, l\'H1 és el nom del llibre i els H2 són "Relacionats" i "Opinions".',
            },
        ],
    },
    arquitectura: {
        title: 'Estructura pensada per a navegar sense perdre\'s',
        intro: "L'arquitectura de la web està dissenyada perquè l'usuari sempre sàpiga on és, cap a on pot anar i com tornar enrere.",
        points: [
            {
                title: 'Layout reusable i consistent',
                text: 'Header amb navegació, main per al contingut i footer amb enllaços legals. Aquest esquema es repeteix a totes les pantalles públiques, de manera que l\'usuari reconeix la interfície des del primer clic. El panell d\'admin utilitza un layout diferent, amb accés ràpid a les eines de gestió, però manté la mateixa filosofia de capçalera i peu.',
            },
            {
                title: 'Disseny responsive i graella fluida',
                text: 'El catàleg passa d\'una columna a mòbil a dues columnes a tauleta i fins a quatre a escriptori. Les targetes de producte, les taules d\'admin i els formularis s\'adapten sense tall horitzontal. El punt de trencament s\'ha ajustat perquè en mòbils grans (375px+) no aparegui mai scroll lateral. S\'ha prioritzat el mobile-first: el menú es col·lapsa en hamburguesa i les accions secundàries queden darrere d\'un clic.',
            },
            {
                title: 'Jerarquia de contingut i espaiat',
                text: 'Les pàgines separen accions primàries (comprar, filtrar, enviar) de les informacions de suport. Per exemple, a la fitxa de producte, el preu i el botó "Afegir a la cistella" estan a la part superior dreta, mentre que la descripció i les opinions queden a sota. Les marges interiors i exteriors segueixen una pauta de 1.5rem per mantenir aire entre blocs sense malgastar espai vertical.',
            },
        ],
    },
    accessibilitat: {
        title: 'Navegació per a tothom',
        intro: "L'accessibilitat no s'ha tractat com un afegit final, sinó com un criteri present durant tot el desenvolupament. Cada component es pot recórrer amb teclat i els elements visuals porten descriptors quan la icona no és suficient.",
        points: [
            {
                title: 'Navegació completa amb teclat',
                text: 'Tots els enllaços, botons i inputs són accessibles per tabulació. L\'ordre del focus segueix el flux visual d\'esquerra a dreta i de dalt a baix. En formularis llargs com el de registre, es pot avançar camp per camp sense tocar el ratolí. Les taules d\'admin també permeten navegar per les cel·les que contenen accions (editar, eliminar).',
            },
            {
                title: 'Etiquetes ARIA en icones',
                text: 'Els botons que només tenen icona (com el del carretó o la creu de tancar) incorporen aria-label perquè un lector de pantalla pugui descriure\'n la funció. Per exemple, al menu mòbil l\'hamburguesa porta "Obrir menu de navegacio". També s\'ha marcat amb aria-hidden els elements decoratius com les rodones de fons al hero de la Memòria UI.',
            },
            {
                title: 'Contrast i llegibilitat per a tots els usuaris',
                text: 'A banda dels criteris generals de contrast WCAG, s\'ha evitat l\'ús de text gris clar sobre fons blanc (com el típic placeholder ilegible). Els missatges d\'error en formularis tenen un color rosat (rose-600) que contrasta suficientment amb el fons, i les etiquetes verdes d\'èxit també compleixen el rati mínim.',
            },
        ],
    },
    formularis: {
        title: 'Formularis que acompanyen l\'usuari',
        intro: 'Els formularis són un dels punts on l\'usuari més fricció pot trobar. Per això cada camp retroalimenta l\'usuari en temps real, abans que arribi al botó d\'enviar.',
        points: [
            {
                title: 'Validació en temps real',
                text: 'Al formulari de registre, cada camp mostra el seu estat tan bon punt l\'usuari el deixa (esdeveniment onBlur). Si el valor és incorrecte, la vora es torna vermella i apareix un missatge explicatiu ("El nom i cognoms es obligatori", "Format de data invalid. Usa DD/MM/YYYY"). Quan el valor és correcte, la vora es torna verda i l\'usuari rep confirmació visual immediata. Això evita l\'ensurt d\'arribar al final i descobrir errors.',
            },
            {
                title: 'Indicadors de fortalesa i requisits',
                text: 'El camp de contrasenya incorpora un metre de fortalesa que valua llargada, varietat de majúscules/minúscules, números i caràcters especials. L\'usuari sap si la contrasenya és feble, mitjana o forta abans d\'enviar. A més, el botó de registre es desactiva si hi ha errors pendents, cosa que força a resoldre\'ls abans de continuar.',
            },
            {
                title: 'Formularis adaptatius segons el context',
                text: 'El formulari de consulta de producte al catàleg és un exemple de disseny adaptatiu: mostra camps de nom i correu per a usuaris no autenticats, i els amaga si l\'usuari ja ha iniciat sessió perquè les dades ja es coneixen. A la pàgina de checkout, les adreces de facturació es poden marcar com a iguals a les d\'enviament amb un sol checkbox, cosa que redueix la feina d\'emplenament.',
            },
            {
                title: 'Feedback post-enviament',
                text: 'Quan un formulari s\'envia correctament, apareix un missatge de confirmació visible. Per exemple, després d\'enviar una consulta de producte, el formulari es substitueix per un text de gràcies amb opció d\'enviar-ne una altra. Això dóna certesa que l\'acció s\'ha completat.',
            },
        ],
    },
    ecommerce: {
        title: 'Integració dels blocs comercials',
        intro: "La implementació comercial connecta el catàleg amb la compra i la postvenda, tot dins d'una experiència que vol ser predictible i sense ensurts.",
        points: [
            {
                title: 'Navegació clau al menú',
                text: 'La capçalera pública ofereix accés directe a Inici, Catàleg, Cistella, Compte i aquesta Memòria UI. Quan un usuari és admin, apareix un enllaç addicional al panell de gestió. El peu incorpora avís legal, cookies, privacitat, condicions d\'enviament i contacte a totes les pantalles.',
            },
            {
                title: 'Catàleg, producte i compra',
                text: 'El catàleg permet filtrar per categoria i subcategoria, i la fitxa de producte inclou imatge, descripció i botó d\'afegir a la cistella. El checkout recull adreces d\'enviament i facturació, i després de la compra es pot consultar l\'historial de comandes amb detall i factura en PDF.',
            },
            {
                title: 'Administració i control d\'estoc',
                text: 'El panell d\'admin permet gestionar productes, categories, subcategories, usuaris i comandes. La secció d\'Accions ràpides inclou aplicar descomptes globals o restaurar preus originals. Les taules d\'estoc mostren els llibres amb menys de 5 unitats i els esgotats.',
            },
            {
                title: 'Recordatori de reviews postcompra',
                text: 'Després de comprar, el sistema marca els productes com a pendents de comentar. Quan l\'usuari accedeix a la web, rep un modal que li ofereix deixar una opinió. Pot optar per fer-la, saltar-la o cancel·lar-la. Si tria "No fer-lo", el registre s\'esborra i no torna a aparèixer.',
            },
        ],
    },
    rendiment: {
        title: 'Rendiment i integració multimèdia',
        intro: "El projecte opta per tècniques d'optimització de recursos i una gestió honesta dels elements multimèdia: si no es pot fer amb semàntica pura, es justifica amb alternatives funcionals.",
        points: [
            {
                title: 'Pes i format d\'imatges',
                text: 'Les portades dels llibres es carreguen des d\'Open Library en format JPEG, amb una resolució que s\'ajusta a la graella de catàleg sense superar els 200 KB per imatge. En producció, el pla és migrar a WebP amb fallback JPEG, però la font externa actual ja ofereix una compressió raonable sense degradar l\'experiència visual. El catàleg fa servir lazy loading natiu per no carregar portades que encara no estan al viewport.',
            },
            {
                title: 'Semàntica multimèdia: iframe amb justificació',
                text: 'El mapa de Google Maps a la pàgina de Contacte s\'integra amb un iframe, no amb figure/video, perquè el contingut és dinàmic i prové d\'un servei extern. Per compensar la manca de semàntica nativa, l\'iframe inclou un aria-label descriptiu ("Mapa de Google Maps mostrant la ubicació de Voltamons al Passeig de Gràcia, 1, Barcelona") i un title que el lector de pantalla pot interpretar. Això cobreix tant el requisit d\'integració com el d\'accessibilitat.',
            },
            {
                title: 'Optimització de recursos frontend',
                text: 'El build amb Vite minifica i versiona els fitxers CSS i JS. Les fonts del sistema (Figtree) s\'usen en lloc de fonts personalitzades per estalviar peticions HTTP. Les imatges decoratives (com les rodones de fons al hero de la Memòria UI) porten aria-hidden per no carregar el lector de pantalla amb elements purament visuals.',
            },
        ],
    },
    interaccio: {
        title: 'Disseny consistent i micro-interaccions',
        intro: "La interfície segueix una guia d'estils única que es repeteix a tots els components, i cada element interactiu respon visualment quan l'usuari hi passa el ratolí, hi fa focus o hi clica.",
        points: [
            {
                title: 'Sistema de disseny coherent',
                text: 'Tots els botons primaris comparteixen la mateixa classe (bg-amber-700, text-white, rounded-md), independentment de si apareixen al catàleg, al carretó o al panell d\'admin. Les targetes de producte, les seccions d\'informació i els formularis fan servir el mateix patró de border, shadow i padding. Això garanteix que l\'usuari reconegui els patrons visuals a cada pàgina.',
            },
            {
                title: 'Micro-interaccions amb Tailwind',
                text: 'Cada botó i enllaç distingeix clarament els estats hover (canvi de color amb transició suau de 150ms), focus (ring ambre que ressalta l\'element actiu) i active (fons més fosc). Per exemple, els botons d\'admin passen de bg-amber-700 a bg-amber-800 en hover, amb una transició que no talla sobtadament. Els enllaços del menú es subratllen suaument i canvien de color.',
            },
            {
                title: 'Feedback visual en accions',
                text: 'Quan l\'usuari afegeix un producte a la cistella, envia una consulta o aplica un descompte, el botó mostra "Enviant..." o "Aplicant..." i es desactiva fins que l\'operació acaba. Això dóna certesa que l\'acció s\'ha registrat i evita clics duplicats. El mateix patró es repeteix als formularis de registre i checkout.',
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
        question: "Què cobreix la secció d'accessibilitat?",
        answer: "Hi trobareu justificacions de navegació per teclat, etiquetes ARIA i contrastos WCAG, que són els tres punts clau de la rúbrica d'accessibilitat.",
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
                                Contacte
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
