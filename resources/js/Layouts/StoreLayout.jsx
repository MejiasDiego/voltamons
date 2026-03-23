import { Link, usePage } from '@inertiajs/react';
import CartBadge from '@/Components/CartBadge';

const linkClasses =
    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-amber-100 hover:text-amber-900';

export default function StoreLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-amber-50 text-stone-800">
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
                                    Inicia sessio
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
        </div>
    );
}
