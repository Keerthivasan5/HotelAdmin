import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/restaurant.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Navigate to ItemCategory on List of Items press */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ItemCategory')}>
          <Text style={styles.cardText}>🛒 List of Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TodayMenu')}>
          <Text style={styles.cardText}>🍽️ Today Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Revenue')}>
          <Text style={styles.cardText}>📊 Total Revenue</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('PastBills')} style={styles.card}>
          <Text style={styles.cardText}>📜 View Past Bills</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(16, 214, 236, 0.34)',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
