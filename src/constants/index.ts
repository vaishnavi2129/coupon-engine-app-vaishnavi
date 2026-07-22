export const COLORS = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  background: '#F9FAFB',
  card: '#FFFFFF',
  border: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

export const DISCOUNT_TYPE_LABELS: Record<string, string> = {
  percentage: 'Percentage Off',
  flat: 'Flat Discount',
  free_shipping: 'Free Shipping',
};

export const DISCOUNT_TYPE_COLORS: Record<string, string> = {
  percentage: '#8B5CF6',
  flat: '#F59E0B',
  free_shipping: '#10B981',
};

export const MOCK_API_DELAY = 800;
