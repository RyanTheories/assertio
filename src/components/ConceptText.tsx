import { type ReactNode } from 'react';
import { GLOSSARY, GLOSSARY_KEYS } from '../data/glossary';

const BOUNDARY_CHARS = /[a-z0-9]/i;
const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ');

function findMatches(text: string): Array<{ start: number; end: number; key: string }> {
  const lower = normalize(text);
  const matches: Array<{ start: number; end: number; key: string }> = [];
  const taken: Array<[number, number]> = [];
  const overlaps = (s: number, e: number) => taken.some(([ts, te]) => s < te && e > ts);

  for (const key of GLOSSARY_KEYS) {
    const base = normalize(key);
    const needles = new Set<string>([base]);
    if (/[^s]s$/.test(base)) needles.add(base + 'es');
    else if (/[^s]y$/.test(base)) needles.add(base.slice(0, -1) + 'ies');
    else needles.add(base + 's');
    for (const needle of needles) {
      let idx = 0;
      for (;;) {
        const at = lower.indexOf(needle, idx);
        if (at === -1) break;
        const end = at + needle.length;
        const beforeOk = at === 0 || !BOUNDARY_CHARS.test(lower[at - 1]);
        const afterOk = end === lower.length || !BOUNDARY_CHARS.test(lower[end]);
        if (beforeOk && afterOk && !overlaps(at, end)) {
          matches.push({ start: at, end, key });
          taken.push([at, end]);
          break;
        }
        idx = at + 1;
      }
    }
  }
  return matches.sort((a, b) => a.start - b.start);
}

function Highlighted({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const matches = findMatches(text);
  let cursor = 0;

  matches.forEach((m, i) => {
    if (m.start > cursor) parts.push(text.slice(cursor, m.start));
    const term = GLOSSARY[m.key];
    parts.push(
      <span key={i} className="concept" tabIndex={0}>
        {text.slice(m.start, m.end)}
        <span className="concept-tip" role="tooltip">
          <span className="concept-tip-title">{term.label}</span>
          <span className="concept-tip-body">{term.body}</span>
          {term.ref && <span className="concept-tip-ref">{term.ref}</span>}
        </span>
      </span>
    );
    cursor = m.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export function ConceptText({ children }: { children: string | null | undefined }) {
  if (!children) return null;
  return <span className="concept-text"><Highlighted text={children} /></span>;
}
