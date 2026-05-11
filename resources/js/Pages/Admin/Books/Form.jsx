export default function BookForm({ data, setData, categories, subcategories, errors }) {
    const filteredSubcategories = subcategories.filter((subcategory) => {
        if (!data.category_id) {
            return true;
        }
        return Number(subcategory.category_id) === Number(data.category_id);
    });

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Títol</label>
                    <input
                        value={data.title}
                        onChange={(event) => setData('title', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Autor</label>
                    <input
                        value={data.author}
                        onChange={(event) => setData('author', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.author && <p className="mt-1 text-xs text-rose-600">{errors.author}</p>}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">ISBN</label>
                    <input
                        value={data.isbn}
                        onChange={(event) => setData('isbn', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.isbn && <p className="mt-1 text-xs text-rose-600">{errors.isbn}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Imatge portada (URL)</label>
                    <input
                        value={data.cover_image}
                        onChange={(event) => setData('cover_image', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.cover_image && <p className="mt-1 text-xs text-rose-600">{errors.cover_image}</p>}
                </div>
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

            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Categoria</label>
                    <select
                        value={data.category_id}
                        onChange={(event) => {
                            setData('category_id', event.target.value);
                            setData('subcategory_id', '');
                        }}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                        <option value="">Selecciona categoria</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="mt-1 text-xs text-rose-600">{errors.category_id}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Subcategoria</label>
                    <select
                        value={data.subcategory_id}
                        onChange={(event) => setData('subcategory_id', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                        <option value="">Selecciona subcategoria</option>
                        {filteredSubcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                    {errors.subcategory_id && <p className="mt-1 text-xs text-rose-600">{errors.subcategory_id}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id="book-active"
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(event) => setData('is_active', event.target.checked)}
                        className="rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                    />
                    <label htmlFor="book-active" className="text-sm text-stone-700">Producte actiu</label>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Preu</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.price}
                        onChange={(event) => setData('price', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.price && <p className="mt-1 text-xs text-rose-600">{errors.price}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Estoc</label>
                    <input
                        type="number"
                        min="0"
                        value={data.stock}
                        onChange={(event) => setData('stock', event.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.stock && <p className="mt-1 text-xs text-rose-600">{errors.stock}</p>}
                </div>
            </div>
        </div>
    );
}
