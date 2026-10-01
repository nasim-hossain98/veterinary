import { PawPrint } from "lucide-react";

/** Large blurred palette blooms (tints taken from the existing palette). */
const BLOBS: React.CSSProperties[] = [
  {
    top: "-14%",
    left: "-10%",
    width: "46rem",
    height: "46rem",
    background: "radial-gradient(circle, rgba(0,172,193,0.30) 0%, transparent 68%)",
  },
  {
    top: "22%",
    right: "-14%",
    width: "42rem",
    height: "42rem",
    background: "radial-gradient(circle, rgba(77,208,225,0.26) 0%, transparent 68%)",
  },
  {
    bottom: "-18%",
    left: "18%",
    width: "40rem",
    height: "40rem",
    background: "radial-gradient(circle, rgba(1,87,155,0.16) 0%, transparent 70%)",
  },
  {
    bottom: "8%",
    right: "6%",
    width: "24rem",
    height: "24rem",
    background: "radial-gradient(circle, rgba(186,104,200,0.13) 0%, transparent 70%)",
  },
];

/** [rotation, top, left, size, vertical offset] */
const SHARDS: [number, string, string, string, number][] = [
  [14, "12%", "7%", "6.5rem", 1.0],
  [-18, "62%", "16%", "4.5rem", 0.72],
  [9, "28%", "86%", "5.5rem", 1.28],
  [-12, "78%", "90%", "7rem", 0.58],
  [22, "46%", "3%", "3.5rem", 1.42],
];

/** [rotation, top, left, size] */
const PAWS: [number, string, string, string][] = [
  [16, "18%", "8%", "2.6rem"],
  [-14, "58%", "80%", "3.4rem"],
  [10, "82%", "30%", "2.2rem"],
  [-22, "34%", "68%", "1.9rem"],
];

/** Static aqua environment shared by the main sections and shop pages. */
export default function WorldBackdrop() {
  return (
    <div aria-hidden="true" className="world-shell z-0">
      <div className="world-waves top-[6%] h-[26vh] opacity-45">
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="world-wave-a" x1="0" x2="1">
              <stop offset="0%" stopColor="#00ACC1" stopOpacity="0" />
              <stop offset="50%" stopColor="#00ACC1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4DD0E1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="world-wave-b" x1="0" x2="1">
              <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0" />
              <stop offset="50%" stopColor="#01579B" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#00ACC1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120 C 220 60, 420 180, 660 118 S 1120 40, 1380 120 S 1520 168, 1600 128"
            fill="none"
            stroke="url(#world-wave-a)"
            strokeWidth="2.5"
          />
          <path
            d="M0 168 C 260 108, 480 214, 720 158 S 1180 84, 1420 162 S 1540 200, 1600 172"
            fill="none"
            stroke="url(#world-wave-b)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="world-waves bottom-[18%] hidden h-[20vh] opacity-35 md:block">
        <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 140 C 300 80, 520 190, 780 132 S 1240 60, 1460 140 S 1560 176, 1600 148"
            fill="none"
            stroke="url(#world-wave-a)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {BLOBS.map((style, index) => (
        <span
          key={index}
          className={`world-blob ${index === 3 ? "hidden lg:block" : ""}`}
          style={style}
        >
          <span
            className="motion-optional block h-full w-full"
            style={{
              animation: `world-drift-y ${26 + index * 5}s ease-in-out infinite`,
              animationDelay: `${index * -4}s`,
            }}
          />
        </span>
      ))}

      <div className="absolute inset-0 hidden sm:block">
        {SHARDS.map(([rotation, top, left, size, offset], index) => (
          <span
            key={index}
            className={`world-shard ${index > 2 ? "hidden lg:block" : ""}`}
            style={
              {
                top,
                left,
                width: size,
                height: size,
                marginTop: `${index * 7 * offset}%`,
                "--shard-rot": `${rotation}deg`,
                animation: `world-shard ${7 + index * 1.6}s ease-in-out infinite alternate`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {PAWS.map(([rotation, top, left, size], index) => (
          <span
            key={index}
            className={`world-paw ${index > 1 ? "hidden md:block" : ""}`}
            style={{
              top,
              left,
              width: size,
              height: size,
              animation: `world-paw ${9 + index * 2}s ease-in-out infinite`,
              animationDelay: `${index * -2.5}s`,
            }}
          >
            <PawPrint
              className="h-full w-full"
              style={{ transform: `rotate(${rotation}deg)` }}
              strokeWidth={1.2}
            />
          </span>
        ))}
      </div>

      <div className="world-vignette" />
    </div>
  );
}
