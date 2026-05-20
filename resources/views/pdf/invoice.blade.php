<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>Factura {{ $order->order_number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #2c2a26; font-size: 12px; }
        h1, h2 { margin: 0 0 8px 0; }
        .muted { color: #6b6860; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #d9c9b2; padding: 8px; }
        th { background: #f5ead9; }
        .right { text-align: right; }
        .section { margin-top: 18px; }
    </style>
</head>
<body>
    <h1>Voltamons</h1>
    <p class="muted">Factura de comanda {{ $order->order_number }}</p>
    <p class="muted">Data: {{ $order->created_at->format('d/m/Y H:i') }}</p>

    <div class="section">
        <h2>Dades client</h2>
        <p>{{ $order->full_name }}<br>{{ $order->email }}<br>{{ $order->phone }}</p>
    </div>

    <div class="section">
        <h2>Adreça d'enviament</h2>
        <p>
            {{ $order->shipping_address }}<br>
            {{ $order->shipping_postal_code }} {{ $order->shipping_city }}<br>
            {{ $order->shipping_region }}
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Llibre</th>
                <th class="right">Preu</th>
                <th class="right">Qty</th>
                <th class="right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
                <tr>
                    <td>{{ $item->title_snapshot }}</td>
                    <td class="right">{{ number_format((float) $item->unit_price, 2) }} EUR</td>
                    <td class="right">{{ $item->quantity }}</td>
                    <td class="right">{{ number_format((float) $item->line_total, 2) }} EUR</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="section">
        <p class="right">Subtotal: {{ number_format((float) $order->subtotal, 2) }} EUR</p>
        <p class="right">IVA: {{ number_format((float) $order->tax_amount, 2) }} EUR</p>
        <p class="right">Enviament: {{ number_format((float) $order->shipping_amount, 2) }} EUR</p>
        <p class="right"><strong>Total: {{ number_format((float) $order->total_amount, 2) }} EUR</strong></p>
    </div>
</body>
</html>
