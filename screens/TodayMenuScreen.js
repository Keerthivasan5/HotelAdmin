import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function TodayMenuScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/restaurant.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Today's Menu</Text>

        {/* Navigate to TodayItemScreen for Breakfast */}
        <TouchableOpacity
          style={[styles.card, styles.card1]}
          onPress={() => navigation.navigate('TodayItem', { type: 'Breakfast' })}
        >
          <Text style={styles.cardText}>🍳 Breakfast</Text>
        </TouchableOpacity>

        {/* Still using FoodList for Lunch and Dinner, update if needed */}
        <TouchableOpacity
          style={[styles.card, styles.card2]}
          onPress={() => navigation.navigate('TodayItem', { type: 'Lunch' })}
        >
          <Text style={styles.cardText}>🥗 Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.card3]}
          onPress={() => navigation.navigate('TodayItem', { type: 'Dinner' })}
        >
          <Text style={styles.cardText}>🍽️ Dinner</Text>
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
    backgroundColor: 'rgba(16, 214, 236, 0.6)',  // Slightly transparent background for a cleaner effect
    margin: 20,
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',  // White title for a better contrast against background
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,  // To give it a nice shadow effect
  },
  card1: {
    backgroundColor: '#FFB84D',  // Light yellow-orange for Breakfast
  },
  card2: {
    backgroundColor: '#56CCF2',  // Soft blue for Lunch
  },
  card3: {
    backgroundColor: '#FF5F5F',  // Light red for Dinner
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',  // White text for readability
  },
});
