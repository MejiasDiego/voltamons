<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['required', 'string', 'max:30'],

            'shipping_address' => ['required', 'string', 'max:190'],
            'shipping_city' => ['required', 'string', 'max:120'],
            'shipping_region' => ['required', 'string', 'max:120'],
            'shipping_postal_code' => ['required', 'string', 'max:20'],

            'billing_same_as_shipping' => ['required', 'boolean'],
            'billing_full_name' => ['nullable', 'string', 'max:150'],
            'billing_address' => ['nullable', 'string', 'max:190'],
            'billing_city' => ['nullable', 'string', 'max:120'],
            'billing_region' => ['nullable', 'string', 'max:120'],
            'billing_postal_code' => ['nullable', 'string', 'max:20'],

            'card_number' => ['required', 'digits_between:13,19'],
            'card_expiry' => ['required', 'regex:/^(0[1-9]|1[0-2])\/[0-9]{2}$/'],
            'card_cvv' => ['required', 'digits_between:3,4'],

            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['required', 'integer', 'exists:books,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}
