export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/254700000000"
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 rounded-full bg-daltar-chat px-5 py-2.5 text-[13.5px] font-bold text-daltar-chat-text shadow-lg transition hover:scale-[1.03]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      WhatsApp
    </a>
  );
}
