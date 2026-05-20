import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [touched, setTouched] = useState({});
    const [focusedField, setFocusedField] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        birth_date: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_region: '',
        shipping_postal_code: '',
        billing_same_as_shipping: true,
        billing_address: '',
        billing_city: '',
        billing_region: '',
        billing_postal_code: '',
        favorite_genre: '',
        reading_language: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const passwordStrength = useMemo(() => getPasswordStrength(data.password), [data.password]);
    const uiErrors = useMemo(() => validateForm(data, passwordStrength), [data, passwordStrength]);

    const markTouched = (field) => {
        setTouched((previous) => ({
            ...previous,
            [field]: true,
        }));
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = (field) => {
        markTouched(field);
        setFocusedField('');
    };

    const handleShippingChange = (field, value) => {
        setData(field, value);

        if (data.billing_same_as_shipping) {
            const billingMap = {
                shipping_address: 'billing_address',
                shipping_city: 'billing_city',
                shipping_region: 'billing_region',
                shipping_postal_code: 'billing_postal_code',
            };

            const billingField = billingMap[field];

            if (billingField) {
                setData(billingField, value);
            }
        }
    };

    const toggleBillingSame = (checked) => {
        setData('billing_same_as_shipping', checked);

        if (checked) {
            setData('billing_address', data.shipping_address);
            setData('billing_city', data.shipping_city);
            setData('billing_region', data.shipping_region);
            setData('billing_postal_code', data.shipping_postal_code);
        }
    };

    const getFieldClassName = (field) => {
        const baseClassName = 'mt-1 block w-full rounded-md border text-sm transition focus:ring-2';
        const hasError = Boolean((touched[field] && uiErrors[field]) || errors[field]);
        const isValid = touched[field] && !uiErrors[field] && !errors[field] && data[field] !== '';
        const isFocused = focusedField === field;

        if (hasError) {
            return `${baseClassName} border-rose-400 bg-rose-50 focus:border-rose-500 focus:ring-rose-200`;
        }

        if (isValid) {
            return `${baseClassName} border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-200`;
        }

        if (isFocused) {
            return `${baseClassName} border-amber-400 bg-amber-50 focus:border-amber-500 focus:ring-amber-200`;
        }

        return `${baseClassName} border-stone-300 bg-white focus:border-amber-500 focus:ring-amber-200`;
    };

    const submit = (e) => {
        e.preventDefault();

        const allFields = {
            name: true,
            birth_date: true,
            phone: true,
            shipping_address: true,
            shipping_city: true,
            shipping_region: true,
            shipping_postal_code: true,
            billing_address: true,
            billing_city: true,
            billing_region: true,
            billing_postal_code: true,
            favorite_genre: true,
            reading_language: true,
            email: true,
            password: true,
            password_confirmation: true,
        };

        setTouched(allFields);

        if (Object.keys(uiErrors).length > 0) {
            return;
        }

        const normalizedName = toTitleCase(data.name);

        post(route('register'), {
            preserveScroll: true,
            onBefore: () => {
                setData('name', normalizedName);

                if (data.billing_same_as_shipping) {
                    setData('billing_address', data.shipping_address);
                    setData('billing_city', data.shipping_city);
                    setData('billing_region', data.shipping_region);
                    setData('billing_postal_code', data.shipping_postal_code);
                }

                return true;
            },
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Registre" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nom i cognoms" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={getFieldClassName('name')}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        placeholder="Exemple: maria serra puig"
                        required
                    />

                    <InputError message={touched.name ? uiErrors.name : ''} className="mt-2" />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="birth_date" value="Data de naixement (DD/MM/YYYY)" />

                    <TextInput
                        id="birth_date"
                        name="birth_date"
                        value={data.birth_date}
                        className={getFieldClassName('birth_date')}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        onFocus={() => handleFocus('birth_date')}
                        onBlur={() => handleBlur('birth_date')}
                        placeholder="DD/MM/YYYY"
                        required
                    />

                    <InputError message={touched.birth_date ? uiErrors.birth_date : ''} className="mt-2" />
                    <InputError message={errors.birth_date} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Telefon internacional" />

                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className={getFieldClassName('phone')}
                        onChange={(e) => setData('phone', e.target.value)}
                        onFocus={() => handleFocus('phone')}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+34600111222"
                        required
                    />

                    <InputError message={touched.phone ? uiErrors.phone : ''} className="mt-2" />
                    <InputError message={errors.phone} className="mt-1" />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="shipping_address" value="Adreça d'enviament" />
                        <TextInput
                            id="shipping_address"
                            name="shipping_address"
                            value={data.shipping_address}
                            className={getFieldClassName('shipping_address')}
                            onChange={(e) => handleShippingChange('shipping_address', e.target.value)}
                            onFocus={() => handleFocus('shipping_address')}
                            onBlur={() => handleBlur('shipping_address')}
                            required
                        />
                        <InputError message={touched.shipping_address ? uiErrors.shipping_address : ''} className="mt-2" />
                        <InputError message={errors.shipping_address} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="shipping_city" value="Ciutat d'enviament" />
                        <TextInput
                            id="shipping_city"
                            name="shipping_city"
                            value={data.shipping_city}
                            className={getFieldClassName('shipping_city')}
                            onChange={(e) => handleShippingChange('shipping_city', e.target.value)}
                            onFocus={() => handleFocus('shipping_city')}
                            onBlur={() => handleBlur('shipping_city')}
                            required
                        />
                        <InputError message={touched.shipping_city ? uiErrors.shipping_city : ''} className="mt-2" />
                        <InputError message={errors.shipping_city} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="shipping_region" value="Provincia d'enviament" />
                        <TextInput
                            id="shipping_region"
                            name="shipping_region"
                            value={data.shipping_region}
                            className={getFieldClassName('shipping_region')}
                            onChange={(e) => handleShippingChange('shipping_region', e.target.value)}
                            onFocus={() => handleFocus('shipping_region')}
                            onBlur={() => handleBlur('shipping_region')}
                            required
                        />
                        <InputError message={touched.shipping_region ? uiErrors.shipping_region : ''} className="mt-2" />
                        <InputError message={errors.shipping_region} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="shipping_postal_code" value="Codi postal d'enviament" />
                        <TextInput
                            id="shipping_postal_code"
                            name="shipping_postal_code"
                            value={data.shipping_postal_code}
                            className={getFieldClassName('shipping_postal_code')}
                            onChange={(e) => handleShippingChange('shipping_postal_code', e.target.value)}
                            onFocus={() => handleFocus('shipping_postal_code')}
                            onBlur={() => handleBlur('shipping_postal_code')}
                            required
                        />
                        <InputError message={touched.shipping_postal_code ? uiErrors.shipping_postal_code : ''} className="mt-2" />
                        <InputError message={errors.shipping_postal_code} className="mt-1" />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="inline-flex items-center gap-2 text-sm text-stone-700">
                        <input
                            type="checkbox"
                            checked={data.billing_same_as_shipping}
                            onChange={(e) => toggleBillingSame(e.target.checked)}
                            className="rounded border-stone-300 text-amber-700 focus:ring-amber-500"
                        />
                        Direccio de facturacio igual a la d'enviament
                    </label>
                </div>

                {!data.billing_same_as_shipping && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="billing_address" value="Adreça de facturacio" />
                            <TextInput
                                id="billing_address"
                                name="billing_address"
                                value={data.billing_address}
                                className={getFieldClassName('billing_address')}
                                onChange={(e) => setData('billing_address', e.target.value)}
                                onFocus={() => handleFocus('billing_address')}
                                onBlur={() => handleBlur('billing_address')}
                                required
                            />
                            <InputError message={touched.billing_address ? uiErrors.billing_address : ''} className="mt-2" />
                            <InputError message={errors.billing_address} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="billing_city" value="Ciutat de facturacio" />
                            <TextInput
                                id="billing_city"
                                name="billing_city"
                                value={data.billing_city}
                                className={getFieldClassName('billing_city')}
                                onChange={(e) => setData('billing_city', e.target.value)}
                                onFocus={() => handleFocus('billing_city')}
                                onBlur={() => handleBlur('billing_city')}
                                required
                            />
                            <InputError message={touched.billing_city ? uiErrors.billing_city : ''} className="mt-2" />
                            <InputError message={errors.billing_city} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="billing_region" value="Provincia de facturacio" />
                            <TextInput
                                id="billing_region"
                                name="billing_region"
                                value={data.billing_region}
                                className={getFieldClassName('billing_region')}
                                onChange={(e) => setData('billing_region', e.target.value)}
                                onFocus={() => handleFocus('billing_region')}
                                onBlur={() => handleBlur('billing_region')}
                                required
                            />
                            <InputError message={touched.billing_region ? uiErrors.billing_region : ''} className="mt-2" />
                            <InputError message={errors.billing_region} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="billing_postal_code" value="Codi postal de facturacio" />
                            <TextInput
                                id="billing_postal_code"
                                name="billing_postal_code"
                                value={data.billing_postal_code}
                                className={getFieldClassName('billing_postal_code')}
                                onChange={(e) => setData('billing_postal_code', e.target.value)}
                                onFocus={() => handleFocus('billing_postal_code')}
                                onBlur={() => handleBlur('billing_postal_code')}
                                required
                            />
                            <InputError message={touched.billing_postal_code ? uiErrors.billing_postal_code : ''} className="mt-2" />
                            <InputError message={errors.billing_postal_code} className="mt-1" />
                        </div>
                    </div>
                )}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="favorite_genre" value="Genere literari preferit" />
                        <select
                            id="favorite_genre"
                            value={data.favorite_genre}
                            onChange={(e) => setData('favorite_genre', e.target.value)}
                            onFocus={() => handleFocus('favorite_genre')}
                            onBlur={() => handleBlur('favorite_genre')}
                            className={getFieldClassName('favorite_genre')}
                            required
                        >
                            <option value="">Selecciona una opcio</option>
                            <option value="Narrativa">Narrativa</option>
                            <option value="Ciencia ficcio">Ciencia ficcio</option>
                            <option value="No ficcio">No ficcio</option>
                            <option value="Infantil i juvenil">Infantil i juvenil</option>
                            <option value="Misteri">Misteri</option>
                        </select>
                        <InputError message={touched.favorite_genre ? uiErrors.favorite_genre : ''} className="mt-2" />
                        <InputError message={errors.favorite_genre} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="reading_language" value="Idioma de lectura preferit" />
                        <select
                            id="reading_language"
                            value={data.reading_language}
                            onChange={(e) => setData('reading_language', e.target.value)}
                            onFocus={() => handleFocus('reading_language')}
                            onBlur={() => handleBlur('reading_language')}
                            className={getFieldClassName('reading_language')}
                            required
                        >
                            <option value="">Selecciona una opcio</option>
                            <option value="Catala">Catala</option>
                            <option value="Castella">Castella</option>
                            <option value="Angles">Angles</option>
                        </select>
                        <InputError message={touched.reading_language ? uiErrors.reading_language : ''} className="mt-2" />
                        <InputError message={errors.reading_language} className="mt-1" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={getFieldClassName('email')}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        required
                    />

                    <InputError message={touched.email ? uiErrors.email : ''} className="mt-2" />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contrasenya" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={getFieldClassName('password')}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        required
                    />

                    <div className="mt-2">
                        <meter min="0" max="4" value={passwordStrength.score} className="h-3 w-full" />
                        <p className="mt-1 text-xs text-stone-600">Fortalesa: {passwordStrength.label} (minim: Mitjana)</p>
                    </div>

                    <InputError message={touched.password ? uiErrors.password : ''} className="mt-2" />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirma la contrasenya"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={getFieldClassName('password_confirmation')}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        onFocus={() => handleFocus('password_confirmation')}
                        onBlur={() => handleBlur('password_confirmation')}
                        required
                    />

                    <InputError
                        message={touched.password_confirmation ? uiErrors.password_confirmation : ''}
                        className="mt-2"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-amber-700 underline hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        Ja tens compte?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing || Object.keys(uiErrors).length > 0}>
                        Registrar-me
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

function toTitleCase(value) {
    return value
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

function parseBirthDate(value) {
    const matched = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!matched) {
        return null;
    }

    const day = Number(matched[1]);
    const month = Number(matched[2]);
    const year = Number(matched[3]);

    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return {
        date,
        display: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(4, '0')}`,
    };
}

function getAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age -= 1;
    }

    return age;
}

function getPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) {
        score += 1;
    }

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        score += 1;
    }

    if (/\d/.test(password)) {
        score += 1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 1;
    }

    if (score <= 1) {
        return { score, label: 'Feble', accepted: false };
    }

    if (score <= 2) {
        return { score, label: 'Mitjana', accepted: true };
    }

    return { score, label: 'Forta', accepted: true };
}

function validateName(value) {
    const normalized = value.trim().replace(/\s+/g, ' ');

    if (!normalized) {
        return 'El nom i cognoms es obligatori.';
    }

    const parts = normalized.split(' ');

    if (parts.length < 2 || parts.length > 4) {
        return 'Introdueix entre 1 nom + 1 cognom i 2 noms + 2 cognoms.';
    }

    const validParts = parts.every((part) => /^[A-Za-zÀ-ÿ'’-]+$/.test(part));

    if (!validParts) {
        return 'Nom i cognoms sense numeros ni caracters especials.';
    }

    return null;
}

function validateAddress(value) {
    const validPattern = /^(?=.*\d)(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ0-9\s,.'/-]{6,190}$/;

    if (!validPattern.test(value.trim())) {
        return 'Introdueix una adreça valida.';
    }

    return null;
}

function validateForm(data, passwordStrength) {
    const nextErrors = {};

    const nameError = validateName(data.name);

    if (nameError) {
        nextErrors.name = nameError;
    }

    const parsedBirthDate = parseBirthDate(data.birth_date);

    if (!parsedBirthDate) {
        nextErrors.birth_date = 'Format de data invalid. Usa DD/MM/YYYY.';
    } else {
        const age = getAge(parsedBirthDate.date);

        if (age < 18 || age > 100) {
            nextErrors.birth_date = 'Has de tenir entre 18 i 100 anys.';
        } else {
            const normalizedDisplay = parsedBirthDate.display;

            if (normalizedDisplay !== data.birth_date) {
                nextErrors.birth_date = 'La data ha de tenir format DD/MM/YYYY (amb zeros).';
            }
        }
    }

    if (!/^\+[1-9]\d{7,14}$/.test(data.phone.trim())) {
        nextErrors.phone = 'Telefon invalid. Exemple: +34600111222';
    }

    const shippingAddressError = validateAddress(data.shipping_address);

    if (shippingAddressError) {
        nextErrors.shipping_address = shippingAddressError;
    }

    if (!data.shipping_city.trim()) {
        nextErrors.shipping_city = 'La ciutat d\'enviament es obligatoria.';
    }

    if (!data.shipping_region.trim()) {
        nextErrors.shipping_region = 'La provincia d\'enviament es obligatoria.';
    }

    if (!/^\d{4,10}$/.test(data.shipping_postal_code.trim())) {
        nextErrors.shipping_postal_code = 'Codi postal d\'enviament invalid.';
    }

    if (!data.billing_same_as_shipping) {
        const billingAddressError = validateAddress(data.billing_address);

        if (billingAddressError) {
            nextErrors.billing_address = billingAddressError;
        }

        if (!data.billing_city.trim()) {
            nextErrors.billing_city = 'La ciutat de facturacio es obligatoria.';
        }

        if (!data.billing_region.trim()) {
            nextErrors.billing_region = 'La provincia de facturacio es obligatoria.';
        }

        if (!/^\d{4,10}$/.test(data.billing_postal_code.trim())) {
            nextErrors.billing_postal_code = 'Codi postal de facturacio invalid.';
        }
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
        nextErrors.email = 'Email invalid.';
    }

    if (!data.favorite_genre) {
        nextErrors.favorite_genre = 'Selecciona un genere preferit.';
    }

    if (!data.reading_language) {
        nextErrors.reading_language = 'Selecciona un idioma de lectura.';
    }

    if (!passwordStrength.accepted) {
        nextErrors.password = 'La contrasenya ha de tenir fortalesa minima mitjana.';
    }

    if (data.password !== data.password_confirmation) {
        nextErrors.password_confirmation = 'Les contrasenyes no coincideixen.';
    }

    return nextErrors;
}
