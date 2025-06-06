import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PropertyCard({ image, price, bedrooms, bathrooms, area, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.row}>
          <FontAwesome5 name="bed" size={16} />
          <Text> {bedrooms} </Text>
          <FontAwesome5 name="bath" size={16} style={{ marginLeft: 10 }} />
          <Text> {bathrooms} </Text>
          <FontAwesome5 name="ruler-combined" size={16} style={{ marginLeft: 10 }} />
          <Text> {area} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    height: 200,
    width: '100%',
  },
  info: {
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
