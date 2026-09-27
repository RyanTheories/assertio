export const SECTOR_ORDER = [
  'Banking & finance',
  'Insurance & pensions',
  'Asset & wealth management',
  'Technology & software',
  'Retail & e-commerce',
  'Manufacturing & industrials',
  'Energy & utilities',
  'Mining & materials',
  'Transport & logistics',
  'Hospitality & leisure',
  'Real estate & construction',
  'Healthcare & pharma',
  'Agriculture & food',
  'Media & telecom',
  'Professional services',
  'Public sector & education',
  'Charities & non-profit',
  'Conglomerates & holding companies',
] as const;

export type Sector = (typeof SECTOR_ORDER)[number];

const PATTERNS: Array<[Sector, RegExp]> = [
  ['Banking & finance', /bank|fintech|mortgage|lender|lending|bnpl|payments?|microfinance|credit union|leasing|finance/i],
  ['Insurance & pensions', /insurance|pension|actuar|underwrit|reinsur|broker-dealer|workers['’]? comp/i],
  ['Asset & wealth management', /asset management|fund|wealth|private equity|venture|digital asset|securit/i],
  ['Technology & software', /software|saas|it |it-|technology|tech|startup|semiconductor|electronics|telecom|cyber|data center|hosting/i],
  ['Retail & e-commerce', /retail|e-commerce|ecommerce|shop|store|fashion|grocery|pharmacy chain|sports retail|book|stationery|wholesale|distribution|consumer goods|consumer electronics|cosmetics/i],
  ['Manufacturing & industrials', /manufactur|industrial|fabricat|metal|machinery|automotive|aerospace|furniture|textile|appliance|elevator|equipment|mro|printing/i],
  ['Energy & utilities', /energy|renewable|solar|wind|power|electricity|utility|water|gas|coal|oil|petrol|waste management/i],
  ['Mining & materials', /mining|quarr|cement|construction materials|chemical|specialty chemicals/i],
  ['Transport & logistics', /logistic|shipping|container|freight|courier|delivery|transport|rail|airline|aviation|bus|fleet|taxi|tunnel/i],
  ['Hospitality & leisure', /hospitality|hotel|restaurant|pub|café|cafe|dining|brewery|brewing|beverage|cinema|leisure|theme park|fitness|gym|travel|tour|coworking/i],
  ['Real estate & construction', /real estate|property|construction|civil engineering|architecture|estate agenc|landlord/i],
  ['Healthcare & pharma', /pharma|biotech|medical|dental|healthcare|health care|clinic|hospital|life scien/i],
  ['Agriculture & food', /farm|agricultur|dairy|poultry|crop|food|bakery|cooperative/i],
  ['Media & telecom', /media|publishing|classifieds|broadcast|advertising|marketing agency|entertainment/i],
  ['Conglomerates & holding companies', /conglomerate|family-owned group|holding/i],
  ['Professional services', /law firm|legal|consulting|professional services|recruitment|staffing|security services|facilities management/i],
  ['Public sector & education', /public|municipal|government|university|college|school|education/i],
  ['Charities & non-profit', /charity|non-profit|nonprofit|relief|development aid/i],
];

export function sectorFor(industry: string): Sector {
  for (const [sector, re] of PATTERNS) {
    if (re.test(industry)) return sector;
  }
  return 'Conglomerates & holding companies';
}

export function toRoman(n: number): string {
  if (n <= 0) return String(n);
  const table: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of table) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
