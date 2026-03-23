import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminDashboard({ stats, books: initialBooks, salesChart }) {
    const [books, setBooks] = useState(initialBooks);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const chartRef = useRef(null);

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
            return;
        }

        const chartPadding = { top: 20, right: 20, bottom: 80, left: 40 };
        const chartWidth = width - chartPadding.left - chartPadding.right;
        const chartHeight = height - chartPadding.top - chartPadding.bottom;
        const maxValue = Math.max(...data.map((entry) => Number(entry.total_sold)), 1);
        const barGap = 16;
        const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;

        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(chartPadding.left, chartPadding.top + chartHeight);
        ctx.lineTo(chartPadding.left + chartWidth, chartPadding.top + chartHeight);
        ctx.stroke();

        data.forEach((entry, index) => {
            const value = Number(entry.total_sold);
            const barHeight = (value / maxValue) * chartHeight;
            const x = chartPadding.left + index * (barWidth + barGap);
            const y = chartPadding.top + chartHeight - barHeight;

            ctx.fillStyle = '#92400e';
            ctx.fillRect(x, y, barWidth, barHeight);

            ctx.fillStyle = '#1f2937';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(value), x + barWidth / 2, y - 8);

            const title = String(entry.title_snapshot).slice(0, 14);
            ctx.fillStyle = '#4b5563';
            ctx.font = '11px sans-serif';
            ctx.fillText(title, x + barWidth / 2, chartPadding.top + chartHeight + 18);
        });
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
