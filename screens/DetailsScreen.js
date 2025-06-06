import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DetailsScreen({ route }) {
  const { property } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={property.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.price}>{property.price}</Text>

        <View style={styles.detailsRow}>
          <FontAwesome name="bed" size={16} color="gray" />
          <Text style={styles.detailText}>{property.bedrooms} Bedrooms</Text>
        </View>

        <View style={styles.detailsRow}>
          <FontAwesome name="bath" size={16} color="gray" />
          <Text style={styles.detailText}>{property.bathrooms} Bathrooms</Text>
        </View>

        <View style={styles.detailsRow}>
          <FontAwesome name="arrows-alt" size={16} color="gray" />
          <Text style={styles.detailText}>{property.size}</Text>
        </View>

        <Text style={styles.description}>{property.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
