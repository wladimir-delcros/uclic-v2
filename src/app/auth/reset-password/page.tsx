import type { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  description: 'Réinitialisation du mot de passe pour l\'espace membre Uclic.',
  alternates: { canonical: '/auth/reset-password' },
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
