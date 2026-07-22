import { Coupon } from '../types';
import { MOCK_API_DELAY } from '../constants';

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SAVE20',
    description: 'Get 20% off on all courses this summer',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 500,
    expiryDate: '2026-12-31',
    applicableCategories: ['All courses'],
    status: 'active',
  },
  {
    id: '2',
    code: 'FLAT100',
    description: 'Flat ₹100 off on your next purchase',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 300,
    expiryDate: '2026-08-15',
    applicableCategories: ['All courses', 'Science'],
    status: 'active',
  },
  {
    id: '3',
    code: 'FREESHIP',
    description: 'Free shipping on orders above ₹999',
    discountType: 'free_shipping',
    discountValue: 0,
    minOrderValue: 999,
    expiryDate: '2026-09-30',
    applicableCategories: ['All courses'],
    status: 'active',
  },
  {
    id: '4',
    code: 'SCIENCE50',
    description: '50% off on all Science courses',
    discountType: 'percentage',
    discountValue: 50,
    minOrderValue: 1000,
    expiryDate: '2025-06-30',
    applicableCategories: ['Science only'],
    status: 'expired',
  },
  {
    id: '5',
    code: 'WELCOME25',
    description: 'Welcome offer - 25% off for new users',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 200,
    expiryDate: '2026-11-30',
    applicableCategories: ['All courses'],
    status: 'active',
  },
  {
    id: '6',
    code: 'FLAT500',
    description: 'Flat ₹500 off on premium plans',
    discountType: 'flat',
    discountValue: 500,
    minOrderValue: 2000,
    expiryDate: '2026-10-31',
    applicableCategories: ['Premium', 'All courses'],
    status: 'active',
  },
  {
    id: '7',
    code: 'EXPIRED10',
    description: 'This coupon has already expired',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 100,
    expiryDate: '2024-01-01',
    applicableCategories: ['All courses'],
    status: 'expired',
  },
  {
    id: '8',
    code: 'MATH30',
    description: '30% off on Mathematics courses',
    discountType: 'percentage',
    discountValue: 30,
    minOrderValue: 400,
    expiryDate: '2026-07-30',
    applicableCategories: ['Mathematics'],
    status: 'active',
  },
  {
    id: '9',
    code: 'SHIPFREE',
    description: 'Free shipping sitewide',
    discountType: 'free_shipping',
    discountValue: 0,
    minOrderValue: 0,
    expiryDate: '2025-12-31',
    applicableCategories: ['All courses'],
    status: 'expired',
  },
  {
    id: '10',
    code: 'MEGA200',
    description: 'Mega sale - ₹200 flat discount',
    discountType: 'flat',
    discountValue: 200,
    minOrderValue: 800,
    expiryDate: '2026-12-25',
    applicableCategories: ['All courses', 'Science', 'Mathematics'],
    status: 'active',
  },
];

export const fetchCoupons = (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCoupons]);
    }, MOCK_API_DELAY);
  });
};

export const fetchCouponByCode = (code: string): Promise<Coupon | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const coupon = mockCoupons.find(
        (c) => c.code.toUpperCase() === code.toUpperCase()
      );
      resolve(coupon || null);
    }, MOCK_API_DELAY);
  });
};
