interface IconProps {
  name: IconName;
  size?: number;
}

export type IconName =
  | 'book'
  | 'doc'
  | 'scale'
  | 'map'
  | 'dice'
  | 'calendar'
  | 'brief'
  | 'bulb'
  | 'filter'
  | 'alert'
  | 'clipboard'
  | 'check'
  | 'x'
  | 'flag'
  | 'trophy'
  | 'play'
  | 'arrow'
  | 'info';

const PATHS: Record<IconName, string> = {
  book: 'M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2V5zm2 13h13M9 7h7',
  doc: 'M7 3h7l5 5v13H7V3zm7 0v5h5M10 12h7M10 16h7',
  scale: 'M12 4v16M5 20h14M12 6l-6 2 6-2 6 2-6-2M6 8l-3 6h6l-3-6zm12 0l-3 6h6l-3-6z',
  map: 'M9 4l6 2 6-2v14l-6 2-6-2-6 2V6l6-2zm0 0v14m6-12v14',
  dice: 'M4 4h16v16H4V4zm4 4h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01',
  calendar: 'M4 6h16v14H4V6zm0 5h16M8 3v4m8-4v4',
  brief: 'M4 8h16v12H4V8zm6 0V5h4v3M4 13h16',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10c-.8.8-1 1.5-1 2.5h-6c0-1-.2-1.7-1-2.5A6 6 0 0 1 12 3z',
  filter: 'M4 5h16l-6 7v6l-4 2v-8L4 5z',
  alert: 'M12 4l9 16H3l9-16zm0 6v4m0 3h.01',
  clipboard: 'M8 4h8v3H8V4zm-2 1H5v16h14V5h-1M9 11h6M9 15h6',
  check: 'M4 12l5 5L20 6',
  x: 'M6 6l12 12M18 6L6 18',
  flag: 'M6 21V4h11l-2 4 2 4H6',
  trophy: 'M7 4h10v4a5 5 0 0 1-10 0V4zm0 1H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4M9 20h6m-3-4v4',
  play: 'M7 4l13 8-13 8V4z',
  arrow: 'M4 12h16m-6-6l6 6-6 6',
  info: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 5v.01M12 11v6',
};

export function Icon({ name, size = 18 }: IconProps) {
  return (
    <svg
      className={`icon icon-${name}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
