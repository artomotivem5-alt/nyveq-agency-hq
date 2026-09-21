import { ProposalTheme, ThemePreset } from '../types';

export const THEME_PRESETS: Record<ThemePreset, ProposalTheme> = {
  'nyveq-dark': {
    preset: 'nyveq-dark',
    primaryColor: '#8b5cf6',
    accentColor: '#c5a880',
    backgroundColor: '#07060a',
    textColor: '#f4f4f5',
    cardBackgroundColor: '#0f0e17',
    cardBorderColor: '#242236',
    isDark: true,
    fontPair: 'editorial-serif',
    borderRadius: 'rounded',
    sectionStyle: 'minimal',
  },

  'editorial-light': {
    preset: 'editorial-light',
    primaryColor: '#18181b',
    accentColor: '#92400e',
    backgroundColor: '#faf9f6',
    textColor: '#18181b',
    cardBackgroundColor: '#ffffff',
    cardBorderColor: '#e4e2dc',
    isDark: false,
    fontPair: 'editorial-serif',
    borderRadius: 'subtle',
    sectionStyle: 'bordered',
  },

  'architectural': {
    preset: 'architectural',
    primaryColor: '#ffffff',
    accentColor: '#d4c5b9',
    backgroundColor: '#121214',
    textColor: '#ededed',
    cardBackgroundColor: '#18181b',
    cardBorderColor: '#27272a',
    isDark: true,
    fontPair: 'monumental-grotesk',
    borderRadius: 'none',
    sectionStyle: 'bordered',
  },

  'client-brand': {
    preset: 'client-brand',
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    backgroundColor: '#090a0f',
    textColor: '#f8fafc',
    cardBackgroundColor: '#11131f',
    cardBorderColor: '#1e2238',
    isDark: true,
    fontPair: 'modern-sans',
    borderRadius: 'rounded',
    sectionStyle: 'bordered',
  },
};

export function getThemePreset(presetKey: ThemePreset): ProposalTheme {
  return THEME_PRESETS[presetKey] || THEME_PRESETS['nyveq-dark'];
}

export function getFontFamilyClass(fontPair?: string): { heading: string; body: string } {
  switch (fontPair) {
    case 'modern-sans':
      return {
        heading: 'font-sans font-bold tracking-tight',
        body: 'font-sans',
      };
    case 'monumental-grotesk':
      return {
        heading: 'font-mono uppercase tracking-widest font-black',
        body: 'font-mono text-xs',
      };
    case 'editorial-serif':
    default:
      return {
        heading: 'font-serif tracking-normal font-normal',
        body: 'font-sans',
      };
  }
}

export function getBorderRadiusClass(radius?: string): string {
  switch (radius) {
    case 'none':
      return 'rounded-none';
    case 'subtle':
      return 'rounded-lg';
    case 'rounded':
    default:
      return 'rounded-2xl';
  }
}

/**
 * Returns inline CSS styles for custom background, text, borders, and accents
 */
export function getThemeStyles(theme?: ProposalTheme): React.CSSProperties {
  if (!theme) return {};

  return {
    ['--proposal-bg' as any]: theme.backgroundColor,
    ['--proposal-text' as any]: theme.textColor,
    ['--proposal-primary' as any]: theme.primaryColor,
    ['--proposal-accent' as any]: theme.accentColor,
    ['--proposal-card-bg' as any]: theme.cardBackgroundColor,
    ['--proposal-card-border' as any]: theme.cardBorderColor,
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
  };
}
