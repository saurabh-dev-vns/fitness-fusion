import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { ContactField } from './ContactField';
import { contactContent } from './contactContent';

type Status = 'idle' | 'sending' | 'sent';

const SUCCESS_VISIBLE_MS = 4000;

interface ContactFormProps {
  /** Called once a message has been sent successfully. */
  onSent?: () => void;
}

export function ContactForm({ onSent }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const { fields, submit, sending, sent, success } = contactContent.form;

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // grab before the await
    setStatus('sending');

    // TODO: replace with the real request, e.g.
    //   await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
    await new Promise((resolve) => setTimeout(resolve, 600));

    form.reset();
    setStatus('sent');
    onSent?.();

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), SUCCESS_VISIBLE_MS);
  };

  const label = status === 'sending' ? sending : status === 'sent' ? sent : submit;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <ContactField key={field.id} {...field} />
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-ink text-page py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{label}</span>
        {status === 'sent' ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
      </motion.button>

      <p role="status" aria-live="polite" className="text-sm text-mute min-h-[1.25rem]">
        {status === 'sent' ? success : ''}
      </p>
    </form>
  );
}
