import { Link } from '@inertiajs/react';

const linkClasses =
    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-amber-100 hover:text-amber-900';

export default function GuestLayout({ children }) {
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
                        <Link href={route('register')} className={linkClasses}>
                            Registra't
                        </Link>
                        <Link href={route('login')} className={linkClasses}>
                            Inicia sessió
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="mx-auto mt-12 w-full max-w-lg px-4 sm:px-6 lg:px-8">
                <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
