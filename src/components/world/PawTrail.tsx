import { PawPrint } from "lucide-react";

export interface PawStop {
  /** Vertical position within the trail, e.g. "12%". */
  top: string;
  /** Horizontal position within the trail, e.g. "22%". */
  left: string;
  rotate?: number;
}

interface PawTrailProps {
  /** Serpentine connector path in a 0–100 normalised coordinate space. */
  d: string;
  /** Paw prints at the journey's milestones. */
  paws: PawStop[];
  className?: string;
}

/** Static pathway connecting the journey milestones. */
export default function PawTrail({ d, paws, className = "" }: PawTrailProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <path
          d={d}
          stroke="rgba(0,172,193,0.28)"
          strokeWidth="1.5"
          strokeDasharray="0.6 2.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {paws.map((paw, index) => (
        <span
          key={index}
          className="absolute text-[#00ACC1] opacity-55"
          style={{ top: paw.top, left: paw.left }}
        >
          <PawPrint
            className="h-5 w-5 sm:h-6 sm:w-6"
            strokeWidth={1.4}
            style={{ transform: `rotate(${paw.rotate ?? 0}deg)` }}
          />
        </span>
      ))}
    </div>
  );
}
