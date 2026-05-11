export default function CategoryForm({ data, setData, errors }) {
    return (
        <div className="space-y-4">
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
                    id="category-active"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(event) => setData('is_active', event.target.checked)}
                    className="rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                />
                <label htmlFor="category-active" className="text-sm text-stone-700">Categoria activa</label>
            </div>
        </div>
    );
}
