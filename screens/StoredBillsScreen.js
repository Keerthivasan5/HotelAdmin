import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StoredBillsScreen() {
  const [storedBills, setStoredBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const stored = await AsyncStorage.getItem('bills');
        if (stored) {
          setStoredBills(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load stored bills:', error);
      }
    };

    fetchBills();
  }, []);

  const renderBill = ({ item }) => (
    <View style={styles.billContainer}>
      <Text style={styles.date}>{item.dateTime}</Text>
      {item.items.map((food, index) => (
        <Text key={index} style={styles.item}>
          🍽️ {food.name} - ₹{food.price} x {food.quantity}
        </Text>
      ))}
      <Text style={styles.total}>Total: ₹{item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stored Bills</Text>
      <FlatList
        data={storedBills}
        keyExtractor={(item) => item.id}
        renderItem={renderBill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  billContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  date: { fontSize: 16, color: '#666', marginBottom: 5 },
  item: { fontSize: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});
