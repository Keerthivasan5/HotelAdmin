import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function OrderSummaryScreen({ route, navigation }) {
  const { orderedItems } = route.params;
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setCurrentDateTime(`${formattedDate} • ${formattedTime}`);

    const total = orderedItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [orderedItems]);

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>🍽 {item.name}</Text>
      <View style={styles.itemDetailsRow}>
        <Text style={styles.itemDetail}>₹{item.price} × {item.quantity}</Text>
        <Text style={styles.itemDetail}>₹{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#fdfbfb', '#ebedee']}
      style={styles.container}
    >
      <Text style={styles.title}>🧾 Order Summary</Text>

      <View style={styles.dateTimeBox}>
        <Text style={styles.dateTimeIcon}>🕒</Text>
        <Text style={styles.dateTimeText}>{currentDateTime}</Text>
      </View>

      <FlatList
        data={orderedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>💰 Total</Text>
        <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#55efc4' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>↩️ Back to Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#74b9ff' }]}
          onPress={() => navigation.navigate('PastBills')}
        >
          <Text style={styles.buttonText}>📜 View Past Bills</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2d3436',
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
  },
  dateTimeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#2d3436',
  },
  flatListContent: {
    paddingBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    width: width * 0.9,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetail: {
    fontSize: 16,
    color: '#636e72',
  },
  totalBox: {
    marginTop: 20,
    backgroundColor: '#ffeaa7',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3436',
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d63031',
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
