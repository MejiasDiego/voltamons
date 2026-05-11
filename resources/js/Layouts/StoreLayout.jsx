import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CartBadge from '@/Components/CartBadge';
import ReviewReminderModal from '@/Components/ReviewReminderModal';

const linkClasses =
    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-amber-100 hover:text-amber-900';

const footerLinkClasses = 'text-stone-600 transition hover:text-amber-900';

export default function StoreLayout({ children }) {
    const { auth } = usePage().props;
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [pendingReview, setPendingReview] = useState(null);

    useEffect(() => {
        if (!auth?.user) {
            return;
        }

        const checkPendingReviews = async () => {
            try {
                const response = await axios.get(route('api.pending-reviews'));
                const items = response.data;

                if (items.length > 0 && !sessionStorage.getItem('review_reminder_shown')) {
                    setPendingReview({
                        orderItemId: items[0].id,
                        bookTitle: items[0].book?.title || 'Producte',
                        bookSlug: items[0].book?.slug || '',
                    });
                    setShowReviewModal(true);
                    sessionStorage.setItem('review_reminder_shown', 'true');
                }
            } catch {
                // Silently fail
            }
        };

        checkPendingReviews();
    }, [auth?.user]);

    const handleReviewDecision = async (decision) => {
        if (!pendingReview) {
            return;
        }

        try {
            await axios.post(route('api.review-decision'), {
                order_item_id: pendingReview.orderItemId,
                decision,
            });
        } catch {
            // Silently fail
        }

        setShowReviewModal(false);
        setPendingReview(null);
    };

    return (
        <div className="min-h-screen bg-amber-50 text-stone-800">

            <ReviewReminderModal
                show={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onDecision={handleReviewDecision}
                reminder={pendingReview}
            />
            <header className="border-b border-amber-200 bg-amber-100/80 backdrop-blur">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="text-xl font-semibold text-amber-900">
                        Voltamons
                    </Link>

                    <nav className="flex items-center gap-2">
                        <Link href={route('home')} className={linkClasses}>
                            Inici
                        </Link>
                        <Link href={route('catalog.index')} className={linkClasses}>
                            Cataleg
                        </Link>
                        <Link href={route('memoria.index')} className={linkClasses}>
                            Memòria UI
                        </Link>
                        <CartBadge />
                        {auth?.user ? (
                            <>
                                {auth.user.role === 'admin' && (
                                    <Link href={route('admin.dashboard')} className={linkClasses}>
                                        Admin
                                    </Link>
                                )}
                                <Link href={route('dashboard')} className={linkClasses}>
                                    Compte
                                </Link>
                                <Link href={route('orders.index')} className={linkClasses}>
                                    Comandes
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className={linkClasses}>
                                    Inicia sessió
                                </Link>
                                <Link href={route('register')} className={linkClasses}>
                                    Registra't
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>

            <footer className="border-t border-amber-200 bg-amber-100/70">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p className="text-stone-600">Voltamons · Llibreria online</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <Link href={route('legal.notice')} className={footerLinkClasses}>
                            Avís legal
                        </Link>
                        <Link href={route('legal.cookies')} className={footerLinkClasses}>
                            Política de cookies
                        </Link>
                        <Link href={route('legal.privacy')} className={footerLinkClasses}>
                            Privacitat
                        </Link>
                        <Link href={route('legal.shipping')} className={footerLinkClasses}>
                            Condicions d'enviament
                        </Link>
                        <Link href={route('legal.contact')} className={footerLinkClasses}>
                            Contacte
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
