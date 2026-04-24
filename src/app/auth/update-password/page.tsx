import type { Metadata } from 'next';
import UpdatePasswordClient from './UpdatePasswordClient';

export const metadata: Metadata = {
  title: 'Nouveau mot de passe',
  description: 'Mise à jour du mot de passe de l\'espace membre Uclic.',
  alternates: { canonical: '/auth/update-password' },
  robots: { index: false, follow: false },
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordClient />;
}
