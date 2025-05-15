import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function ItemCategoryScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/restaurant.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Select Meal Category</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FoodList', { type: 'Breakfast' })}
        >
          <Text style={styles.buttonText}>🍳 Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FoodList', { type: 'Lunch' })}
        >
          <Text style={styles.buttonText}>🥗 Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FoodList', { type: 'Dinner' })}
        >
          <Text style={styles.buttonText}>🍽️ Dinner</Text>
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
    backgroundColor: 'rgba(16, 214, 236, 0.6))',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff7043',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
