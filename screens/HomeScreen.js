import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons, MaterialIcons,  Feather } from '@expo/vector-icons';
import { Modal } from 'react-native';


const properties = [
  {
    id: '1',
    image: require('../assets/house1.jpg'),
    price: '₹2.5 Cr',
    bedrooms: 3,
    bathrooms: 2,
    area: '1500 sqft',
    location: 'Pune, Maharashtra', 
    description: 'A beautiful 3BHK in the heart of the city.',
  },
  {
    id: '2',
    image: require('../assets/house2.jpg'),
    price: '₹4.2 Cr',
    bedrooms: 4,
    bathrooms: 3,
    area: '2100 sqft',
    location: 'Pune, Maharashtra', 
    description: 'Spacious family home with a garden.',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCommercialOnly, setIsCommercialOnly] = useState(false);

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  const renderProperty = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { property: item })}
    >
      <Image source={item.image} style={styles.image} />
      
      
      <View style={styles.locationRow}>
        <FontAwesome name="map-marker" size={16} color="gray" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      <Text style={styles.price}>{item.price}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <FontAwesome name="bed" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.bedrooms} </Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="bath" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.bathrooms} </Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="expand" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.area}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
     
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by area"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Ionicons name="options-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownRow}>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.dropdownText}>Buy</Text>
          <Feather name="chevron-down" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Property Type</Text>
          <Feather name="chevron-down" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Price</Text>
          <Feather name="chevron-down" size={16} />
        </TouchableOpacity>
      </View>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Category</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalOption}>
              <Text>Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text>New Projects</Text>
            </TouchableOpacity>

            <View style={styles.toggleRow}>
              <Text>View commercial properties only</Text>
              <Switch
                value={isCommercialOnly}
                onValueChange={(val) => setIsCommercialOnly(val)}
              />
            </View>

            <TouchableOpacity style={styles.showButton}>
              <Text style={styles.showButtonText}>Show {properties.length} Properties</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  searchBox: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: { 
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  locationRow: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  detailItem: {
  flexDirection: 'row',    
  alignItems: 'center',     
  marginHorizontal: 4,    
},
modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  closeText: {
    fontSize: 20,
    color: '#888',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4, 
  },
  showButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  showButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdownRow: {
  flexDirection: 'row',       
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginTop: 16,
},

dropdownButton: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginHorizontal: 4,
  flex: 1,                   
},
});
