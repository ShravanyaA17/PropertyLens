import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter Properties</Text>

      <Text style={styles.label}>Listing Type:</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}><Text>Rent</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text>Buy</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text>New Projects</Text></TouchableOpacity>
      </View>

      <Text style={styles.label}>Completion Status:</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}><Text>Ready to Move</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text>Under Construction</Text></TouchableOpacity>
      </View>

      <Text style={styles.label}>Property Type:</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}><Text>Apartment</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text>Villa</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text>Plot</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});
