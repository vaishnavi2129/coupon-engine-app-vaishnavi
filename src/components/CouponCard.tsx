import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Coupon } from '../types';
import { COLORS, DISCOUNT_TYPE_COLORS } from '../constants';
import { formatDiscount, formatDate } from '../utils/validation';

interface CouponCardProps {
  coupon: Coupon;
  onPress: (coupon: Coupon) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, onPress }) => {
  const isExpired = coupon.status === 'expired';

  return (
    <TouchableOpacity
      style={[styles.card, isExpired && styles.expiredCard]}
      onPress={() => onPress(coupon)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{coupon.code}</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: isExpired ? COLORS.error : COLORS.success },
          ]}
        >
          <Text style={styles.badgeText}>
            {isExpired ? 'Expired' : 'Active'}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {coupon.description}
      </Text>

      <View style={styles.footer}>
        <View
          style={[
            styles.discountBadge,
            { backgroundColor: DISCOUNT_TYPE_COLORS[coupon.discountType] + '20' },
          ]}
        >
          <Text
            style={[
              styles.discountText,
              { color: DISCOUNT_TYPE_COLORS[coupon.discountType] },
            ]}
          >
            {formatDiscount(coupon)}
          </Text>
        </View>
        <Text style={styles.expiry}>
          Expires: {formatDate(coupon.expiryDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  expiredCard: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 13,
    fontWeight: '700',
  },
  expiry: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
