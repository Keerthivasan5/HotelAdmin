import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialFoodItems = {
  Breakfast: [
    { name: 'Idli', price: '30', quantity: 1 },
    { name: 'Dosa', price: '40', quantity: 1 },
    { name: 'Pongal', price: '35', quantity: 1 },
    { name: 'Paniyaram', price: '25', quantity: 1 },
    { name: 'Poori', price: '35', quantity: 1 },
    { name: 'Chapathi', price: '30', quantity: 1 },
    { name: 'Upma', price: '20', quantity: 1 },
    { name: 'Podi Idli', price: '25', quantity: 1 },
    { name: 'Vada', price: '15', quantity: 1 }
  ],
  Lunch: [
    { name: 'Veg Thali', price: '100', quantity: 1 },
    { name: 'Chicken Curry', price: '150', quantity: 1 },
    { name: 'Rice & Sambar', price: '70', quantity: 1 },
    { name: 'Tomato Rice', price: '60', quantity: 1 },
    { name: 'Curd Rice', price: '50', quantity: 1 },
    { name: 'Lemon Rice', price: '55', quantity: 1 },
    { name: 'Biryani', price: '120', quantity: 1 },
    { name: 'Noodles', price: '90', quantity: 1 },
    { name: 'Egg Rice', price: '80', quantity: 1 },
    { name: 'Chicken Rice', price: '140', quantity: 1 }
  ],
  Dinner: [
    { name: 'Chapathi', price: '30', quantity: 1 },
    { name: 'Paneer Curry', price: '100', quantity: 1 },
    { name: 'Paratha', price: '35', quantity: 1 },
    { name: 'Panner Butter Masala', price: '120', quantity: 1 },
    { name: 'Palipalayam', price: '140', quantity: 1 },
    { name: 'Chana Masala', price: '90', quantity: 1 },
    { name: 'Chola Puri', price: '80', quantity: 1 },
    { name: 'Grill', price: '160', quantity: 1 },
    { name: 'Kadai Panner', price: '110', quantity: 1 },
    { name: 'Mutton Curry', price: '180', quantity: 1 }
  ]
};

export default function FoodListScreen({ route, navigation }) {
  const { type } = route.params;
  const [foodData, setFoodData] = useState(initialFoodItems[type]);
  const [selectedItems, setSelectedItems] = useState([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Toggle item selection
  const toggleSelection = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  // Handle price change for an item
  const handlePriceChange = (index, newPrice) => {
    // Validate price
    if (!/^\d+(\.\d{0,2})?$/.test(newPrice) && newPrice !== '') {
      return;
    }
    
    const updatedItems = [...foodData];
    updatedItems[index].price = newPrice;
    setFoodData(updatedItems);
  };

  // Handle quantity change for an item
  const handleQuantityChange = (index, delta) => {
    // Animation for quantity change
    Animated.sequence([
      Animated.timing(scaleAnim, { 
        toValue: 1.2, 
        duration: 150, 
        useNativeDriver: true 
      }),
      Animated.timing(scaleAnim, { 
        toValue: 1, 
        duration: 150, 
        useNativeDriver: true 
      })
    ]).start();

    const updatedItems = [...foodData];
    const currentQty = updatedItems[index].quantity;
    updatedItems[index].quantity = Math.max(1, currentQty + delta);
    setFoodData(updatedItems);
  };

  // Handle adding a new item
  const handleAddItem = () => {
    if (!showAddForm) {
      setShowAddForm(true);
      return;
    }

    if (!newItemName.trim() || !newItemPrice.trim()) {
      Alert.alert('Input Error', 'Please enter both name and price.');
      return;
    }

    // Validate price format
    if (!/^\d+(\.\d{0,2})?$/.test(newItemPrice)) {
      Alert.alert('Input Error', 'Please enter a valid price (e.g., 99 or 99.99)');
      return;
    }

    const newItem = {
      name: newItemName.trim(),
      price: newItemPrice.trim(),
      quantity: 1
    };

    setFoodData([...foodData, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    setShowAddForm(false);
  };

  // Handle removing an item
  const handleRemoveItem = (index) => {
    const updatedItems = foodData.filter((_, i) => i !== index);
    setFoodData(updatedItems);
    setSelectedItems((prevSelected) => {
      // Update selected indices after removing an item
      const newSelected = prevSelected.filter((i) => i !== index);
      return newSelected.map((i) => (i > index ? i - 1 : i));
    });
  };

  // Handle submitting the order

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one item to submit.');
      return;
    }
  
    const selectedFoodItems = selectedItems.map(index => ({
      ...foodData[index],
      price: foodData[index].price.toString()
    }));
  
    const total = selectedFoodItems.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0).toFixed(2);
  
    const newBill = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      items: selectedFoodItems,
      total,
    };
  
    try {
      const storedBills = await AsyncStorage.getItem('billsByDate');
      const billsByDate = storedBills ? JSON.parse(storedBills) : {};
  
      const dateKey = newBill.date;
      if (!billsByDate[dateKey]) {
        billsByDate[dateKey] = [];
      }
      billsByDate[dateKey].push(newBill);
  
      await AsyncStorage.setItem('billsByDate', JSON.stringify(billsByDate));
      
      // Navigate to OrderSummary and pass the bill
      navigation.navigate('OrderSummary', { orderedItems: selectedFoodItems, total });
    } catch (error) {
      console.error('Error saving bill:', error);
      Alert.alert('Error', 'Failed to save the bill. Please try again.');
    }
  };

  // Render an individual food item
  const renderItem = ({ item, index }) => {
    const isSelected = selectedItems.includes(index);

    return (
      <TouchableOpacity onPress={() => toggleSelection(index)} activeOpacity={0.9}>
        <Animated.View
          style={[
            styles.itemCard,
            { transform: [{ scale: scaleAnim }] },
            isSelected && styles.selectedCard
          ]}
        >
          <Text style={styles.itemText}>🍽️ {item.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price (₹): </Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={item.price}
              onChangeText={(text) => handlePriceChange(index, text)}
            />
          </View>
          
          <View style={styles.quantityRow}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange(index, -1)}
            >
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityDisplay}>{item.quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange(index, 1)}
            >
              <Text style={styles.quantityText}>＋</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => handleRemoveItem(index)}
          >
            <Text style={styles.removeButtonText}>🗑️ Remove</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/images/restaurant.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{type} Items</Text>
        
        <FlatList 
          data={foodData} 
          keyExtractor={(item, index) => index.toString()} 
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.newItemContainer}>
          <Text style={styles.addTitle}>Add New Item</Text>
          
          {showAddForm && (
            <>
              <TextInput
                style={styles.newInput}
                placeholder="Item Name"
                value={newItemName}
                onChangeText={setNewItemName}
              />
              <TextInput
                style={styles.newInput}
                placeholder="Item Price"
                keyboardType="numeric"
                value={newItemPrice}
                onChangeText={setNewItemPrice}
              />
            </>
          )}
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>
              {showAddForm ? '✓ Submit Item' : '➕ Add New Item'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton,
            selectedItems.length === 0 && styles.disabledButton
          ]} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#2d3436',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  selectedCard: {
    backgroundColor: '#e3fafc',
    borderWidth: 2,
    borderColor: '#0984e3',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#636e72',
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#b2bec3',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#dfe6e9',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  quantityDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#2d3436',
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#ff7675',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 4,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  newItemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  addTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3436',
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#b2bec3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00b894',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0984e3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#b2bec3',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});