import type { Metadata } from 'next';
import AuthCallbackClient from './AuthCallbackClient';

export const metadata: Metadata = {
  title: 'Connexion en cours',
  description: "Finalisation de l'authentification Uclic.",
  alternates: { canonical: '/auth/callback' },
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <AuthCallbackClient />;
}
