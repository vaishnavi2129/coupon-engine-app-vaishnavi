import React, { createContext, useContext, useState, useCallback } from 'react';
import { Coupon, AppliedCoupon, CouponFilter } from '../types';
import { fetchCoupons } from '../services/mockApi';

interface CouponContextType {
  coupons: Coupon[];
  appliedCoupons: AppliedCoupon[];
  loading: boolean;
  error: string | null;
  filter: CouponFilter;
  loadCoupons: () => Promise<void>;
  applyCoupon: (appliedCoupon: AppliedCoupon) => void;
  removeCoupon: (couponId: string) => void;
  setFilter: (filter: CouponFilter) => void;
  filteredCoupons: Coupon[];
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [appliedCoupons, setAppliedCoupons] = useState<AppliedCoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CouponFilter>({
    searchQuery: '',
    discountType: 'all',
  });

  const loadCoupons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoupons();
      setCoupons(data);
    } catch (err) {
      setError('Failed to load coupons. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyCoupon = useCallback((appliedCoupon: AppliedCoupon) => {
    setAppliedCoupons((prev) => [...prev, appliedCoupon]);
  }, []);

  const removeCoupon = useCallback((couponId: string) => {
    setAppliedCoupons((prev) => prev.filter((ac) => ac.coupon.id !== couponId));
  }, []);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      filter.searchQuery === '' ||
      coupon.code.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchesType =
      filter.discountType === 'all' || coupon.discountType === filter.discountType;

    return matchesSearch && matchesType;
  });

  return (
    <CouponContext.Provider
      value={{
        coupons,
        appliedCoupons,
        loading,
        error,
        filter,
        loadCoupons,
        applyCoupon,
        removeCoupon,
        setFilter,
        filteredCoupons,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = (): CouponContextType => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
};
