type BlogHeroArtProps = {
  variant: "paycheck" | "wage" | "teacher-housing";
  className?: string;
  title: string;
};

const buildings = [
  { x: 0, w: 60, h: 120 },
  { x: 65, w: 45, h: 170 },
  { x: 115, w: 70, h: 100 },
  { x: 190, w: 50, h: 150 },
  { x: 245, w: 65, h: 190 },
  { x: 315, w: 40, h: 110 },
  { x: 360, w: 75, h: 160 },
  { x: 940, w: 65, h: 190 },
  { x: 1005, w: 50, h: 110 },
  { x: 1060, w: 75, h: 160 },
  { x: 1140, w: 60, h: 130 },
];

function Skyline() {
  return (
    <g>
      {buildings.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y={400 - b.h}
          width={b.w}
          height={b.h}
          fill="#292524"
          opacity="0.85"
        />
      ))}
      <rect x="0" y="392" width="1200" height="8" fill="#292524" opacity="0.85" />
    </g>
  );
}

function PaycheckArt() {
  return (
    <g transform="rotate(-4 600 165)">
      <rect x="430" y="75" width="340" height="180" rx="18" fill="#ffffff" stroke="#d6d3d1" strokeWidth="2" />
      <rect x="466" y="118" width="150" height="12" rx="6" fill="#e7e5e4" />
      <rect x="466" y="148" width="190" height="12" rx="6" fill="#e7e5e4" />
      <rect x="466" y="178" width="110" height="12" rx="6" fill="#a8a29e" />
      <rect x="466" y="205" width="230" height="3" fill="#e7e5e4" />
      <rect x="466" y="218" width="140" height="12" rx="6" fill="#10b981" opacity="0.25" />
      <circle cx="742" cy="96" r="44" fill="#10b981" />
      <text x="742" y="112" textAnchor="middle" fontSize="46" fontWeight="700" fill="#ffffff" fontFamily="Georgia, serif">
        $
      </text>
    </g>
  );
}

function WageArt() {
  return (
    <g>
      <rect x="500" y="300" width="220" height="4" fill="#a8a29e" />
      <rect x="510" y="230" width="56" height="70" rx="4" fill="#d6d3d1" />
      <rect x="588" y="185" width="56" height="115" rx="4" fill="#a8a29e" />
      <rect x="666" y="120" width="56" height="180" rx="4" fill="#10b981" />
      <polygon points="694,60 714,95 674,95" fill="#059669" />
      <rect x="690" y="95" width="8" height="28" fill="#059669" />
    </g>
  );
}

function TeacherHousingArt() {
  const windowRows = [0, 1, 2, 3];
  const windowCols = [0, 1, 2];
  return (
    <g>
      <rect x="470" y="90" width="160" height="190" rx="6" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
      {windowRows.map((row) =>
        windowCols.map((col) => {
          const isLit = row === 1 && col === 2;
          return (
            <rect
              key={`${row}-${col}`}
              x={492 + col * 40}
              y={112 + row * 40}
              width="20"
              height="20"
              rx="2"
              fill={isLit ? "#10b981" : "#e7e5e4"}
              opacity={isLit ? 0.6 : 1}
            />
          );
        }),
      )}
      <polygon points="700,150 780,110 860,150 860,170 700,170" fill="#10b981" />
      <rect x="770" y="170" width="20" height="10" fill="#292524" />
      <line x1="850" y1="118" x2="875" y2="128" stroke="#292524" strokeWidth="3" />
      <circle cx="877" cy="130" r="6" fill="#10b981" />
    </g>
  );
}

export function BlogHeroArt({ variant, className, title }: BlogHeroArtProps) {
  return (
    <svg
      viewBox="0 0 1200 400"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#fafaf9" />
        </linearGradient>
      </defs>
      <rect width="1200" height="400" fill={`url(#sky-${variant})`} />
      <Skyline />
      {variant === "paycheck" ? <PaycheckArt /> : null}
      {variant === "wage" ? <WageArt /> : null}
      {variant === "teacher-housing" ? <TeacherHousingArt /> : null}
    </svg>
  );
}
