import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConceptText } from '../components/ConceptText';

describe('ConceptText hover matcher', () => {
  it('matches the user-reported missing terms', () => {
    const html = renderToString(
      <ConceptText>A collateral-light working-capital facility is in arrears.</ConceptText>
    );
    expect(html).toContain('Arrears');
    expect(html).toContain('Collateral');
    expect(html).toContain('Working capital');
  });

  it('matches plural and hyphenated variants', () => {
    const html = renderToString(
      <ConceptText>The covenants were breached, deposits ran down and headroom was thin.</ConceptText>
    );
    expect(html).toContain('Covenant');
    expect(html).toContain('Deposit');
    expect(html).toContain('Headroom');
  });

  it('does not match terms inside longer words', () => {
    const html = renderToString(<ConceptText>The assignment was recorded.</ConceptText>);
    expect(html).not.toContain('concept-tip');
  });

  it('renders a tooltip body and reference for matched terms', () => {
    const html = renderToString(<ConceptText>The EBITDA covenant was breached.</ConceptText>);
    expect(html).toContain('concept-tip-body');
    expect(html).toContain('EBITDA');
  });
});
