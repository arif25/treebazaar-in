import React from 'react';
import {
  ShieldCheck,
  PackageCheck,
  Stethoscope,
  Truck,
} from 'lucide-react';

export default function TrustBar() {
  const perks = [
    {
      icon: ShieldCheck,
      title: '7-Day Freshness Guarantee',
      desc: 'Arrives alive & thriving or instant replacement',
    },
    {
      icon: PackageCheck,
      title: 'Zero-Damage Transit Armor',
      desc: 'Ventilated shockproof custom plant cartons',
    },
    {
      icon: Stethoscope,
      title: 'Free Plant Doctor Help',
      desc: 'Unlimited WhatsApp botanist guidance',
    },
    {
      icon: Truck,
      title: 'Fulfilled via Amazon Prime',
      desc: 'Fast, secure doorstep delivery across India',
    },
  ];

  return (
    <section id="trust-bar" className="bg-white py-5 sm:py-7 px-4 sm:px-6 lg:px-8 border-b border-[#E5EEE5]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F3FAF4] border border-[#E5EEE5] hover:border-[#80C995] transition-all hover:shadow-xs group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EAF6EC] text-[#278653] flex items-center justify-center shrink-0 group-hover:bg-[#4CAF72] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#244C38] truncate">
                    {perk.title}
                  </h4>
                  <p className="text-[11px] text-[#718078] truncate">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
