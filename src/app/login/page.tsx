import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Connexion',
  description: "Connectez-vous à votre espace membre Uclic pour accéder aux workflows, agents IA partagés et ressources réservées au collectif.",
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
