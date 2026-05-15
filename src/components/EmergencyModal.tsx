"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

interface EmergencyModalProps {
  open: boolean;
  onClose: () => void;
}

const emergencyNumbers = [
  { label: "24/7 Emergency Line", number: "+1 (555) 911-PETS" },
  { label: "Poison Control", number: "+1 (555) 888-HELP" },
  { label: "Nearest Emergency Vet", number: "+1 (555) 234-VETS" },
];

export function EmergencyModal({ open, onClose }: EmergencyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-sm mx-4 rounded-2xl border border-red-200 bg-white p-6 shadow-2xl shadow-red-500/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#90A4AE] hover:text-[#004D40] transition-colors"
              aria-label="Close emergency menu"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-red-500">
                Emergency Quick-Dial
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {emergencyNumbers.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3 transition-colors hover:border-red-300 hover:bg-red-50"
                >
                  <Phone size={18} className="text-red-500" />
                  <div>
                    <div className="text-sm text-[#546E7A]">{item.label}</div>
                    <div className="text-sm font-medium text-[#004D40]">
                      {item.number}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
