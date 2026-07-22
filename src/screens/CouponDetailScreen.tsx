import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { RouteProp } from '@react-navigation/native';
import { COLORS, DISCOUNT_TYPE_COLORS } from '../constants';
import { formatDiscount, formatDate } from '../utils/validation';

type RootStackParamList = {
  CouponDetail: { coupon: any };
};

interface CouponDetailScreenProps {
  route: RouteProp<RootStackParamList, 'CouponDetail'>;
}

export const CouponDetailScreen: React.FC<CouponDetailScreenProps> = ({
  route,
}) => {
  const { coupon } = route.params;
  const isExpired = coupon.status === 'expired';

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(coupon.code);
    Alert.alert('Copied!', `Coupon code "${coupon.code}" copied to clipboard.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.codeContainer}>
            <Text style={styles.code}>{coupon.code}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isExpired ? COLORS.error : COLORS.success,
              },
            ]}
          >
            <Text style={styles.statusText}>
              {isExpired ? 'Expired' : 'Active'}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{coupon.description}</Text>

        <View
          style={[
            styles.discountBanner,
            {
              backgroundColor:
                DISCOUNT_TYPE_COLORS[coupon.discountType] + '15',
            },
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

        <View style={styles.detailsSection}>
          <DetailRow label="Discount Type" value={coupon.discountType.replace('_', ' ').toUpperCase()} />
          <DetailRow
            label="Discount Value"
            value={
              coupon.discountType === 'percentage'
                ? `${coupon.discountValue}%`
                : coupon.discountType === 'flat'
                ? `₹${coupon.discountValue}`
                : 'Free'
            }
          />
          <DetailRow
            label="Minimum Order"
            value={`₹${coupon.minOrderValue}`}
          />
          <DetailRow label="Expiry Date" value={formatDate(coupon.expiryDate)} />
          <DetailRow
            label="Applicable Categories"
            value={coupon.applicableCategories.join(', ')}
          />
        </View>

        <TouchableOpacity
          style={[styles.copyButton, isExpired && styles.disabledButton]}
          onPress={handleCopyCode}
          disabled={isExpired}
          activeOpacity={0.8}
        >
          <Text style={styles.copyButtonText}>
            {isExpired ? 'Coupon Expired' : 'Copy Code'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 20,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  codeContainer: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  code: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  discountBanner: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  discountText: {
    fontSize: 24,
    fontWeight: '800',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  copyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.textMuted,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
