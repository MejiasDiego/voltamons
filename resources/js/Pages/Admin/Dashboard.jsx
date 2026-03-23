import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const palette = ['lightgreen', 'red', 'green', 'magenta', 'blue', 'yellow', 'black', '#92400e'];

function arrayParseInt(array) {
    const arrayInts = [];

    for (let i = 0; i < array.length; i += 1) {
        arrayInts[i] = parseInt(array[i], 10);
    }

    return arrayInts;
}

function getMaxValorArray(array) {
    let numeroPetit = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < array.length; i += 1) {
        if (array[i] >= numeroPetit) {
            numeroPetit = array[i];
        }
    }

    return numeroPetit;
}

function crearGrafic({ context, canvas, arrayProducte, arrayDades, arrayColors, titolGrafic }) {
    const dadesInt = arrayParseInt(arrayDades);
    const numeroMajor = getMaxValorArray(dadesInt);

    const marge = 28;
    const yBase = canvas.height - marge * 3;
    const alturaUtil = canvas.height - marge * 5;
    const ampladaUtil = canvas.width - marge * 2;
    const width = ampladaUtil / dadesInt.length;

    for (let i = 0; i < dadesInt.length; i += 1) {
        context.fillStyle = arrayColors[i % arrayColors.length];
        const x = marge + i * width;

        const alturaEscalada = (dadesInt[i] / numeroMajor) * alturaUtil;
        const y = yBase - alturaEscalada;

        context.fillRect(x, y, width - 6, alturaEscalada);
    }

    context.fillStyle = '#1f2937';
    context.font = '16px Montserrat, sans-serif';
    context.textAlign = 'center';
    context.fillText(titolGrafic, canvas.width / 2, canvas.height - 18);

    const numLinies = 5;
    context.strokeStyle = '#d1d5db';
    context.lineWidth = 1;
    context.font = '12px Arial';
    context.fillStyle = '#374151';
    context.textAlign = 'right';
    const xText = marge - 7;

    for (let i = 0; i <= numLinies; i += 1) {
        const valorLinia = (numeroMajor / numLinies) * i;
        const y = yBase - (valorLinia / numeroMajor) * alturaUtil;

        context.beginPath();
        context.moveTo(marge, y);
        context.lineTo(canvas.width - marge, y);
        context.stroke();

        context.fillText(Math.round(valorLinia), xText, y + 4);
    }
}

export default function AdminDashboard({ stats, books: initialBooks, salesChart }) {
    const [books, setBooks] = useState(initialBooks);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const chartRef = useRef(null);
    const [legendData, setLegendData] = useState([]);

    const cards = [
        { label: 'Llibres', value: stats.books },
        { label: 'Categories', value: stats.categories },
        { label: 'Subcategories', value: stats.subcategories },
        { label: 'Estoc baix (< 5)', value: stats.lowStockBooks },
        { label: 'Sense estoc', value: stats.outOfStockBooks },
    ];

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        const canvas = chartRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const maxBars = 8;
        const data = salesChart.slice(0, maxBars);

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        if (data.length === 0) {
            ctx.fillStyle = '#6b7280';
            ctx.font = '16px sans-serif';
            ctx.fillText('Encara no hi ha vendes per mostrar.', 24, 40);
            setLegendData([]);
            return;
        }

        const productes = data.map((entry) => String(entry.title_snapshot));
        const dadesArray = data.map((entry) => String(entry.total_sold));
        const colorsArray = data.map((_, index) => palette[index % palette.length]);

        crearGrafic({
            context: ctx,
            canvas,
            arrayProducte: productes,
            arrayDades: dadesArray,
            arrayColors: colorsArray,
            titolGrafic: 'Vendes per producte',
        });

        setLegendData(
            productes.map((producte, index) => ({
                producte,
                valor: dadesArray[index],
                color: colorsArray[index],
            })),
        );
    }, [salesChart]);

    const updateStock = async (bookId, stock) => {
        try {
            await axios.patch(route('admin.books.stock.update', { book: bookId }), {
                stock,
            });

            setBooks((previousBooks) =>
                previousBooks.map((book) => {
                    if (book.id !== bookId) {
                        return book;
                    }

                    return {
                        ...book,
                        stock,
                    };
                }),
            );

            setFeedbackMessage('Estoc actualitzat.');
        } catch {
            setFeedbackMessage('No s\'ha pogut actualitzar l\'estoc.');
        }
    };

    const applyDiscount = async () => {
        setIsSubmittingDiscount(true);

        try {
            await axios.post(route('admin.books.discount.apply'), {
                discount_percent: Number(discountPercent),
            });

            setFeedbackMessage('Descompte aplicat. Recarrega la pagina per veure preus actualitzats.');
        } catch {
            setFeedbackMessage('No s\'ha pogut aplicar el descompte.');
        } finally {
            setIsSubmittingDiscount(false);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Panell admin</h2>}>
            <Head title="Panell admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {cards.map((card) => (
                            <article key={card.label} className="overflow-hidden bg-white p-5 shadow-sm sm:rounded-lg">
                                <p className="text-sm text-gray-600">{card.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-gray-900">{card.value}</p>
                            </article>
                        ))}
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Accions rapides</h3>
                        </div>
                        <div className="grid gap-4 px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-end">
                            <div>
                                <label htmlFor="discount" className="mb-1 block text-sm font-medium text-gray-700">
                                    Descompte global (%)
                                </label>
                                <input
                                    id="discount"
                                    type="number"
                                    min="0"
                                    max="90"
                                    value={discountPercent}
                                    onChange={(event) => setDiscountPercent(event.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>

                            <button
                                type="button"
                                disabled={isSubmittingDiscount}
                                onClick={applyDiscount}
                                className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                            >
                                {isSubmittingDiscount ? 'Aplicant...' : 'Aplicar descompte'}
                            </button>
                        </div>

                        {feedbackMessage && <p className="px-6 pb-4 text-sm font-medium text-emerald-700">{feedbackMessage}</p>}
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Vendes per producte (Canvas)</h3>
                        </div>
                        <div className="px-6 py-4">
                            <canvas ref={chartRef} width="1000" height="340" className="h-auto w-full rounded border border-gray-100 bg-white" />

                            <div id="llegenda" className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {legendData.map((item) => (
                                    <p key={item.producte} className="text-sm font-medium" style={{ color: item.color }}>
                                        {item.producte}: {item.valor}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Llistat de llibres i estoc</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Titol
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Autor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Categoria
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Estoc
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Preu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Estat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {books.map((book) => (
                                        <tr key={book.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{book.title}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{book.author}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{book.category?.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    defaultValue={book.stock}
                                                    onBlur={(event) => updateStock(book.id, Number(event.target.value || 0))}
                                                    className="w-20 rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{Number(book.price).toFixed(2)} EUR</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                {book.stock > 0 ? (
                                                    <span className="rounded bg-emerald-100 px-2 py-1 text-emerald-700">Disponible</span>
                                                ) : (
                                                    <span className="rounded bg-rose-100 px-2 py-1 text-rose-700">Esgotat</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
