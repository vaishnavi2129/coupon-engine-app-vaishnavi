import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCoupons } from '../context/CouponContext';
import { CouponCard } from '../components/CouponCard';
import { SearchBar } from '../components/SearchBar';
import { FilterChips } from '../components/FilterChips';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { COLORS } from '../constants';
import { Coupon } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  CouponList: undefined;
  CouponDetail: { coupon: Coupon };
};

interface CouponListScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CouponList'>;
}

const { height } = Dimensions.get('window');

export const CouponListScreen: React.FC<CouponListScreenProps> = ({
  navigation,
}) => {
  const { filteredCoupons, loading, error, filter, setFilter, loadCoupons } =
    useCoupons();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCouponPress = (coupon: Coupon) => {
    navigation.navigate('CouponDetail', { coupon });
  };

  if (loading && filteredCoupons.length === 0) {
    return <LoadingState />;
  }

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Fixed Header Section */}
      <View style={[styles.headerSection, { paddingTop: insets.top + 10 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Coupons</Text>
          <Text style={styles.subtitle}>
            {filteredCoupons.length} coupon{filteredCoupons.length !== 1 ? 's' : ''} available
          </Text>
        </View>

        <SearchBar
          value={filter.searchQuery}
          onChangeText={(text) =>
            setFilter({ ...filter, searchQuery: text })
          }
          placeholder="Search by code or description"
        />

        <FilterChips
          selected={filter.discountType}
          onSelect={(type) => setFilter({ ...filter, discountType: type })}
        />
      </View>

      {/* Scrollable List Section */}
      <View style={styles.listContainer}>
        {error ? (
          <EmptyState message={error} subMessage="Pull down to retry" />
        ) : filteredCoupons.length === 0 ? (
          <EmptyState
            message="No coupons found"
            subMessage="Try adjusting your search or filters"
          />
        ) : (
          <FlatList
            data={filteredCoupons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CouponCard coupon={item} onPress={handleCouponPress} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={loadCoupons}
                tintColor={COLORS.primary}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});
