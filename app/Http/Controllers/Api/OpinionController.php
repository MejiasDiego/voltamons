<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Opinion;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class OpinionController extends Controller
{
    public function getOpinions(Request $request, int $idProducte): JsonResponse
    {
        $bdError = $this->validateBdQuery($request);

        if ($bdError) {
            return $bdError;
        }

        $book = Book::query()->find($idProducte);

        if (! $book) {
            return $this->errorResponse('404', 'No s\'han trobat opinions pel producte especificat.', "L'identificador del producte (idProducte: {$idProducte}) no te opinions disponibles.", 404);
        }

        $query = Opinion::query()->where('book_id', $book->id)->latest()->limit(10);

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->string('from_date')->toString());
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->string('to_date')->toString());
        }

        $opinions = $query->get();

        if ($opinions->isEmpty()) {
            return $this->errorResponse('404', 'No s\'han trobat opinions pel producte especificat.', "L'identificador del producte (idProducte: {$idProducte}) no te opinions disponibles.", 404);
        }

        return response()->json($this->buildProductResponse($book->id, $opinions));
    }

    public function getAllOpinions(Request $request): JsonResponse
    {
        $bdError = $this->validateBdQuery($request);

        if ($bdError) {
            return $bdError;
        }

        $allProductIds = Opinion::query()
            ->select('book_id')
            ->distinct()
            ->pluck('book_id');

        if ($allProductIds->isEmpty()) {
            return $this->errorResponse('404', 'No s\'han trobat opinions', null, 404);
        }

        $responses = [];

        foreach ($allProductIds as $bookId) {
            $opinions = Opinion::query()->where('book_id', $bookId)->latest()->limit(10)->get();
            $responses[] = $this->buildProductResponse((int) $bookId, $opinions);
        }

        return response()->json($responses);
    }

    public function getRating(Request $request): JsonResponse
    {
        $bdError = $this->validateBdQuery($request);

        if ($bdError) {
            return $bdError;
        }

        $groups = Opinion::query()
            ->selectRaw('book_id, COUNT(*) as total_opinions, AVG(rating) as avg_rating')
            ->groupBy('book_id')
            ->get();

        if ($groups->isEmpty()) {
            return $this->errorResponse('404', 'No s\'han trobat opinions', null, 404);
        }

        $globalAverage = (float) $groups->avg('avg_rating');
        $minimumVotes = 2;

        $scored = $groups->map(function ($row) use ($globalAverage, $minimumVotes) {
            $votes = (int) $row->total_opinions;
            $average = (float) $row->avg_rating;

            $weighted = (($votes / ($votes + $minimumVotes)) * $average)
                + (($minimumVotes / ($votes + $minimumVotes)) * $globalAverage);

            return [
                'book_id' => (int) $row->book_id,
                'weighted' => round($weighted, 4),
            ];
        })->sortByDesc('weighted')->take(10)->values();

        $result = [];

        foreach ($scored as $row) {
            $opinions = Opinion::query()->where('book_id', $row['book_id'])->latest()->limit(10)->get();
            $product = $this->buildProductResponse($row['book_id'], $opinions);

            unset($product['opinions']);
            $result[] = $product;
        }

        return response()->json($result);
    }

    public function sendOpinion(Request $request): JsonResponse
    {
        $bdError = $this->validateBdQuery($request);

        if ($bdError) {
            return $bdError;
        }

        $user = $request->user();

        if (! $user) {
            return $this->errorResponse('401', 'Acces no autoritzat. Verifiqui la seva API key.', null, 401);
        }

        $validated = $request->validate([
            'idProduct' => ['required', 'integer', 'exists:books,id'],
            'idUser' => ['nullable', 'string'],
            'user' => ['nullable', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'title' => ['required', 'string', 'min:2', 'max:180'],
            'text' => ['required', 'string', 'min:5', 'max:1000'],
        ]);

        $bookId = (int) $validated['idProduct'];

        $pendingItemQuery = OrderItem::query()
            ->whereHas('order', fn ($query) => $query->where('user_id', $user->id))
            ->where('book_id', $bookId)
            ->where('has_to_comment', true);

        $pendingItem = $pendingItemQuery->latest('id')->first();

        if (! $pendingItem) {
            return $this->errorResponse('400', 'La peticio conte errors de format o falta algun camp obligatori.', 'No hi ha cap compra pendent per comentar aquest producte.', 400);
        }

        Opinion::query()->create([
            'book_id' => $bookId,
            'order_item_id' => $pendingItem->id,
            'id_user' => $user->id,
            'user_name' => $validated['user'] ?: $user->name,
            'rating' => $validated['rating'],
            'title' => $validated['title'],
            'comment' => $validated['text'],
        ]);

        $pendingItem->update(['has_to_comment' => false]);

        return response()->json([
            'message' => 'Opinio afegida correctament',
            'timestamp' => now()->toDateTimeString(),
        ]);
    }

    private function buildProductResponse(int $bookId, Collection $opinions): array
    {
        $ratings = [0, 0, 0, 0, 0];

        foreach ($opinions as $opinion) {
            $ratingIndex = max(1, min(5, (int) $opinion->rating)) - 1;
            $ratings[$ratingIndex] += 1;
        }

        return [
            'idProducte' => $bookId,
            'date' => now()->toDateTimeString(),
            'totalOpinions' => $opinions->count(),
            'ratings' => $ratings,
            'opinions' => $opinions->map(function (Opinion $opinion) {
                return [
                    'opinionId' => (string) $opinion->id,
                    'idUser' => $opinion->id_user,
                    'user' => $opinion->user_name,
                    'timeStamp' => $opinion->created_at?->toDateTimeString(),
                    'rating' => (int) $opinion->rating,
                    'title' => $opinion->title,
                    'opinion' => $opinion->comment,
                ];
            })->values()->all(),
        ];
    }

    private function validateBdQuery(Request $request): ?JsonResponse
    {
        $bd = $request->query('bd');

        if ($bd === null || $bd === '') {
            return null;
        }

        $valid = in_array($bd, ['jdbc', 'jpa', 'mongodb'], true);

        if ($valid) {
            return null;
        }

        return $this->errorResponse('400', 'La peticio conte errors de format o falta algun camp obligatori.', "El camp 'bd' informat no es valid", 400);
    }

    private function errorResponse(string $code, string $message, ?string $reason, int $status): JsonResponse
    {
        return response()->json([
            'error' => [
                'code' => $code,
                'message' => $message,
                'reason' => $reason,
                'timestamp' => now()->toDateTimeString(),
            ],
        ], $status);
    }
}
