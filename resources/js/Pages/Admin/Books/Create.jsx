import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BookForm from './Form';

export default function BooksCreate({ categories, subcategories }) {
    const { props } = usePage();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
        isbn: '',
        description: '',
        price: '',
        stock: '',
        cover_image: '',
        category_id: '',
        subcategory_id: '',
        is_active: true,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.books.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Nou producte</h2>}>
            <Head title="Nou producte" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    {Object.keys(errors).length > 0 && (
                        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                            Revisa els camps marcats: hi ha errors de validació.
                        </div>
                    )}
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5 px-6 py-5">
                            <BookForm data={data} setData={setData} categories={categories} subcategories={subcategories} errors={errors} />

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {processing ? 'Guardant...' : 'Crear producte'}
                                </button>
                                <Link
                                    href={route('admin.books.index')}
                                    className="text-sm font-semibold text-stone-600 hover:text-amber-900"
                                >
                                    Tornar al llistat
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
