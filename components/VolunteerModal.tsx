"use client";

import { X } from "lucide-react";

export default function VolunteerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: yahan form data ko apne backend/API/Google Sheet mein bhejo
    console.log("Volunteer form submitted");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-lg bg-[#EBECF3] p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-gray-700 hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-4xl font-bold leading-tight text-[#2F2B36]">
          Register as a volunteer
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-gray-700">First name *</label>
            <input
              required
              type="text"
              placeholder="First name"
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Last name *</label>
            <input
              required
              type="text"
              placeholder="Last name"
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone *</label>
            <input
              required
              type="tel"
              placeholder="Phone"
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Vidhan Sabha *</label>
            <input
              required
              type="text"
              placeholder="Vidhan Sabha"
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Mandal, Village *</label>
            <input
              required
              type="text"
              placeholder="Mandal, Village"
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Message</label>
            <textarea
              placeholder="Message"
              rows={3}
              className="mt-1 w-full rounded bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              className="rounded-full bg-[#EA8023] px-6 py-2.5 text-sm font-medium text-white active:scale-95"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}