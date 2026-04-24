'use client';

import { useEffect, useState } from 'react';
import { createClient, createAuthClient } from '@/lib/supabase/client';

type ProfileForm = {
  full_name: string;
  company: string;
  role: string;
  phone: string;
  sector: string;
  team_size: string;
  use_cases: string;
};

type Props = {
  initialEmail: string;
  userId: string;
};

const emptyForm: ProfileForm = {
  full_name: '',
  company: '',
  role: '',
  phone: '',
  sector: '',
  team_size: '',
  use_cases: '',
};

export default function ProfilEditForm({ initialEmail, userId }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('full_name, company, role, phone, sector, team_size, use_cases')
        .eq('user_id', userId)
        .maybeSingle();

      if (data) {
        setForm({
          full_name: data.full_name ?? '',
          company: data.company ?? '',
          role: data.role ?? '',
          phone: data.phone ?? '',
          sector: data.sector ?? '',
          team_size: data.team_size ?? '',
          use_cases: Array.isArray(data.use_cases)
            ? (data.use_cases as string[]).join(', ')
            : (data.use_cases ?? ''),
        });
      }
      setLoading(false);
    };
    load();
  }, [userId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      // Ensure the session is fresh before writing.
      const authClient = createAuthClient();
      const {
        data: { user },
      } = await authClient.auth.getUser();
      if (!user) {
        setError('Session expirée. Reconnectez-vous.');
        setSaving(false);
        return;
      }

      const supabase = createClient();
      const payload = {
        user_id: user.id,
        full_name: form.full_name || null,
        company: form.company || null,
        role: form.role || null,
        phone: form.phone || null,
        sector: form.sector || null,
        team_size: form.team_size || null,
        use_cases: form.use_cases
          ? form.use_cases.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
      };

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'user_id' });

      if (upsertError) {
        setError(upsertError.message);
      } else {
        setSaved(true);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur à l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[14px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors';
  const labelClass = 'block text-[13px] font-medium text-[color:var(--ink)] mb-2';

  if (loading) {
    return (
      <div
        className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8 max-w-[720px] animate-pulse"
        aria-busy="true"
      >
        <div className="h-4 w-40 bg-[color:var(--border-subtle)] rounded mb-4" />
        <div className="h-10 w-full bg-[color:var(--border-subtle)] rounded mb-4" />
        <div className="h-10 w-full bg-[color:var(--border-subtle)] rounded" />
      </div>
    );
  }

  return (
    <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8 max-w-[720px]">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="email">
            Email (connexion)
          </label>
          <input
            id="email"
            type="email"
            value={initialEmail}
            disabled
            className={`${inputClass} opacity-70 cursor-not-allowed`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="full_name">
            Nom complet
          </label>
          <input
            id="full_name"
            className={inputClass}
            placeholder="Nom complet"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            Entreprise
          </label>
          <input
            id="company"
            className={inputClass}
            placeholder="Entreprise"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="role">
            Rôle
          </label>
          <input
            id="role"
            className={inputClass}
            placeholder="Rôle"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Téléphone
          </label>
          <input
            id="phone"
            className={inputClass}
            placeholder="Téléphone (optionnel)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="sector">
            Secteur
          </label>
          <input
            id="sector"
            className={inputClass}
            placeholder="Secteur"
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="team_size">
            Taille d’équipe
          </label>
          <input
            id="team_size"
            className={inputClass}
            placeholder="Taille d'équipe"
            value={form.team_size}
            onChange={(e) => setForm({ ...form, team_size: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="use_cases">
            Cas d’usage (séparés par des virgules)
          </label>
          <input
            id="use_cases"
            className={inputClass}
            placeholder="ex. Inbound, SEO, Automation"
            value={form.use_cases}
            onChange={(e) => setForm({ ...form, use_cases: e.target.value })}
          />
        </div>

        {error ? (
          <p className="md:col-span-2 text-[13px] text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2 flex items-center gap-4 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 h-11 text-[13px] font-semibold text-black light:text-white hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:
                'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
            }}
          >
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          {saved ? (
            <span className="text-[13px] text-[color:var(--accent)]">Profil enregistré.</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
