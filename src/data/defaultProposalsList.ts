import { ProposalData } from '../types';
import { synthesizeProposal } from '../utils/proposalSynthesizer';

export const INITIAL_PROPOSALS_LIBRARY: ProposalData[] = [
  // Client 01: Karim El-Sayed (Signature Tier - 21,997 EGP)
  synthesizeProposal({
    prospectName: 'Eng. Karim El-Sayed',
    firmName: 'KÉRAN Architecture & Interiors',
    contactTitle: 'Founder & Principal Architect',
    location: 'New Cairo (Katameya Dunes & Lake View)',
    standoutProject: 'Katameya Dunes Turnkey Private Villa',
    observedFlaw: 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
    tier: 'signature'
  }),

  // Client 02: Tarek Mansour (Presence Tier - 12,997 EGP)
  synthesizeProposal({
    prospectName: 'Dr. Tarek Mansour',
    firmName: 'Palazzo Luxury Interiors',
    contactTitle: 'Managing Director',
    location: 'Sheikh Zayed (Palm Hills & Allegria)',
    standoutProject: 'Palazzo Signature Estate Sheikh Zayed',
    observedFlaw: 'الاعتماد على ملفات PDF ثقيلة لا تفتح على هواتف عملاء الفلل وتسبب تسريب المبيعات',
    tier: 'presence'
  }),

  // Client 03: Mansoor Al-Ketbi (Authority Tier - 34,997 EGP+)
  synthesizeProposal({
    prospectName: 'Arch. Mansoor Al-Ketbi',
    firmName: 'Cadastre Private Estates Dubai',
    contactTitle: 'Executive Principal',
    location: 'Dubai Hills & Emirates Hills',
    standoutProject: 'Cadastre Ultra-Prime Palm Villa Handover',
    observedFlaw: 'غياب العرض التفاعلي ثنائي اللغة وضعف إبراز تفاصيل الرخام والمواد الفاخرة عالمياً',
    tier: 'authority'
  }),

  // Client 04: Founding Launch Partner Cohort (Build Fee Waived)
  synthesizeProposal({
    prospectName: 'Eng. Hedayet Islam',
    firmName: 'Eklego Design Studio',
    contactTitle: 'Principal & Co-Founder',
    location: 'New Cairo & Zamalek',
    standoutProject: 'Katameya Heights Private Villa',
    observedFlaw: 'غياب واجهة تفاعلية سينمائية للموبايل تليق بتاريخ المكتب وتصفي استفسارات المشاريع الكبرى',
    tier: 'founding'
  })
];
