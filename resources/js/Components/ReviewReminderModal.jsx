import { Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function ReviewReminderModal({ show, onClose, onDecision, reminder }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-stone-900">Recordatori de ressenya</h2>
                <p className="mt-2 text-sm text-stone-700">
                    Has comprat <strong>{reminder?.bookTitle}</strong>. Vols deixar una opinió?
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => onDecision('comment')}
                        className="rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900"
                    >
                        Fer comentari
                    </button>
                    <button
                        type="button"
                        onClick={() => onDecision('skip')}
                        className="rounded-md border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                    >
                        No fer-lo
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm font-semibold text-stone-600 hover:text-stone-800"
                    >
                        Cancel·lar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
