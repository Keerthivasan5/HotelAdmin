import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function RevenueScreen() {
  return (
    <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>💹 Revenue Dashboard</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => alert('📈 Monthly Revenue')}>
          <Icon name="calendar-outline" size={28} color="#6a4c93" style={styles.icon} />
          <Text style={styles.cardText}>📈 Monthly Revenue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => alert('📅 Yearly Revenue')}>
          <Icon name="calendar-number-outline" size={28} color="#6a4c93" style={styles.icon} />
          <Text style={styles.cardText}>📅 Yearly Revenue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => alert('📋 Date-wise Revenue')}>
          <Icon name="bar-chart-outline" size={28} color="#6a4c93" style={styles.icon} />
          <Text style={styles.cardText}>📋 Date-wise Revenue</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3e2f5b',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3e2f5b',
  },
});
