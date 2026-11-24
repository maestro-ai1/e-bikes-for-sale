import type { Product } from '@/lib/types';

/** Stunt (trick) scooters: Envy, Grit and Raven complete scooters. Some were filed under kids or accessories in the supplier feed. */
export const isStunt = (p: Product) => p.category === 'scooters' && (/\b(stunt|prodigy|colt s6|envy one|grit|raven)\b/i.test(p.name) || ['Grit', 'Raven'].includes(p.brand));
/** Kids push scooters (Globber, Vital): no motor or battery. */
export const isKidsPush = (p: Product) =>
  p.category === 'scooters' && !isStunt(p) && (p.subcategoryId === 'scooters-kids' || (p.brand === 'Globber' && /scooter/i.test(p.name) && !/trike|skates|lock/i.test(p.name)));
/** Scooter parts and accessories: wheels, grips, clamps, trikes, skates, a lock, a brake rotor. */
export const isScooterPart = (p: Product) => p.category === 'scooters' && !isStunt(p) && !isKidsPush(p) && p.subcategoryId === 'scooters-accessories';
/** Push scooters have no motor, so electric-scooter copy (range, charging, e-scooter rules) must not be used for them. */
export const isPushScooter = (p: Product) => isStunt(p) || isKidsPush(p);
