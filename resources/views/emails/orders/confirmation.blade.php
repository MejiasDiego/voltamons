<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmacio de comanda</title>
</head>
<body style="font-family: Arial, sans-serif; color: #2c2a26;">
    <h1 style="margin-bottom: 8px;">Gracies per la teva compra a Voltamons</h1>
    <p style="margin-top: 0;">Comanda <strong>{{ $order->order_number }}</strong> confirmada.</p>

    <h2>Resum</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%; max-width: 680px;">
        <thead>
            <tr>
                <th align="left">Llibre</th>
                <th align="right">Preu unitari</th>
                <th align="right">Quantitat</th>
                <th align="right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
                <tr>
                    <td>{{ $item->title_snapshot }}</td>
                    <td align="right">{{ number_format((float) $item->unit_price, 2) }} EUR</td>
                    <td align="right">{{ $item->quantity }}</td>
                    <td align="right">{{ number_format((float) $item->line_total, 2) }} EUR</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p style="margin-top: 16px;"><strong>Total:</strong> {{ number_format((float) $order->total_amount, 2) }} EUR</p>
    <p>Et pots descarregar la factura des del teu historial de comandes.</p>
</body>
</html>
