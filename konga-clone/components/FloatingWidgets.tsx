'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, MessageSquareText, MessagesSquare, Send, X } from 'lucide-react';

export default function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [bubble, setBubble] = useState(true);
  const [chat, setChat] = useState(false);
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: 'Hi there! Thanks for stopping by. How can I help you today?' },
  ]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Feedback tab */}
      <a
        href="#"
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-1 rounded-l-md bg-konga px-1.5 py-3 text-[12px] font-semibold text-white [writing-mode:vertical-rl] md:flex"
      >
        <MessageSquareText size={14} className="rotate-90" /> Feedback
      </a>

      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[104px] right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border-2 border-konga bg-white text-[#333] shadow md:right-7"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {bubble && !chat && (
        <div className="fixed bottom-7 right-[92px] z-30 hidden max-w-[290px] rounded-lg bg-white px-4 py-3 text-[14px] leading-6 text-[#333] shadow-lift md:block">
          <button
            aria-label="Dismiss"
            onClick={() => setBubble(false)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#666] shadow"
          >
            <X size={12} />
          </button>
          Hi there! Thanks for stopping by. How can I help you today?
        </div>
      )}

      {chat && (
        <div className="fixed bottom-24 right-4 z-40 flex h-[420px] w-[330px] flex-col overflow-hidden rounded-xl bg-white shadow-lift md:right-7">
          <div className="flex items-center justify-between bg-konga px-4 py-3 text-white">
            <div>
              <p className="text-[14px] font-semibold">Konga Support</p>
              <p className="text-[11px] opacity-85">Typically replies in a few minutes</p>
            </div>
            <button aria-label="Close chat" onClick={() => setChat(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-[#F7F7F7] p-3">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] ${m.me ? 'ml-auto bg-konga text-white' : 'bg-white text-[#333] shadow-card'}`}
              >
                {m.text}
              </p>
            ))}
          </div>
          <form
            className="flex border-t border-konga-line"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setMsgs((m) => [
                ...m,
                { me: true, text: draft.trim() },
                { me: false, text: 'Thanks! An agent will join this chat shortly. (Demo)' },
              ]);
              setDraft('');
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-3 text-[13px] outline-none"
            />
            <button className="px-3 text-konga" aria-label="Send">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        aria-label="Chat with us"
        onClick={() => {
          setChat((v) => !v);
          setBubble(false);
        }}
        className="fixed bottom-6 right-4 z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#F0396E] text-white shadow-lift md:right-6"
      >
        {chat ? <X size={26} /> : <MessagesSquare size={28} />}
      </button>
    </>
  );
}
