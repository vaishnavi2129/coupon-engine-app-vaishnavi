import { Coupon, ValidationResult, AppliedCoupon } from '../types';

export const isCouponExpired = (expiryDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  return expiry < today;
};

export const calculateDiscount = (
  coupon: Coupon,
  cartTotal: number
): number => {
  if (coupon.discountType === 'free_shipping') {
    return 0;
  }
  if (coupon.discountType === 'percentage') {
    return Math.round((cartTotal * coupon.discountValue) / 100);
  }
  // flat
  return coupon.discountValue;
};

export const validateCoupon = (
  coupon: Coupon | null,
  cartTotal: number,
  appliedCoupons: AppliedCoupon[]
): ValidationResult => {
  if (!coupon) {
    return {
      valid: false,
      error: 'Invalid coupon code. Please check and try again.',
      errorCode: 'INVALID_CODE',
    };
  }

  if (isCouponExpired(coupon.expiryDate)) {
    return {
      valid: false,
      error: `This coupon expired on ${coupon.expiryDate}.`,
      errorCode: 'EXPIRED',
    };
  }

  if (cartTotal < coupon.minOrderValue) {
    return {
      valid: false,
      error: `Minimum order value of ₹${coupon.minOrderValue} required. Your cart total is ₹${cartTotal}.`,
      errorCode: 'MIN_ORDER_NOT_MET',
    };
  }

  const alreadyApplied = appliedCoupons.some(
    (ac) => ac.coupon.code.toUpperCase() === coupon.code.toUpperCase()
  );
  if (alreadyApplied) {
    return {
      valid: false,
      error: 'This coupon has already been applied to your cart.',
      errorCode: 'ALREADY_APPLIED',
    };
  }

  const discountAmount = calculateDiscount(coupon, cartTotal);
  const finalPrice = Math.max(0, cartTotal - discountAmount);

  return {
    valid: true,
    coupon,
    discountAmount,
    finalPrice,
  };
};

export const formatDiscount = (coupon: Coupon): string => {
  switch (coupon.discountType) {
    case 'percentage':
      return `${coupon.discountValue}% off`;
    case 'flat':
      return `₹${coupon.discountValue} off`;
    case 'free_shipping':
      return 'Free Shipping';
    default:
      return '';
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
