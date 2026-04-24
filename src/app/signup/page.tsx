import type { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Création d\'un compte membre Uclic pour accéder aux workflows et ressources.',
  alternates: { canonical: '/signup' },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <SignupClient />;
}
