const CART_STORAGE_KEY = 'voltamons_cart_v1';

export function getCartItems() {
    if (typeof window === 'undefined') {
        return [];
    }

    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedValue) {
        return [];
    }

    try {
        const parsed = JSON.parse(storedValue);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveCartItems(items) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: items }));
}

export function addToCart(book, quantity = 1) {
    const items = getCartItems();
    const bookId = Number(book.id);
    const parsedQuantity = Math.max(1, Number(quantity) || 1);
    const existingItem = items.find((item) => Number(item.id) === bookId);

    if (existingItem) {
        const maxStock = Number(book.stock || existingItem.stock || 9999);
        existingItem.quantity = Math.min(existingItem.quantity + parsedQuantity, maxStock);
        saveCartItems([...items]);
        return;
    }

    items.push({
        id: bookId,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        stock: Number(book.stock || 0),
        category: book.category?.name || '',
        cover_url: book.cover_url || '',
        quantity: Math.min(parsedQuantity, Number(book.stock || parsedQuantity)),
    });

    saveCartItems(items);
}

export function updateCartQuantity(bookId, quantity) {
    const items = getCartItems();
    const parsedQuantity = Number(quantity) || 0;
    const nextItems = items
        .map((item) => {
            if (Number(item.id) !== Number(bookId)) {
                return item;
            }

            const maxStock = Number(item.stock || 9999);
            const boundedQuantity = Math.max(0, Math.min(parsedQuantity, maxStock));

            return {
                ...item,
                quantity: boundedQuantity,
            };
        })
        .filter((item) => item.quantity > 0);

    saveCartItems(nextItems);
}

export function removeFromCart(bookId) {
    const items = getCartItems();
    saveCartItems(items.filter((item) => Number(item.id) !== Number(bookId)));
}

export function clearCart() {
    saveCartItems([]);
}

export function getCartTotal(items) {
    return items.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
}

export function formatPrice(value) {
    const numericValue = Number(value) || 0;
    return `${numericValue.toFixed(2)} EUR`;
}
