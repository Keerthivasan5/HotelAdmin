import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ItemCategoryScreen from '../screens/ItemCategoryScreen';
import FoodListScreen from '../screens/FoodListScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import TodayMenuScreen from '../screens/TodayMenuScreen';
import TodayItemScreen from '../screens/TodayItemScreen';
import PastBillsScreen from '../screens/PastBillsScreen';
import StoredBillsScreen from '../screens/StoredBillsScreen';
import RevenueScreen from '../screens/RevenueScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ItemCategory" component={ItemCategoryScreen} />
      <Stack.Screen name="FoodList" component={FoodListScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen}/>
      <Stack.Screen name="TodayMenu" component={TodayMenuScreen} />
      <Stack.Screen name="TodayItem" component={TodayItemScreen} />
      <Stack.Screen name="PastBills" component={PastBillsScreen} />
      <Stack.Screen name="StoredBills" component={StoredBillsScreen} />
      <Stack.Screen name="Revenue" component={RevenueScreen} />
    </Stack.Navigator>
  );
}
