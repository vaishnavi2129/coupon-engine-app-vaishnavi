import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCoupons } from '../context/CouponContext';
import { COLORS } from '../constants';
import { formatDate } from '../utils/validation';
import { EmptyState } from '../components/EmptyState';

export const AppliedCouponsScreen: React.FC = () => {
  const { appliedCoupons, removeCoupon } = useCoupons();
  const insets = useSafeAreaInsets();

  if (appliedCoupons.length === 0) {
    return (
      <EmptyState
        message="No coupons applied yet"
        subMessage="Go to the Validator tab to apply coupons"
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Applied Coupons</Text>
      <Text style={styles.subtitle}>
        {appliedCoupons.length} coupon{appliedCoupons.length !== 1 ? 's' : ''} in this session
      </Text>

      <FlatList
        data={appliedCoupons}
        keyExtractor={(item) => item.coupon.id + item.appliedAt}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.code}>{item.coupon.code}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeCoupon(item.coupon.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.discount}>
              Saved ₹{item.discountAmount}
            </Text>
            <View style={styles.row}>
              <Text style={styles.detail}>Cart: ₹{item.cartTotal}</Text>
              <Text style={styles.detail}>Final: ₹{item.finalPrice}</Text>
            </View>
            <Text style={styles.date}>
              Applied: {formatDate(item.appliedAt)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 16,
    marginTop: 4,
  },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  removeButton: {
    backgroundColor: COLORS.error + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '600',
  },
  discount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.success,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
