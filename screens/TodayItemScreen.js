import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function TodayItemScreen({ route }) {
  const { type } = route.params;

  const initialMenuItems = {
    Breakfast: [
      'Idli', 'Dosa', 'Pongal', 'Pniyaram', 'Poori',
      'Chapathi', 'Pongal', 'Podi Idli', 'Vada',
    ],
    Lunch: [
      'Veg Thali', 'Chicken Curry', 'Rice & Sambar', 'Tomato Rice', 'Curd Rice',
      'Lemon Rice', 'Biryani', 'Noodles', 'Egg Rice', 'Chicken Rice',
    ],
    Dinner: [
      'Chapathi', 'Paneer Curry', 'Paratha', 'Paneer Butter Masala', 'Palipalayam',
      'Chana Masala', 'Chola Puri', 'Grill', 'Kadai Paneer', 'Mutton Curry',
    ],
  };

  const [items, setItems] = useState(initialMenuItems[type] || []);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <ImageBackground
      source={require('../assets/images/restaurant.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.15 }}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.heading}>🍽️ Today’s {type} Items</Text>

        <ScrollView style={styles.list}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemText}>• {item}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(index)}
              >
                <Text style={styles.removeButtonText}>🗑️ Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Add new item..."
          value={newItem}
          onChangeText={setNewItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 214, 236, 0.6)',
    padding: 24,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  itemText: {
    fontSize: 20,
    color: '#333',
    flex: 1,
  },
  removeButton: {
    marginLeft: 12,
    backgroundColor: '#FF5C5C',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
