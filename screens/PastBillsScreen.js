import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PastBillsScreen({ navigation }) {
  const [billsByDate, setBillsByDate] = useState({});

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const storedBills = await AsyncStorage.getItem('billsByDate');
        if (storedBills) {
          setBillsByDate(JSON.parse(storedBills));
        }
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchBills);
    return unsubscribe;
  }, [navigation]);

  const renderBill = ({ item }) => (
    <View style={styles.billCard}>
      <Text style={styles.time}>🕒 {item.time}</Text>
      {item.items.map((food, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemText}>{food.name} × {food.quantity}</Text>
          <Text style={styles.itemText}>₹{(food.price * food.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <Text style={styles.totalText}>Total: ₹{item.total}</Text>
    </View>
  );

  const renderSection = ([date, bills]) => (
    <View key={date} style={styles.section}>
      <Text style={styles.dateHeading}>📅 {date}</Text>
      <FlatList
        data={bills}
        renderItem={renderBill}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📜 Past Bills</Text>
      {Object.keys(billsByDate).length === 0 ? (
        <Text style={styles.noBillsText}>No past bills found.</Text>
      ) : (
        Object.entries(billsByDate)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(renderSection)
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  noBillsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  dateHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  billCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  time: {
    fontSize: 14,
    marginBottom: 8,
    color: '#444',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  totalText: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
