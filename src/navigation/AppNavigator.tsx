import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CouponListScreen } from '../screens/CouponListScreen';
import { CouponDetailScreen } from '../screens/CouponDetailScreen';
import { CouponValidatorScreen } from '../screens/CouponValidatorScreen';
import { AppliedCouponsScreen } from '../screens/AppliedCouponsScreen';
import { COLORS } from '../constants';
import { Coupon } from '../types';

export type RootStackParamList = {
  CouponList: undefined;
  CouponDetail: { coupon: Coupon };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function CouponStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background }
      }}
    >
      <Stack.Screen name="CouponList" component={CouponListScreen} />
      <Stack.Screen name="CouponDetail" component={CouponDetailScreen} />
    </Stack.Navigator>
  );
}

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarStyle: {
            borderTopColor: COLORS.border,
            paddingTop: 4,
            height: 60,
            paddingBottom: 8,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Browse"
          component={CouponStack}
          options={{
            tabBarLabel: 'Browse',
          }}
        />
        <Tab.Screen
          name="Validator"
          component={CouponValidatorScreen}
          options={{
            tabBarLabel: 'Validate',
          }}
        />
        <Tab.Screen
          name="Applied"
          component={AppliedCouponsScreen}
          options={{
            tabBarLabel: 'Applied',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};