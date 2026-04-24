import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Globe, Mail } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  fetchAllTeamMembers,
  getTeamMemberBySlug,
  type TeamMember,
} from '@/lib/team';

const SITE_URL = 'https://uclic.fr';
const DEFAULT_AVATAR = '/images/default-profile.jpg';

// SSG pur : 4 membres connus, pas d'ISR
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = await fetchAllTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

function buildDescription(member: TeamMember): string {
  const extrait = member.equipeFields.extrait?.trim();
  if (extrait) return extrait;
  const role = member.equipeFields.role || 'Expert Growth';
  return `${member.title}, ${role} chez Uclic. Expert growth marketing et stratégies data-driven pour accélérer la croissance des entreprises.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return {
      title: 'Membre introuvable | Uclic',
      description: "Le membre de l'équipe recherché est introuvable.",
      robots: { index: false, follow: false },
    };
  }

  const description = buildDescription(member);
  const title = `${member.title} — ${member.equipeFields.role || 'Expert Growth'} | Uclic`;
  const canonical = `/equipe/${member.slug}`;
  const avatar = member.equipeFields.image?.node.sourceUrl || DEFAULT_AVATAR;

  return {
    title,
    description,
    keywords: [
      'équipe',
      'expert',
      'consultant',
      'growth marketing',
      'intelligence artificielle',
      member.title,
      'Uclic',
    ],
    alternates: { canonical },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: avatar, width: 1200, height: 630, alt: member.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
      creator: '@uclic_fr',
      images: [{ url: avatar, alt: member.title }],
    },
  };
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [member, allMembers] = await Promise.all([
    getTeamMemberBySlug(slug),
    fetchAllTeamMembers(),
  ]);

  if (!member) {
    notFound();
  }

  const description = buildDescription(member);
  const avatar = member.equipeFields.image?.node.sourceUrl || DEFAULT_AVATAR;

  const currentIdx = allMembers.findIndex((m) => m.slug === member.slug);
  const next =
    currentIdx >= 0 && allMembers.length > 1
      ? allMembers[(currentIdx + 1) % allMembers.length]
      : null;

  const sameAs = [
    member.equipeFields.linkedin,
    member.equipeFields.twitter,
    member.equipeFields.autre,
  ].filter((v): v is string => !!v);

  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.title,
    description,
    url: `${SITE_URL}/equipe/${member.slug}`,
    image: avatar,
    jobTitle: member.equipeFields.role || 'Expert',
    worksFor: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
    },
  };
  if (sameAs.length > 0) personSchema.sameAs = sameAs;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Équipe', item: `${SITE_URL}/equipe` },
      {
        '@type': 'ListItem',
        position: 3,
        name: member.title,
        item: `${SITE_URL}/equipe/${member.slug}`,
      },
    ],
  };

  const hasBio = !!member.content && member.content.trim().length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)] focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-12 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative">
            <a
              href="/equipe"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Toute l&apos;équipe
            </a>

            <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Équipe Uclic
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
              <div className="relative aspect-square w-[200px] lg:w-[220px] overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt={member.equipeFields.image?.node.altText || member.title}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-[clamp(32px,4.4vw,52px)] font-display font-medium tracking-[-0.02em] leading-[1.1]">
                  {member.title}
                </h1>
                {member.equipeFields.role && (
                  <div className="mt-3 text-[14px] text-[color:var(--ink-muted)] uppercase tracking-[0.14em]">
                    {member.equipeFields.role}
                  </div>
                )}
                {member.equipeFields.extrait && (
                  <p className="mt-5 text-[color:var(--ink-muted)] max-w-[680px] text-[16px] leading-relaxed">
                    {member.equipeFields.extrait}
                  </p>
                )}

                {sameAs.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {member.equipeFields.linkedin && (
                      <a
                        href={member.equipeFields.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${member.title}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-mono uppercase tracking-[0.14em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/60 transition-colors"
                      >
                        <span aria-hidden className="inline-block w-[13px] h-[13px] leading-none">in</span>
                        LinkedIn
                      </a>
                    )}
                    {member.equipeFields.twitter && (
                      <a
                        href={member.equipeFields.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Twitter de ${member.title}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-mono uppercase tracking-[0.14em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/60 transition-colors"
                      >
                        <span aria-hidden className="inline-block w-[13px] h-[13px] leading-none">X</span>
                        Twitter
                      </a>
                    )}
                    {member.equipeFields.autre && (
                      <a
                        href={member.equipeFields.autre}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Site de ${member.title}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-mono uppercase tracking-[0.14em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/60 transition-colors"
                      >
                        <Globe size={13} /> Web
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" /> Parcours
                </div>
                <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                  Le parcours de {member.title.split(' ')[0]}
                </h2>
                {hasBio ? (
                  <div
                    className="mt-5 wp-content text-[15.5px] text-[color:var(--ink)]/90 leading-[1.75] [&_p]:mt-4 [&_p:first-child]:mt-0 [&_a]:text-[color:var(--accent)] [&_a]:underline [&_h2]:mt-8 [&_h2]:text-[20px] [&_h2]:font-display [&_h2]:font-medium [&_h3]:mt-6 [&_h3]:text-[17px] [&_h3]:font-display [&_h3]:font-medium [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1"
                    dangerouslySetInnerHTML={{ __html: member.content }}
                  />
                ) : (
                  <p className="mt-5 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7]">
                    {description}
                  </p>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" /> Contact
                </div>
                <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                  Travailler avec {member.title.split(' ')[0]}
                </h2>
                <p className="mt-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7]">
                  Besoin d&apos;un cadrage ou d&apos;un audit ? On part des leviers qui comptent — pas d&apos;une pitch deck générique.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/audit"
                    className="inline-flex items-center gap-2 px-5 py-3 text-[13px] font-mono uppercase tracking-[0.16em] bg-[color:var(--accent)] text-[color:var(--accent-ink)] !rounded-none hover:gap-3 transition-all"
                  >
                    Demander un audit
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 text-[13px] font-mono uppercase tracking-[0.16em] border border-[color:var(--border-subtle)] text-[color:var(--ink)] !rounded-none hover:border-[color:var(--accent)]/60 hover:text-[color:var(--accent)] transition-colors"
                  >
                    <Mail size={14} />
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>

            {/* Aside */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Membre
                  </div>
                  <div className="mt-2 text-[22px] font-display font-medium tracking-[-0.01em]">
                    {member.title}
                  </div>
                  {member.equipeFields.role && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Rôle
                      </div>
                      <div className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">
                        {member.equipeFields.role}
                      </div>
                    </>
                  )}
                  <a
                    href="/audit"
                    className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Faire auditer mon acquisition
                    <ArrowRight size={14} />
                  </a>
                </div>

                {next && next.slug !== member.slug && (
                  <a
                    href={`/equipe/${next.slug}`}
                    className="group !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 transition-colors hover:border-[color:var(--accent)]/60"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                      Membre suivant
                    </div>
                    <div className="mt-2 text-[16px] font-display font-medium tracking-[-0.01em] leading-snug">
                      {next.title}
                    </div>
                    {next.equipeFields.role && (
                      <div className="mt-1 text-[12px] text-[color:var(--ink-muted)] uppercase tracking-[0.12em]">
                        {next.equipeFields.role}
                      </div>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all">
                      Voir
                      <ArrowRight size={13} />
                    </span>
                  </a>
                )}
              </div>
            </aside>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
