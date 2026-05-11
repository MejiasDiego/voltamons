import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import BookCover from '@/Components/BookCover';
import AddToCartButton from '@/Components/AddToCartButton';
import OpinionStars from '@/Components/OpinionStars';
import StoreLayout from '@/Layouts/StoreLayout';
import { formatPrice } from '@/lib/cart';

export default function CatalogShow({ book, relatedBooks, pendingCommentOrderItemId }) {
    const { auth } = usePage().props;
    const [opinions, setOpinions] = useState([]);
    const [ratingInfo, setRatingInfo] = useState({ rating: 0, count: 0 });
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');
    const [isLoadingOpinions, setIsLoadingOpinions] = useState(false);
    const [isSubmittingOpinion, setIsSubmittingOpinion] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [form, setForm] = useState({ rating: 0, title: '', comment: '' });
    const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
    const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
    const [inquirySent, setInquirySent] = useState(false);
    const [inquiryEmailError, setInquiryEmailError] = useState('');

    const validateInquiryEmail = (value) => {
        if (!value.trim()) {
            setInquiryEmailError('El correu electronic es obligatori.');
        } else if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
            setInquiryEmailError('Introdueix un correu electronic valid.');
        } else {
            setInquiryEmailError('');
        }
    };

    const isInquiryValid = useMemo(() => {
        if (!inquiryForm.message.trim() || inquiryForm.message.trim().length > 150) {
            return false;
        }

        if (!inquiryForm.name.trim() || !inquiryForm.email.trim()) {
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(inquiryForm.email.trim())) {
            return false;
        }

        return true;
    }, [inquiryForm]);

    const submitInquiry = async (event) => {
        event.preventDefault();
        setIsSubmittingInquiry(true);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setInquirySent(true);
        setInquiryForm({ name: '', email: '', message: '' });
        setIsSubmittingInquiry(false);
    };

    const hasPendingComment = useMemo(() => Boolean(pendingCommentOrderItemId), [pendingCommentOrderItemId]);

    const loadOpinions = async (params = {}) => {
        setIsLoadingOpinions(true);

        try {
            const [opinionsResponse, ratingResponse] = await Promise.all([
                axios.get(route('api.opinions.getOpinions', { idProducte: book.id }), {
                    params: {
                        ...params,
                        bd: 'jpa',
                    },
                }),
                axios.get(route('api.opinions.getRating'), {
                    params: {
                        bd: 'jpa',
                    },
                }),
            ]);

            setOpinions(opinionsResponse.data.opinions || []);

            const ratingEntry = (ratingResponse.data || []).find((entry) => Number(entry.idProducte) === Number(book.id));

            if (!ratingEntry) {
                setRatingInfo({ rating: 0, count: 0 });
            } else {
                const ratings = ratingEntry.ratings || [0, 0, 0, 0, 0];
                const totalCount = Number(ratingEntry.totalOpinions || 0);
                const weightedSum = ratings.reduce((acc, count, index) => acc + Number(count) * (index + 1), 0);
                const average = totalCount > 0 ? weightedSum / totalCount : 0;

                setRatingInfo({
                    rating: average,
                    count: totalCount,
                });
            }
        } catch {
            setOpinions([]);
            setRatingInfo({ rating: 0, count: 0 });
        } finally {
            setIsLoadingOpinions(false);
        }
    };

    useEffect(() => {
        loadOpinions();
    }, [book.id]);

    const applyFilters = async () => {
        const params = {};

        if (filterFrom) {
            params.from_date = filterFrom;
        }

        if (filterTo) {
            params.to_date = filterTo;
        }

        await loadOpinions(params);
    };

    const submitOpinion = async (event) => {
        event.preventDefault();

        if (!hasPendingComment) {
            setFeedbackMessage('No tens cap compra pendent de comentar per aquest llibre.');
            return;
        }

        if (form.rating < 1 || form.title.trim().length < 2 || form.comment.trim().length < 5) {
            setFeedbackMessage('Cal afegir estrelles, titol i comentari minim de 5 caracters.');
            return;
        }

        setIsSubmittingOpinion(true);

        try {
            await axios.post(route('api.opinions.sendOpinion'), {
                idProduct: String(book.id),
                idUser: null,
                user: null,
                rating: form.rating,
                title: form.title,
                text: form.comment,
            }, {
                params: {
                    bd: 'jpa',
                },
            });

            setForm({ rating: 0, title: '', comment: '' });
            setFeedbackMessage('Gracies! Valoracio enviada correctament.');
            await loadOpinions();
        } catch {
            setFeedbackMessage('No s\'ha pogut enviar la valoracio. Comprova que has comprat el llibre.');
        } finally {
            setIsSubmittingOpinion(false);
        }
    };

    return (
        <>
            <Head title={book.title} />

            <StoreLayout>
                <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                        <BookCover src={book.cover_url} title={book.title} className="h-[420px] w-full rounded-lg bg-amber-100 object-cover" />

                        <div>
                            <p className="text-xs uppercase tracking-wide text-stone-500">{book.category?.name}</p>
                            <h1 className="mt-2 text-3xl font-bold text-amber-950">{book.title}</h1>
                            <p className="mt-2 text-base text-stone-700">{book.author}</p>
                            <p className="mt-1 text-sm text-stone-500">ISBN: {book.isbn}</p>

                            <div className="mt-5 flex items-end gap-4">
                                <p className="text-2xl font-bold text-amber-900">{formatPrice(book.price)}</p>
                                <p className="text-sm text-stone-600">Estoc: {book.stock}</p>
                            </div>

                            <p className="mt-5 leading-relaxed text-stone-700">
                                {book.description || 'Aquest llibre encara no te descripcio detallada.'}
                            </p>

                            <div className="mt-6 max-w-xs">
                                <AddToCartButton book={book} compact />
                            </div>

                            <div className="mt-6">
                                <Link href={route('catalog.index')} className="text-sm font-semibold text-amber-800 hover:text-amber-900">
                                    Tornar al cataleg
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedBooks.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-xl font-bold text-amber-950">Relacionats</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedBooks.map((item) => (
                                <Link key={item.id} href={route('catalog.show', { slug: item.slug })} className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
                                    <BookCover src={item.cover_url} title={item.title} className="h-56 w-full bg-amber-100 object-cover" />
                                    <div className="p-3">
                                        <p className="line-clamp-2 text-sm font-semibold text-stone-900">{item.title}</p>
                                        <p className="mt-1 text-xs text-stone-600">{item.author}</p>
                                        <p className="mt-2 text-sm font-bold text-amber-900">{formatPrice(item.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-8 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-bold text-amber-950">Consulta sobre aquest producte</h2>

                    {inquirySent ? (
                        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                            <p className="text-sm font-medium text-emerald-800">Gracies! La teva consulta ha estat enviada correctament.</p>
                            <button
                                type="button"
                                onClick={() => setInquirySent(false)}
                                className="mt-2 text-sm font-semibold text-emerald-700 underline hover:text-emerald-900"
                            >
                                Enviar una altra consulta
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submitInquiry} className="mt-4 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="inquiry-name" className="mb-1 block text-sm font-medium text-stone-700">
                                        Nom i cognoms
                                    </label>
                                    <input
                                        id="inquiry-name"
                                        type="text"
                                        value={inquiryForm.name}
                                        onChange={(event) => setInquiryForm((previous) => ({ ...previous, name: event.target.value }))}
                                        className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="inquiry-email" className="mb-1 block text-sm font-medium text-stone-700">
                                        Correu electronic
                                    </label>
                                    <input
                                        id="inquiry-email"
                                        type="email"
                                        value={inquiryForm.email}
                                        onChange={(event) => {
                                            setInquiryForm((previous) => ({ ...previous, email: event.target.value }));
                                            if (inquiryEmailError) setInquiryEmailError('');
                                        }}
                                        onBlur={(event) => validateInquiryEmail(event.target.value)}
                                        className={`w-full rounded-md text-sm focus:border-amber-500 focus:ring-amber-500 ${inquiryEmailError ? 'border-rose-400' : 'border-stone-300'}`}
                                        required
                                    />
                                    {inquiryEmailError && <p className="mt-1 text-xs text-rose-600">{inquiryEmailError}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="inquiry-message" className="mb-1 block text-sm font-medium text-stone-700">
                                    El teu missatge
                                </label>
                                <textarea
                                    id="inquiry-message"
                                    value={inquiryForm.message}
                                    onChange={(event) => setInquiryForm((previous) => ({ ...previous, message: event.target.value }))}
                                    className="w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    rows={4}
                                    placeholder="Explica'ns el teu dubte o consulta sobre aquest producte (maxim 150 caracters)"
                                    maxLength={150}
                                    required
                                />
                                <p className="mt-1 text-right text-xs text-stone-500">
                                    {inquiryForm.message.length}/150
                                </p>
                            </div>

                            {isInquiryValid && (
                                <button
                                    type="submit"
                                    disabled={isSubmittingInquiry}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {isSubmittingInquiry ? 'Enviant...' : 'Enviar consulta'}
                                </button>
                            )}
                        </form>
                    )}
                </section>

                <section className="mt-8 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-amber-950">Opinions i valoracions</h2>
                        <div className="flex items-center gap-3">
                            <OpinionStars value={Math.round(Number(ratingInfo.rating || 0))} />
                            <p className="text-sm text-stone-700">
                                {Number(ratingInfo.rating || 0).toFixed(2)} / 5 ({ratingInfo.count} valoracions)
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                        <input
                            type="date"
                            value={filterFrom}
                            onChange={(event) => setFilterFrom(event.target.value)}
                            className="rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                        />
                        <input
                            type="date"
                            value={filterTo}
                            onChange={(event) => setFilterTo(event.target.value)}
                            className="rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                        />
                        <button
                            type="button"
                            onClick={applyFilters}
                            className="rounded-md border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                        >
                            Filtrar
                        </button>
                    </div>

                    {hasPendingComment && (
                        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                            <p className="text-sm font-semibold text-emerald-800">Tens una compra pendent de comentar per aquest llibre.</p>
                            <p className="mt-1 text-xs text-emerald-700">Afegeix una valoracio per completar l'experiencia de compra.</p>
                        </div>
                    )}

                    <form onSubmit={submitOpinion} className="mt-5 rounded-lg border border-amber-200 p-4">
                        <p className="text-sm font-semibold text-stone-800">Enviar valoracio</p>
                        <div className="mt-2">
                            <OpinionStars interactive value={form.rating} onSelect={(value) => setForm((previous) => ({ ...previous, rating: value }))} />
                        </div>
                        <textarea
                            value={form.title}
                            onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
                            className="mt-3 w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                            rows={1}
                            placeholder="Titol de la valoracio"
                        />

                        <textarea
                            value={form.comment}
                            onChange={(event) => setForm((previous) => ({ ...previous, comment: event.target.value }))}
                            className="mt-3 w-full rounded-md border-stone-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                            rows={4}
                            placeholder="Comparteix la teva opinio del llibre"
                        />

                        <button
                            type="submit"
                            disabled={isSubmittingOpinion || !hasPendingComment}
                            className="mt-3 rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-60"
                        >
                            {isSubmittingOpinion ? 'Enviant...' : 'Enviar valoracio'}
                        </button>

                        {feedbackMessage && <p className="mt-2 text-sm font-medium text-stone-700">{feedbackMessage}</p>}
                    </form>

                    <div className="mt-5 space-y-3">
                        {isLoadingOpinions ? (
                            <p className="text-sm text-stone-600">Carregant opinions...</p>
                        ) : opinions.length === 0 ? (
                            <p className="text-sm text-stone-600">Encara no hi ha opinions per aquest llibre.</p>
                        ) : (
                            opinions.map((opinion) => (
                                <article key={opinion.opinionId} className="rounded-lg border border-stone-200 p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-stone-900">{opinion.user || 'Anònim'}</p>
                                        <OpinionStars value={opinion.rating} size="text-base" />
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-stone-800">{opinion.title}</p>
                                    <p className="mt-1 text-sm text-stone-700">{opinion.opinion}</p>
                                    <p className="mt-1 text-xs text-stone-500">{new Date(opinion.timeStamp).toLocaleString('ca-ES')}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>

            </StoreLayout>
        </>
    );
}
