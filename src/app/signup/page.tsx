import type { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: "Créez votre compte membre Uclic pour accéder aux workflows n8n, agents IA partagés, ressources growth et au Slack du collectif.",
  alternates: { canonical: '/signup' },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <SignupClient />;
}
