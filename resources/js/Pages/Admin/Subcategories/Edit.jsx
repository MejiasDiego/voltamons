import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SubcategoryForm from './Form';

export default function SubcategoriesEdit({ subcategory, categories }) {
    const { data, setData, patch, processing, errors } = useForm({
        category_id: subcategory.category_id || '',
        name: subcategory.name || '',
        description: subcategory.description || '',
        is_active: Boolean(subcategory.is_active),
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.subcategories.update', subcategory.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-stone-800">Editar subcategoria</h2>}>
            <Head title="Editar subcategoria" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 sm:px-6 lg:px-8">
                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5 px-6 py-5">
                            <SubcategoryForm data={data} setData={setData} categories={categories} errors={errors} />

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60"
                                >
                                    {processing ? 'Guardant...' : 'Guardar canvis'}
                                </button>
                                <Link
                                    href={route('admin.subcategories.index')}
                                    className="text-sm font-semibold text-stone-600 hover:text-amber-900"
                                >
                                    Tornar al llistat
                                </Link>
                            </div>
                        </form>
                    </section>

                    <section className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-amber-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-stone-900">Eliminar subcategoria</h3>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm text-stone-700">Aquesta acció és permanent.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!window.confirm('Segur que vols eliminar aquesta subcategoria?')) {
                                        return;
                                    }
                                    router.delete(route('admin.subcategories.destroy', subcategory.id));
                                }}
                                className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Eliminar subcategoria
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
