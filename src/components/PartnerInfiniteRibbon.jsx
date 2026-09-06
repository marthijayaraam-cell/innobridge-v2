import React from 'react';
import { School, Building2, Sparkles, Award } from 'lucide-react';

const PARTNERS = [
  { name: 'IIT Bombay Innovation Cell', type: 'University Lab' },
  { name: 'Stanford d.school Sandbox', type: 'Research Hub' },
  { name: 'BITS Pilani Practice School', type: 'Institution' },
  { name: 'Google for Startups Accelerator', type: 'Industry Partner' },
  { name: 'MIT Sandbox Innovation', type: 'Research Lab' },
  { name: 'Y Combinator Alumni Net', type: 'Venture Capital' },
  { name: 'Nexus Venture Partners', type: 'Venture Partner' },
  { name: 'DTU Innovation & Incubation', type: 'University Hub' },
  { name: 'IIT Madras Research Park', type: 'DeepTech Lab' }
];

export default function PartnerInfiniteRibbon() {
  return (
    <div className="py-8 bg-[#0A0A0F]/60 border-y border-borderSubtle/60 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-8 animate-infinite-scroll whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 shrink-0 hover:border-primary/40 hover:bg-primary/10 transition-all cursor-default"
          >
            {partner.type.includes('University') || partner.type.includes('Lab') || partner.type.includes('Research') ? (
              <School className="w-4 h-4 text-primary-light" />
            ) : (
              <Building2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{partner.name}</span>
            <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-subtext font-bold">
              {partner.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
