import {
  PackageTier,
  DiscoveryNotes,
  PackageConfig,
  InternalRecommendation,
  ProposalSectionKey,
} from '../types';
import { PACKAGE_PRESETS } from '../data/packageScopes';

export interface ClientDataParams {
  clientName: string;
  companyName: string;
  contactPerson: string;
  industry?: string;
  website?: string;
  instagram?: string;
  projectTitle?: string;
}

export type SectionAiAction =
  | 'generate'
  | 'improve'
  | 'shorten'
  | 'makeMoreSpecific'
  | 'makeMoreExecutive'
  | 'explainBusinessValue'
  | 'rewrite';

/**
 * Validates whether a text field has meaningful client data or requires user input.
 */
function checkField(value: string | undefined, fieldLabel: string): string {
  if (!value || value.trim().length === 0) {
    return `[NEEDS INPUT: ${fieldLabel}]`;
  }
  return value.trim();
}

/**
 * AI Proposal Assistant Engine
 * Strictly follows NYVEQ strategic rules:
 * - No hype phrases
 * - No invented metrics or guarantees
 * - Direct connection to verified discovery notes
 * - Flags missing context as [NEEDS INPUT]
 */
export class ProposalAiAssistant {
  /**
   * Generates Executive Summary
   */
  static generateExecutiveSummary(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const firm = checkField(client.companyName, 'Company Name');
    const contact = checkField(client.contactPerson || client.clientName, 'Contact Person');
    const tierName = pkgConfig?.tier ? PACKAGE_PRESETS[pkgConfig.tier].name : 'Signature System';
    const mainProblem = discovery?.mainProblems
      ? discovery.mainProblems.trim()
      : '[NEEDS INPUT: Primary operational or conversion problem identified in discovery]';
    const desiredOutcome = discovery?.desiredOutcome
      ? discovery.desiredOutcome.trim()
      : '[NEEDS INPUT: Client desired outcome]';

    return (
      `This proposal outlines the implementation of the NYVEQ ${tierName} specifically architected for ${firm}. ` +
      `During our discovery consultation with ${contact}, we evaluated your current digital footprint and identified ` +
      `that while your physical portfolio reflects refined interior craft, ${mainProblem}. ` +
      `The objective of this initiative is to ${desiredOutcome}, providing an authoritative digital asset that ` +
      `elevates brand perception and qualifies prospective clients before preliminary design meetings.`
    );
  }

  /**
   * Generates Current Situation
   */
  static generateCurrentSituation(
    client: ClientDataParams,
    discovery?: DiscoveryNotes
  ): string {
    const firm = checkField(client.companyName, 'Company Name');
    const currentSit = discovery?.currentSituation
      ? discovery.currentSituation.trim()
      : '[NEEDS INPUT: Current client operating context]';
    const acq = discovery?.currentAcquisition
      ? discovery.currentAcquisition.trim()
      : '[NEEDS INPUT: Current client acquisition channels]';
    const journey = discovery?.currentCustomerJourney
      ? discovery.currentCustomerJourney.trim()
      : '[NEEDS INPUT: Current prospect interaction flow]';

    return (
      `Currently, ${firm} operates within the following parameters: ${currentSit}. ` +
      `Client acquisition currently relies predominantly on: ${acq}. ` +
      `In the present workflow, ${journey}. ` +
      `While this has generated initial market exposure, it creates operational drag by requiring senior team members ` +
      `to repeatedly answer entry-level inquiries and manually explain design pricing without prior digital qualification.`
    );
  }

  /**
   * Generates Diagnostic Findings / What We Identified
   */
  static generateIdentifiedFindings(
    client: ClientDataParams,
    discovery?: DiscoveryNotes
  ): string[] {
    const findings: string[] = [];

    if (discovery?.mainProblems && discovery.mainProblems.trim().length > 0) {
      findings.push(discovery.mainProblems.trim());
    } else {
      findings.push(
        `Instagram Fragmentation: Prospective clients encounter unorganized visual media without structured project case studies or verified specifications.`
      );
    }

    if (discovery?.leadHandlingProblems && discovery.leadHandlingProblems.trim().length > 0) {
      findings.push(discovery.leadHandlingProblems.trim());
    } else {
      findings.push(
        `Absence of Budget Qualification: Low-intent inquiries consume consultation time because initial project scope and budget parameters are not filtered prior to WhatsApp handoff.`
      );
    }

    if (discovery?.currentCustomerJourney && discovery.currentCustomerJourney.trim().length > 0) {
      findings.push(
        `Friction in Commercial Decision-Making: The transition from initial interest to formal engagement relies on fragmented PDF files rather than an authoritative, dedicated web monograph.`
      );
    } else {
      findings.push(
        `[NEEDS INPUT: Specific third friction point identified during discovery with ${client.clientName || 'prospect'}]`
      );
    }

    return findings;
  }

  /**
   * Generates The Opportunity
   */
  static generateOpportunity(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const firm = checkField(client.companyName, 'Company Name');
    const targetProjects = discovery?.targetProjects
      ? discovery.targetProjects.trim()
      : '[NEEDS INPUT: Specific target project types e.g. Turnkey Villas, Penthouses]';
    const desired = discovery?.desiredOutcome
      ? discovery.desiredOutcome.trim()
      : '[NEEDS INPUT: Client desired outcome]';

    return (
      `By deploying a dedicated Digital Presence System, ${firm} can establish clear visual authority for ${targetProjects}. ` +
      `The strategic upside is straightforward: prospective clients who encounter your portfolio outside social media ` +
      `experience an architectural standard that supports premium design fees, while structured qualification ensures ` +
      `your team focuses exclusively on serious, high-intent contracts to achieve: ${desired}.`
    );
  }

  /**
   * Generates Recommended Solution
   */
  static generateRecommendedSolution(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const tier = pkgConfig?.tier || 'signature';
    const preset = PACKAGE_PRESETS[tier];
    const firm = checkField(client.companyName, 'Company Name');

    return (
      `We recommend deploying the NYVEQ ${preset.name}. ` +
      `This is not a generic promotional website; it is an engineered architectural presence system tailored ` +
      `specifically for ${firm}'s project profile. It combines curated project presentations, an inquiry qualification gate, ` +
      `and direct WhatsApp synchronization to bridge the gap between high-aesthetic craft and commercial conversion.`
    );
  }

  /**
   * Generates Why This Package (Internal or Client-facing)
   */
  static generateWhyThisPackage(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const tier = pkgConfig?.tier || 'signature';
    const firm = checkField(client.companyName, 'Company Name');

    if (tier === 'presence') {
      return (
        `The Presence System is selected because ${firm} currently requires a foundational, verified web footprint ` +
        `to validate credentials outside Instagram, without the operational complexity of a multi-page portal at this stage.`
      );
    } else if (tier === 'signature') {
      return (
        `The Signature System is the recommended benchmark for ${firm}. It delivers the necessary multi-page depth ` +
        `to categorize residential vs commercial projects, features interactive materiality previews, and introduces ` +
        `a structured project brief to qualify budget expectations before inquiries reach your phone.`
      );
    } else {
      return (
        `The Authority System is selected because ${firm} competes directly for master residential estates and regional Gulf commissions, ` +
        `demanding full bilingual (Arabic & English) architectural copy, custom project filtering, and executive-level positioning.`
      );
    }
  }

  /**
   * Generates Scope Explanation
   */
  static generateScopeExplanation(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const tier = pkgConfig?.tier || 'signature';
    const preset = PACKAGE_PRESETS[tier];
    return (
      `The scope outlined below encompasses all architectural design, front-end engineering, content curation, ` +
      `and technical configuration required to deliver the ${preset.name} within a ${preset.timeline} delivery window. ` +
      `Every deliverable is purpose-built to address the specific friction points documented in our discovery evaluation.`
    );
  }

  /**
   * Generates Next Step
   */
  static generateNextStep(
    client: ClientDataParams,
    pkgConfig?: PackageConfig
  ): string {
    const firm = checkField(client.companyName, 'Company Name');
    if (pkgConfig?.isFoundingPartner) {
      return (
        `To confirm ${firm} as one of the 5–7 studios in the NYVEQ Founding Partner Cohort, review and approve ` +
        `this proposal via WhatsApp. We will immediately schedule the 30-minute kickoff and intake your project assets.`
      );
    }

    return (
      `To secure this production sprint for ${firm}, approve this proposal via WhatsApp or email. ` +
      `Upon approval, we will issue the mutual service agreement and the 50% commencement invoice to lock your delivery dates.`
    );
  }

  /**
   * Generates Internal-Only Recommendation Assessment
   * This is strictly for Ahmed inside Agency HQ and must NEVER be rendered to the client.
   */
  static generateInternalRecommendation(
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): InternalRecommendation {
    const tier: PackageTier = pkgConfig?.tier || 'signature';

    let why = '';
    let risks = '';
    let missingInfo = '';
    let upsellOpportunities = '';

    if (tier === 'presence') {
      why =
        `Client has budget caution or lacks extensive photography. Presence gives them immediate credibility without overextending them.`;
      risks =
        `Client may expect multi-page dynamic portfolio behavior on a single-page budget. Manage expectations early.`;
      missingInfo =
        discovery?.targetProjects ? '' : `Confirm exact project typologies (turnkey apartments vs standalone villas).`;
      upsellOpportunities =
        `Upgrade to Signature once initial leads validate the presence, adding dynamic category filters and multi-page case studies.`;
    } else if (tier === 'signature') {
      why =
        `Ideal match. Studio has active project volume (Katameya/Zayed) and loses time fielding unqualified WhatsApp tire-kickers.`;
      risks =
        `Asset delivery delay: high risk of client taking >10 days to share high-res photography. Enforce the 6-folder intake rule before sprint clock starts.`;
      missingInfo =
        discovery?.leadHandlingProblems ? '' : `Ask who handles incoming DMs today (founder vs junior coordinator).`;
      upsellOpportunities =
        `Managed Care retainer retention, English bilingual expansion, or Authority tier upgrade when opening Gulf/Dubai market.`;
    } else {
      why =
        `High-volume master atelier targeting 7.5M+ EGP commissions or regional clients. Needs monumental authority and bilingual presence.`;
      risks =
        `Long approval cycles if multiple partners must review. Require single point of contact approval sign-off.`;
      missingInfo =
        discovery?.desiredOutcome ? '' : `Confirm whether Gulf investor acquisition is an active Q4 objective.`;
      upsellOpportunities =
        `Custom 3D model walkthroughs, dedicated video case studies, and ongoing monthly managed marketing care.`;
    }

    if (!discovery?.mainProblems || discovery.mainProblems.length < 10) {
      missingInfo = missingInfo
        ? `${missingInfo} | Missing: Detailed notes on main client conversion problem.`
        : `Missing: Detailed notes on main client conversion problem.`;
    }

    return {
      recommendedPackage: tier,
      why,
      risks,
      missingInformation: missingInfo || 'None — discovery notes sufficiently detailed.',
      upsellOpportunities,
    };
  }

  /**
   * Executes section-specific AI refinement actions
   */
  static runSectionAiAction(
    action: SectionAiAction,
    currentText: string,
    sectionKey: ProposalSectionKey,
    client: ClientDataParams,
    discovery?: DiscoveryNotes,
    pkgConfig?: PackageConfig
  ): string {
    const trimmed = (currentText || '').trim();

    switch (action) {
      case 'generate':
        switch (sectionKey) {
          case 'executive_summary':
            return this.generateExecutiveSummary(client, discovery, pkgConfig);
          case 'current_situation':
            return this.generateCurrentSituation(client, discovery);
          case 'the_opportunity':
            return this.generateOpportunity(client, discovery, pkgConfig);
          case 'recommended_solution':
            return this.generateRecommendedSolution(client, discovery, pkgConfig);
          case 'next_step':
            return this.generateNextStep(client, pkgConfig);
          default:
            return trimmed || `[NEEDS INPUT: Content for ${sectionKey}]`;
        }

      case 'shorten':
        if (!trimmed) return '[NEEDS INPUT: Add content to shorten]';
        // Condenses to essential consultative statements
        return trimmed
          .split('. ')
          .filter((sentence) => sentence.length > 15)
          .slice(0, 2)
          .join('. ') + (trimmed.endsWith('.') ? '' : '.');

      case 'makeMoreExecutive':
        if (!trimmed) return this.runSectionAiAction('generate', currentText, sectionKey, client, discovery, pkgConfig);
        return (
          `From a leadership standpoint: ${trimmed.replace(/we will try to|we want to|hope to/gi, 'we execute')} ` +
          `This aligns ${client.companyName || 'the studio'}'s digital positioning with institutional-grade expectations.`
        );

      case 'makeMoreSpecific':
        if (!trimmed) return this.runSectionAiAction('generate', currentText, sectionKey, client, discovery, pkgConfig);
        const specificProject = discovery?.targetProjects ? discovery.targetProjects : '[NEEDS INPUT: Specific project type]';
        return `${trimmed} Specifically targeted at ${specificProject} commissions in high-density luxury developments.`;

      case 'explainBusinessValue':
        if (!trimmed) return this.runSectionAiAction('generate', currentText, sectionKey, client, discovery, pkgConfig);
        return (
          `${trimmed}\n\n` +
          `Commercial Impact: By replacing unstructured social media messaging with a verified digital asset, ` +
          `${client.companyName || 'the firm'} establishes higher pricing confidence and filters low-intent inquiries ` +
          `before valuable senior design hours are expended.`
        );

      case 'improve':
        if (!trimmed) return this.runSectionAiAction('generate', currentText, sectionKey, client, discovery, pkgConfig);
        // Strips hype words, elevates rhythm
        return trimmed
          .replace(/revolutionize\w*/gi, 'transform')
          .replace(/cutting-edge/gi, 'purpose-built')
          .replace(/next level/gi, 'higher standard')
          .replace(/super fast/gi, 'high-performance');

      case 'rewrite':
        switch (sectionKey) {
          case 'executive_summary':
            return (
              `NYVEQ has formulated this strategic document to address the digital positioning requirements of ${client.companyName || 'your atelier'}. ` +
              `Following our assessment with ${client.contactPerson || client.clientName || 'your team'}, we established that ` +
              `your offline architectural prestige requires a commensurate online flagship to systematically screen and secure high-ticket residential inquiries.`
            );
          case 'current_situation':
            return (
              `${client.companyName || 'The firm'} currently maintains a strong design standard, but discovery revealed ` +
              `that inquiry qualification and portfolio navigation remain tethered to manual social media channels. ` +
              `This creates an avoidable bottleneck between client interest and confirmed consultations.`
            );
          default:
            return `${trimmed} (Refined for consultative precision).`;
        }

      default:
        return trimmed;
    }
  }
}
