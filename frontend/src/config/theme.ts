/**
 * High-Contrast Accessible Theme for Rural Education
 * Udaan — Govt. of Odisha SIH25048
 */

export const colors = {
  // Brand Palette
  primary: '#2E7D32',       // Odisha Village Green
  primaryDark: '#1B5E20',   // Deep Forest Green
  primaryLight: '#E8F5E9',  // Mint Leaf Light
  forestGreen: '#2E7D32',   // Forest Green Alias
  secondary: '#F57C00',     // Terracotta Sun Orange
  secondaryDark: '#E65100', // Burnt Amber
  accent: '#0288D1',        // Odisha Sky Blue
  skyBlue: '#0288D1',       // Sky Blue Alias
  skyBlueDark: '#01579B',   // Deep Sky Blue Alias
  solarYellow: '#FBC02D',   // Star Gold
  solarYellowLight: '#FFF9C4', // Soft Star Glow
  warmClay: '#D84315',      // Village Earth Clay

  // Functional & High Contrast Colors
  success: '#388E3C',
  warning: '#F57C00',
  error: '#D32F2F',
  info: '#1976D2',

  // Backgrounds & Cards
  background: '#F9FBE7',    // Warm Paper Off-White
  cardBg: '#FFFFFF',
  cardBgLight: '#F1F8E9',
  nurseryBg: '#E8F5E9',

  // Text Colors (High Contrast Ratio)
  textPrimary: '#1A237E',   // Deep Charcoal Navy (easy to read on low-res screens)
  textSecondary: '#424242',
  textMuted: '#616161',
  textLight: '#FFFFFF',

  // UI Borders & Elements
  border: '#C8E6C9',
  borderDark: '#81C784',
  shadowColor: '#000000',
  disabled: '#BDBDBD',
  disabledBg: '#E0E0E0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    bold: 'System',
    heading: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    nurseryBig: 40,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 34,
    xxl: 42,
  },
};

export const layout = {
  borderRadius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  minTouchTarget: 52,     // Standard accessible touch size
  nurseryTouchTarget: 68, // Extra large for small hands / low-literacy users
  elevation: {
    low: 2,
    medium: 5,
    high: 8,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  layout,
};

export default theme;
