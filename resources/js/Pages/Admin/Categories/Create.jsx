import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CategoryForm from './Form';

export default function CategoriesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        is_active: true,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Nova categoria</h2>}>
            <Head title="Nova categoria" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 sm:px-6 lg:px-8">
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5 px-6 py-5">
                            <CategoryForm data={data} setData={setData} errors={errors} />

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {processing ? 'Guardant...' : 'Crear categoria'}
                                </button>
                                <Link
                                    href={route('admin.categories.index')}
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
