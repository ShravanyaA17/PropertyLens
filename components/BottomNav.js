import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';


const BottomNav = ({ selected, setSelected }) => {
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
const styles = StyleSheet.create({ 
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
});

export default BottomNav;
