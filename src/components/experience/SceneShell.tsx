import type { ReactNode, Ref } from "react";

interface SceneShellProps {
  id: string;
  label: string;
  eyebrow: string;
  aliases?: string[];
  children: ReactNode;
  className?: string;
  sectionRef?: Ref<HTMLElement>;
}

function assignRef(ref: Ref<HTMLElement> | undefined, node: HTMLElement | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(node);
  else (ref as React.MutableRefObject<HTMLElement | null>).current = node;
}

export default function SceneShell({
  id,
  label,
  eyebrow,
  aliases,
  children,
  className = "",
  sectionRef,
}: SceneShellProps) {
  return (
    <section
      id={id}
      data-scene={id}
      aria-label={`${eyebrow} — ${label}`}
      ref={(node: HTMLElement | null) => assignRef(sectionRef, node)}
      className={`relative w-full ${className}`}
    >
      {aliases?.map((alias) => (
        <span
          key={alias}
          id={alias}
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 block h-px w-px overflow-hidden scroll-mt-[92px]"
        />
      ))}
      {children}
    </section>
  );
}
