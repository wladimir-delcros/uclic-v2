/**
 * FAQ extraction + JSON-LD generation for SEO rich results.
 *
 * Pipeline :
 *  1. extractFAQsFromContent(html) — parse l’HTML d’un article / page CMS,
 *     identifie les paires Q/R via patterns (h2/h3 finissant par “?”, ou <strong>?</strong>).
 *  2. generateFAQPageSchema(faqs) — emit le JSON-LD FAQPage.
 *
 * Inspiré de V1 (`src/lib/jsonld-utils.ts`) — adapté pour App Router V2.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

const MAX_FAQS = 10;
const MAX_ANSWER_LEN = 500;
const MIN_ANSWER_LEN = 20;

/**
 * Extract FAQ pairs from raw HTML content.
 * Patterns supportés :
 *  - <h2|h3>...?<\/h2|h3> suivi du prochain <p|div>
 *  - <strong|b>...?<\/strong|b> suivi du prochain <p>
 */
export function extractFAQsFromContent(content: string): FAQItem[] {
  if (!content) {return [];}

  const faqs: FAQItem[] = [];
  const seen = new Set<string>();

  const pushIfValid = (question: string, rawAnswer: string) => {
    const q = question.trim();
    if (!q || seen.has(q)) {return;}
    const answer = rawAnswer
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_ANSWER_LEN);
    if (answer.length < MIN_ANSWER_LEN) {return;}
    faqs.push({ question: q, answer });
    seen.add(q);
  };

  // Pattern 1 : <h2|h3>question?</h2|h3>
  const headingPattern = /<(h2|h3)[^>]*>([\s\S]*?\?)\s*<\/\1>/gi;
  for (const match of content.matchAll(headingPattern)) {
    if (faqs.length >= MAX_FAQS) {break;}
    const question = match[2].replace(/<[^>]+>/g, '').trim();
    const after = content.substring((match.index ?? 0) + match[0].length);
    const answerMatch = after.match(/<(p|div)[^>]*>([\s\S]*?)<\/\1>/i);
    if (answerMatch) {pushIfValid(question, answerMatch[2]);}
  }

  // Pattern 2 : <strong|b>question?</strong|b>
  const strongPattern = /<(strong|b)[^>]*>([\s\S]*?\?)\s*<\/\1>/gi;
  for (const match of content.matchAll(strongPattern)) {
    if (faqs.length >= MAX_FAQS) {break;}
    const question = match[2].replace(/<[^>]+>/g, '').trim();
    const after = content.substring((match.index ?? 0) + match[0].length);
    const answerMatch = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (answerMatch) {pushIfValid(question, answerMatch[1]);}
  }

  return faqs.slice(0, MAX_FAQS);
}

/**
 * Generate FAQPage JSON-LD schema.
 * Returns null if no FAQs (caller can short-circuit the <script> emit).
 */
export function generateFAQPageSchema(
  faqs: FAQItem[],
): Record<string, unknown> | null {
  if (!faqs || faqs.length === 0) {return null;}
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
