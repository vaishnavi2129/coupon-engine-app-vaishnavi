import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DiscountType } from '../types';
import { COLORS, DISCOUNT_TYPE_LABELS } from '../constants';

interface FilterChipsProps {
  selected: DiscountType | 'all';
  onSelect: (type: DiscountType | 'all') => void;
}

const options: { label: string; value: DiscountType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: DISCOUNT_TYPE_LABELS.percentage, value: 'percentage' },
  { label: DISCOUNT_TYPE_LABELS.flat, value: 'flat' },
  { label: DISCOUNT_TYPE_LABELS.free_shipping, value: 'free_shipping' },
];

export const FilterChips: React.FC<FilterChipsProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        decelerationRate="fast"
      >
        {options.map((option) => {
          const isActive = selected === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.chip, isActive && styles.activeChip]}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.chipText, isActive && styles.activeChipText]}
                numberOfLines={1}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 4,
    height: 48,
    width: '100%',
  },
  content: {
    paddingRight: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 10,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
