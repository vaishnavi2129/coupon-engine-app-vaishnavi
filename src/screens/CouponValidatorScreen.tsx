import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchCouponByCode } from '../services/mockApi';
import { validateCoupon } from '../utils/validation';
import { useCoupons } from '../context/CouponContext';
import { COLORS } from '../constants';
import { ValidationResult } from '../types';

export const CouponValidatorScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [cartTotal, setCartTotal] = useState('');
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const { appliedCoupons, applyCoupon } = useCoupons();
  const insets = useSafeAreaInsets();

  const handleValidate = async () => {
    if (!code.trim() || !cartTotal.trim()) return;

    setValidating(true);
    setResult(null);

    const coupon = await fetchCouponByCode(code.trim());
    const total = parseFloat(cartTotal);
    const validation = validateCoupon(coupon, total, appliedCoupons);

    setResult(validation);
    setValidating(false);

    if (validation.valid && validation.coupon) {
      applyCoupon({
        coupon: validation.coupon,
        appliedAt: new Date().toISOString(),
        cartTotal: total,
        discountAmount: validation.discountAmount!,
        finalPrice: validation.finalPrice!,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Validate Coupon</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Coupon Code</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder="Enter coupon code (e.g., SAVE20)"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cart Total (₹)</Text>
            <TextInput
              style={styles.input}
              value={cartTotal}
              onChangeText={setCartTotal}
              placeholder="Enter cart total"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, validating && styles.buttonDisabled]}
            onPress={handleValidate}
            disabled={validating || !code.trim() || !cartTotal.trim()}
          >
            <Text style={styles.buttonText}>
              {validating ? 'Validating...' : 'Validate'}
            </Text>
          </TouchableOpacity>

          {result && (
            <View
              style={[
                styles.resultCard,
                result.valid ? styles.validCard : styles.invalidCard,
              ]}
            >
              {result.valid ? (
                <>
                  <Text style={[styles.resultTitle, { color: COLORS.success }]}>
                    ✓ Coupon Applied!
                  </Text>
                  <Text style={styles.resultText}>
                    Discount: ₹{result.discountAmount}
                  </Text>
                  <Text style={styles.resultText}>
                    Final Price: ₹{result.finalPrice}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.resultTitle, { color: COLORS.error }]}>
                    ✗ Invalid Coupon
                  </Text>
                  <Text style={styles.errorText}>{result.error}</Text>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  resultCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  validCard: {
    backgroundColor: COLORS.success + '10',
    borderColor: COLORS.success,
  },
  invalidCard: {
    backgroundColor: COLORS.error + '10',
    borderColor: COLORS.error,
  },
  resultTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  resultText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  errorText: { fontSize: 15, color: COLORS.error, lineHeight: 22 },
});
