export default function SubcategoryForm({ data, setData, categories, errors }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Categoria</label>
                <select
                    value={data.category_id}
                    onChange={(event) => setData('category_id', event.target.value)}
                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                >
                    <option value="">Selecciona una categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category_id && <p className="mt-1 text-xs text-rose-600">{errors.category_id}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Nom</label>
                <input
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Descripció</label>
                <textarea
                    value={data.description}
                    onChange={(event) => setData('description', event.target.value)}
                    className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    rows={4}
                />
                {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
            </div>

            <div className="flex items-center gap-2">
                <input
                    id="subcategory-active"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(event) => setData('is_active', event.target.checked)}
                    className="rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                />
                <label htmlFor="subcategory-active" className="text-sm text-stone-700">Subcategoria activa</label>
            </div>
        </div>
    );
}
