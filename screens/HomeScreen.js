import React, { useState, useRef } from 'react';
import {
  View,
  Linking,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
  Pressable
  
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ActionSheet from 'react-native-actionsheet';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons, MaterialIcons,  Feather } from '@expo/vector-icons';
import { Modal } from 'react-native';
import BottomNav from '../components/BottomNav';
import NavToggleButton from '../components/NavToggleButton';


const properties = [
  {
    id: '1',
    image: require('../assets/house1.jpg'),
    price: '₹2.5 Cr',
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: '1500 sqft',
    location: 'Pune, Maharashtra', 
    description: 'A beautiful 3BHK in the heart of the city.',
    statusOptions: 'off-plan',
    vaastuVerified: true,
    builderName: 'Godrej Builders',
    completionDate: '01-08-2025',
    constructionDate: '01-02-2026',
    status: 'Under Construction',
    mahareraVerified: true,
    mahareraId: 'P52100012345',
    pandoraBox: true,
  },
  {
    id: '2',
    image: require('../assets/house2.jpg'),
    price: '₹4.2 Cr',
    propertyType: "Apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: '2100 sqft',
    location: 'Pune, Maharashtra', 
    description: 'Spacious family home with a garden.',
    statusOptions: 'ready',
    vaastuVerified: false,
    builderName: 'Godrej Builders',
    completionDate: '18-12-2025',
    constructionDate: '21-02-2025',
    status: 'Under Construction',
    mahareraVerified: true,
    mahareraId: 'P52300012345',
    pandoraBox: true,
  },
];

export default function HomeScreen() {
  const [featuredMenuVisible, setFeaturedMenuVisible] = useState(false);
  const [selectedFeaturedOption, setSelectedFeaturedOption] = useState('Featured');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsProperty, setDetailsProperty] = useState(null);  
  const [detailsModalVisible2, setDetailsModalVisible2] = useState(false);  
  const [detailsProperty2, setDetailsProperty2] = useState(null);

  const options = ['Featured', 'Newest', 'Price (Low)', 'Price (High)', 'Verified First'];
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCommercialOnly, setIsCommercialOnly] = useState(false);
  const categories = ["Rent", "Buy", "New Projects"];
  const [selectedCategory, setSelectedCategory] = useState("Rent");
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const [categoryContainerWidth, setCategoryContainerWidth] = useState(0);
  const [statusContainerWidth, setStatusContainerWidth] = useState(0);
  const mainActionSheetRef = useRef();
  const agentActionSheetRef = useRef();
  const statusOptions = ['Any', 'Off-plan', 'Ready'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('any');
  const categoryIndicatorPosition = useRef(new Animated.Value(0)).current;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const salesOfficeNumber = '+918920666741';
  const agentNumbers = ['+919876543210', '+919123456789', '+918765432109'];
  const [selected, setSelected] = useState('search');
  const [savedProperties, setSavedProperties] = useState([]);

  const toggleSave = (propertyId) => {
  setSavedProperties((prev) =>
    prev.includes(propertyId)
      ? prev.filter((id) => id !== propertyId)
      : [...prev, propertyId]
  );
};

  const handleFeaturedSelect = (option) => {
  setSelectedFeaturedOption(option);
  setFeaturedMenuVisible(false);
}; 

  const handleCategorySelect = (index) => {
    setSelectedCategoryIndex(index);
    setSelectedCategory(categories[index]);

    Animated.spring(categoryIndicatorPosition, {
      toValue: (categoryContainerWidth / categories.length) * index,
      useNativeDriver: false,
    }).start();
  };

  const handleSelect = (index) => {
    setSelectedIndex(index); 

    const selected = statusOptions[index].toLowerCase(); 
    setSelectedStatus(selected); 

    Animated.spring(indicatorPosition, {
      toValue: (statusContainerWidth / statusOptions.length) * index,
      useNativeDriver: false,
    }).start();
  };
  

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleCallOptions = () => {
    mainActionSheetRef.current.show();
  };

  const handleMainOption = (index) => {
    if (index === 1) {
      handleCall(salesOfficeNumber); 
    } else if (index === 2) {
      agentActionSheetRef.current.show(); 
    }
  };

  const handleAgentSelection = (index) => {
    if (index > 0 && index <= agentNumbers.length) {
      handleCall(agentNumbers[index - 1]);
    }
  };

  const handleWhatsApp = (phoneNumber) => {
    const message = "Hey, I am interested in this property";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed');
    });
  };


  const BottomNav = () => {
  
  
  return (
  <View style={styles.navContainer}>
   
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => setSelected('search')}
    >
      <View
        style={{
          backgroundColor: selected === 'search' ? '#2C6F4A' : '#fff8e1',
          borderRadius: 50,
          padding: 10,
          elevation: 5,
          shadowColor: '#bfa145',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <MaterialIcons
          name="travel-explore"
          size={25}
          color={selected === 'search' ? '#FFC35A' : '#555'}
        />
      </View>
      <Text style={[styles.navLabel, selected === 'search' && styles.navLabelSelected]}>
        Search
      </Text>
    </TouchableOpacity>

    
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => setSelected('saved')}
    >
      <View
        style={{
          backgroundColor: selected === 'saved' ? '#2C6F4A' : '#fff8e1',
          borderRadius: 50,
          padding: 10,
          elevation: 5,
          shadowColor: '#bfa145',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <Feather name="users" size={24} color={selected === 'saved' ? '#FFC35A' : '#555'} />
      </View>
      <Text style={[styles.navLabel, selected === 'saved' && styles.navLabelSelected]}>
        Agents
      </Text>
    </TouchableOpacity>

  
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => setSelected('magazine')}
    >
      <View
        style={{
          backgroundColor: selected === 'magazine' ? '#2C6F4A' : '#fff8e1',
          borderRadius: 50,
          padding: 10,
          elevation: 5,
          shadowColor: '#bfa145',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <FontAwesome5
          name="newspaper"
          size={24}
          color={selected === 'magazine' ? '#FFC35A' : '#555'}
        />
      </View>
      <Text style={[styles.navLabel, selected === 'magazine' && styles.navLabelSelected]}>
        Magazine
      </Text>
    </TouchableOpacity>

    
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => setSelected('vr')}
    >
      <View
        style={{
          backgroundColor: selected === 'vr' ? '#2C6F4A' : '#fff8e1',
          borderRadius: 50,
          padding: 10,
          elevation: 5,
          shadowColor: '#bfa145',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <MaterialCommunityIcons
          name="google-cardboard"
          size={24}
          color={selected === 'vr' ? '#FFC35A' : '#555'}
        />
      </View>
      <Text style={[styles.navLabel, selected === 'vr' && styles.navLabelSelected]}>
        VR
      </Text>
    </TouchableOpacity>

  
    
  </View>
);
};


  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.location
      .toLowerCase()
      .includes(search.toLowerCase());

      const matchesStatus =
      selectedStatus === 'any' || property.statusOptions === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const openDetailsModal = (property) => {
  setDetailsProperty2(property);
  setDetailsModalVisible2(true);
};


  

  const renderProperty = ({ item }) => (
  <View style={styles.glowWrapper}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { property: item })}
    >
      <View style={styles.overlayTopLeft}>
  {item.vaastuVerified && (
    <View style={styles.vaastuLabel}>
      <FontAwesome name="check" size={12} color="white" />
      <Text style={styles.vaastuLabelText}>Vaastu Verified</Text>
    </View>
  )}
  <TouchableOpacity
    style={styles.detailsButton}
    onPress={() => openDetailsModal(item)}
  >
    <FontAwesome name="info-circle" size={14} color="white" />
    <Text style={styles.detailsButtonText}>More Details</Text>
  </TouchableOpacity>
</View>


<TouchableOpacity
  style={styles.saveIconContainer}
  onPress={() => toggleSave(item.id)}
>
  <FontAwesome
    name={savedProperties.includes(item.id) ? 'bookmark' : 'bookmark-o'}
    size={20}
    color={savedProperties.includes(item.id) ? 'red' : 'gray'}
  />
</TouchableOpacity>
      <Image source={item.image} style={styles.image} />

      <View style={styles.TypeRow}>
        <FontAwesome size={16} color="gray" />
        <Text style={styles.TypeText}>{item.propertyType}</Text>
      </View>

      <Text style={styles.price}>{item.price}</Text>

      <View style={styles.locationRow}>
        <FontAwesome name="map-marker" size={16} color="gray" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <FontAwesome name="bed" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.bedrooms}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="bath" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.bathrooms}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="expand" size={16} color="#333" />
          <Text style={[styles.detailText, { marginLeft: 4 }]}>{item.area}</Text>
        </View>
      </View>

      <View style={styles.CallWhatsappContainer}>
        <LinearGradient colors={['#2C6F4A', '#3CA56B']} style={styles.gradientWrapper}>
          <TouchableOpacity style={styles.callButton} onPress={handleCallOptions}>
            <FontAwesome name="phone" size={20} color="#fff" />
            <Text style={styles.buttonText}>Call</Text>

            <ActionSheet
              ref={mainActionSheetRef}
              title={'Who would you like to call?'}
              options={['Cancel', 'Sales Office', 'Agent']}
              cancelButtonIndex={0}
              onPress={handleMainOption}
            />
            <ActionSheet
              ref={agentActionSheetRef}
              title={'Choose an Agent'}
              options={['Cancel', ...agentNumbers]}
              cancelButtonIndex={0}
              onPress={handleAgentSelection}
            />
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#2C6F4A', '#3CA56B']} style={styles.gradientWrapper}>
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() => handleWhatsApp('+918920666741')}
          >
            <FontAwesome name="whatsapp" size={20} color="#fff" />
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  </View>
);

  return (
    
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by area/pincode"
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 }}>
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 16, fontWeight: '500' }}>{properties.length} properties</Text>
  </View>
    <Modal
      visible={detailsModalVisible2}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setDetailsModalVisible2(false)}
    >
      <View style={styles.modalOverlayDetails}>
        <View style={styles.modalContentDetails}>
          {detailsProperty2 && (
            <>
              <Text style={styles.modalTitleDetails}>Property Details</Text>

              <View style={styles.detailRow}>
                <FontAwesome name="building" size={18} color="#444" />
                <Text style={styles.detailText}> Builder: {detailsProperty2.builderName}</Text>
              </View>

              <View style={styles.detailRow}>
                <FontAwesome name="calendar" size={18} color="#444" />
                <Text style={styles.detailText}> Construction Date: {detailsProperty2.constructionDate}</Text>
              </View>

              <View style={styles.detailRow}>
                <FontAwesome name="calendar-check-o" size={18} color="#444" />
                <Text style={styles.detailText}> Completion Date: {detailsProperty2.completionDate}</Text>
              </View>

              <View style={styles.detailRow}>
                <FontAwesome name="info-circle" size={18} color="#444" />
                <Text style={styles.detailText}> Status: {detailsProperty2.status}</Text>
              </View>

              <View style={styles.detailRow}>
                <FontAwesome name="shield" size={18} color="#444" />
                <Text style={styles.detailText}> MAHARERA Verified: {detailsProperty2.mahareraVerified ? 'Yes' : 'No'}</Text>
              </View>

              {detailsProperty2.mahareraVerified && (
                <View style={styles.detailRow}>
                  <FontAwesome name="id-badge" size={18} color="#444" />
                  <Text style={styles.detailText}> MAHARERA ID: {detailsProperty2.mahareraId}</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <FontAwesome name="archive" size={18} color="#444" />
                <Text style={styles.detailText}> Pandora Box: {detailsProperty2.pandoraBox ? 'Yes' : 'No'}</Text>
              </View>

              <Pressable
                onPress={() => setDetailsModalVisible2(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>

  <View style={{ flex: 1, alignItems: 'flex-end' }}>
    <TouchableOpacity
      style={styles.featuredButton}
      onPress={() => setFeaturedMenuVisible(!featuredMenuVisible)}
    >
      <MaterialIcons name="star" size={16} color="#555" style={{ marginRight: 4 }} />
      <Text style={styles.featuredButtonText}>Featured</Text>
      <MaterialIcons name="unfold-more" size={16} color="#555" style={{ marginLeft: 4 }} />
    </TouchableOpacity>

    {featuredMenuVisible && (
      <View style={styles.featuredMenu}>
        {['Featured', 'Newest', 'Price (Low)', 'Price (High)', 'Verified First'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFeaturedSelect(option)}
            style={styles.featuredMenuItem}
          >
            <Text style={styles.featuredMenuText}>
              {selectedFeaturedOption === option && (
                <MaterialIcons name="check" size={16} color="#007AFF" style={{ marginRight: 6 }} />
              )}
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
</View>





          <View
  style={styles.statusSegmentContainer}
  onLayout={(e) => setStatusContainerWidth(e.nativeEvent.layout.width)}
>
  <Animated.View
    style={[
      styles.statusIndicator,
      {
        width: statusContainerWidth / statusOptions.length,
        left: indicatorPosition,
        overflow: 'hidden', 
      }
    ]}
  >
    <LinearGradient
      colors={['#2C6F4A', '#3CA56B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{flex: 1,
    borderRadius: 8,  
    height: '100%',   
    width: '100%',}}
    />
  </Animated.View>

  {statusOptions.map((status, index) => (
    <TouchableOpacity
      key={status}
      style={styles.statusItem}
      onPress={() => handleSelect(index)}
    >
      <Text
        style={[
          styles.statusText,
          selectedIndex === index
            ? styles.statusTextActive
            : styles.statusTextInactive
        ]}
      >
        {status}
      </Text>
    </TouchableOpacity>
  ))}
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
            
              <View
                style={styles.segmentContainer}
                onLayout={(e) => {
                  setCategoryContainerWidth(e.nativeEvent.layout.width);
                }}
              >
                <Animated.View
                  style={[
                    styles.segmentIndicator,
                    {
                      width: categoryContainerWidth / categories.length,
                      left: categoryIndicatorPosition,
                    },
                  ]}
              />
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleCategorySelect(index)}
                  style={styles.segmentItem}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      selectedCategory === item
                      ? styles.selectedText
                      : styles.unselectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
        contentContainerStyle={[styles.list, { paddingBottom: 100 }]}
      />
        </View>
        {isNavVisible && (
        <BottomNav selected={selected} setSelected={setSelected} />
      )}

      
      <NavToggleButton isVisible={isNavVisible} setIsVisible={setIsNavVisible} />
      </View>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  gradientWrapper: {
  borderRadius: 8,
  marginVertical: 5,
  marginHorizontal: 5,
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
  glowWrapper: {
  borderRadius: 12,
  shadowColor: '#FFD700',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 8,
  elevation: 8,
  backgroundColor: '#fff',
  marginTop: 20,       
  marginBottom: 16,   
},
card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
},
  image: {
    width: '100%',
    height: 250,
  },
  locationRow: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  TypeRow: { 
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
  TypeText: {
    marginLeft: -6,
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
modalOverlayDetails: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContentDetails: {
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
  modalTitleDetails: {
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
    marginBottom: 16,
  },
  showButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  overlayTopLeft: {
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 10,
},

vaastuLabel: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 128, 0, 0.8)', 
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
  marginBottom: 5,
},

vaastuLabelText: {
  color: 'white',
  fontSize: 12,
  marginLeft: 4,
},

detailsButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 223, 0, 0.8)', 
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
},

detailsButtonText: {
  color: 'white',
  fontSize: 12,
  marginLeft: 4,
},
  dropdownRow: {
    flexDirection: 'row',       
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: -10,
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-start',
    marginHorizontal: 4,
                     
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 15,
    padding: 1,
    position: 'relative',
    width: 350,
    alignSelf: 'center',
    marginVertical: 20,
    height: 40,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentIndicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#b3e5fc',
    borderRadius: 20,
    zIndex: 0,
  },
  segmentText: {
    fontSize: 16,
    textAlignVertical: 'center',     
    lineHeight: 20,               
  },
  selectedText: {
    color: '#000',
  },
  unselectedText: {
    color: '#555',
  },
  saveIconContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
  backgroundColor: 'rgba(255,255,255,0.7)',
  padding: 6,
  borderRadius: 20,
},
  callButton: {
  padding: 12,
  width: 180,
  borderRadius: 8,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
},
  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    
  },
  whatsappButton: {
  padding: 12,
  width: 190,
  borderRadius: 8,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
},
  

  CallWhatsappContainer: {
    flexDirection: 'row',   
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  statusSegmentContainer: {
  flexDirection: 'row',
  borderRadius: 10,
  backgroundColor: '#e6e6e6',
  overflow: 'hidden',
  position: 'relative',
  height: 44,
  width: 400,
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 10,
},
statusItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 2,
  zIndex: 1
},
statusText: {
  fontSize: 14,
  fontWeight: '600'
},
statusTextActive: {
  color: '#fff'
},
statusTextInactive: {
  color: '#333'
},
statusIndicator: {
  position: 'absolute',
  height: '100%',
  backgroundColor: '#2C6F4A',
  borderRadius: 8,
  zIndex: 0
},
iconWrapper: {
  backgroundColor: '#fff8e1',
  borderRadius: 30,
  padding: 8,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#bfa145',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

iconWrapperSelected: {
  backgroundColor: '#fff3d0',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '85%',
  elevation: 5,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
},
detailRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
detailText: {
  fontSize: 14,
  color: '#333',
  marginLeft: 8,
},
closeButton: {
  marginTop: 20,
  backgroundColor: '#2C6F4A',
  paddingVertical: 10,
  borderRadius: 6,
  alignItems: 'center',
},
closeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
navContainer: {
  position: 'absolute',
  bottom: 5,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 16,
  borderTopWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
  elevation: 5, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
navItem: {
  alignItems: 'center',
},
navLabel: {
  fontSize: 12,
  color: '#555',
  marginTop: 4,
},
navLabelSelected: {
  color: '#FFC35A',
  fontWeight: 'bold',
},
featuredContainer: {
  alignSelf: 'flex-end',
  marginRight: 16,
  marginTop: 8,
  position: 'relative',
  zIndex: 1000,
},
featuredButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 6,
},
featuredButtonText: {
  fontSize: 14,
  color: '#333',
},
featuredMenu: {
  backgroundColor: '#fff',
  position: 'absolute',
  top: 40,
  right: 0,
  width: 160,
  borderRadius: 6,
  elevation: 5,
  paddingVertical: 6,
  zIndex: 1000,
},
featuredMenuItem: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
},
featuredMenuText: {
  fontSize: 14,
  color: '#333',
},

});
