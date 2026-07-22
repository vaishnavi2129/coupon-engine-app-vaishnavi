export type DiscountType = 'percentage' | 'flat' | 'free_shipping';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  applicableCategories: string[];
  status: 'active' | 'expired';
}

export interface AppliedCoupon {
  coupon: Coupon;
  appliedAt: string;
  cartTotal: number;
  discountAmount: number;
  finalPrice: number;
}

export interface ValidationResult {
  valid: boolean;
  coupon?: Coupon;
  discountAmount?: number;
  finalPrice?: number;
  error?: string;
  errorCode?: 'INVALID_CODE' | 'EXPIRED' | 'MIN_ORDER_NOT_MET' | 'ALREADY_APPLIED';
}

export interface CouponFilter {
  searchQuery: string;
  discountType: DiscountType | 'all';
}
