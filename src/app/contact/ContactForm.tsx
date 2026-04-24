'use client';

import emailjs from '@emailjs/browser';
import { ArrowRight, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { trackGenerateLead } from '@/lib/datalayer';

// Init EmailJS (same creds as V1 — public key is safe client-side by EmailJS design)
const EMAILJS_PUBLIC_KEY = 'sNJezWZbNlGM1x_Pe';
const EMAILJS_SERVICE_ID = 'service_8tp0bod';
const EMAILJS_TEMPLATE_ID = 'template_jkryos1';

emailjs.init(EMAILJS_PUBLIC_KEY);

// Normalise un numero FR en format +33XXXXXXXXX
function normalizeToE164FR(input: string): string {
  if (!input) {return '';}
  const only = input.replace(/\s+/g, '');
  if (only.startsWith('+')) {return only;}
  const digits = input.replace(/\D/g, '');
  const withoutLeadingZero = digits.startsWith('0') ? digits.slice(1) : digits;
  return `+33${withoutLeadingZero}`;
}

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FieldErrors = {};
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const message = (formData.get('message') as string) || '';

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }
    if (!phone || phone.trim().length === 0) {
      newErrors.phone = 'Veuillez entrer votre numéro de téléphone';
    } else {
      const phoneClean = normalizeToE164FR(phone.trim());
      if (!/^\+?[0-9]{9,15}$/.test(phoneClean)) {
        newErrors.phone = 'Veuillez entrer un numéro de téléphone valide';
      }
    }
    const trimmedMessage = message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const phone = normalizeToE164FR((formData.get('phone') as string) || '') || 'N/A';
    const message = formData.get('message') as string;

    try {
      const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        email,
        message,
        phone,
      });

      if (result.text === 'OK') {
        // Fire GA4 + Google Ads conversions + Meta Pixel Lead
        try {
          trackGenerateLead({ source: 'contact', email });
        } catch (err) {
          console.warn('trackGenerateLead failed', err);
        }

        setSubmitStatus('success');
        formRef.current?.reset();
        setErrors({});

        router.push(`/merci?source=contact&email=${encodeURIComponent(email)}`);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 text-[14px] bg-[color:var(--surface-raised)] border border-[color:var(--border-subtle)] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)]/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:border-[color:var(--accent)]/60';
  const inputError =
    'border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/30';
  const labelCls =
    'block text-[13px] font-medium text-[color:var(--ink-muted)] mb-2';

  return (
    <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 lg:p-9">
      {!isClient && <div className="min-h-[560px]" aria-hidden="true" />}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
        id="contact-form"
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore
        data-form-type="other"
        suppressHydrationWarning
        style={{ display: isClient ? undefined : 'none' }}
        noValidate
      >
        <div>
          <label htmlFor="name" className={labelCls}>
            Nom complet <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            inputMode="text"
            spellCheck={false}
            data-lpignore="true"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${inputBase} !rounded-none ${errors.name ? inputError : ''}`}
            placeholder="Prénom Nom"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[12px] text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className={labelCls}>
              Email <span className="text-[color:var(--accent)]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              inputMode="email"
              spellCheck={false}
              data-lpignore="true"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${inputBase} !rounded-none ${errors.email ? inputError : ''}`}
              placeholder="vous@entreprise.fr"
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-[12px] text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelCls}>
              Téléphone <span className="text-[color:var(--accent)]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="off"
              inputMode="tel"
              spellCheck={false}
              data-lpignore="true"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`${inputBase} !rounded-none ${errors.phone ? inputError : ''}`}
              placeholder="+33 6 12 34 56 78"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-[12px] text-red-500">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelCls}>
            Votre message <span className="text-[color:var(--accent)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            autoComplete="off"
            spellCheck={false}
            data-lpignore="true"
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputBase} !rounded-none resize-y ${errors.message ? inputError : ''}`}
            placeholder="Votre contexte : taille d'équipe, stack, objectif principal (Inbound, Outbound, IA & Dev), échéances."
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-[12px] text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center gap-2 w-full md:w-auto bg-[color:var(--accent)] text-[color:var(--accent-ink)] font-semibold text-[14px] px-7 py-3.5 rounded-full hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--accent-ink)]/30 border-t-[color:var(--accent-ink)]" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={16} strokeWidth={2} />
                Envoyer le message
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </div>

        {submitStatus === 'success' && (
          <p
            role="status"
            aria-live="polite"
            className="text-[13px] text-[color:var(--accent)] border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-4 py-3"
          >
            Message envoyé. Redirection en cours...
          </p>
        )}
        {submitStatus === 'error' && (
          <p
            role="alert"
            aria-live="assertive"
            className="text-[13px] text-red-400 border border-red-500/30 bg-red-500/5 px-4 py-3"
          >
            Une erreur est survenue. Merci de réessayer ou d&apos;écrire directement à{' '}
            <a href="mailto:hello@uclic.fr" className="underline">
              hello@uclic.fr
            </a>
            .
          </p>
        )}

        <p className="text-[12px] text-[color:var(--ink-muted)] leading-relaxed">
          En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
          Réponse garantie sous 24h ouvrées.
        </p>
      </form>
    </div>
  );
}
