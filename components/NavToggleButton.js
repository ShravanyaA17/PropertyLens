import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NavToggleButton = ({ isVisible, setIsVisible }) => {
  return (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={() => setIsVisible(!isVisible)}
    >
      <View style={styles.iconWrapper}>
        <MaterialIcons
          name={isVisible ? 'expand-more' : 'expand-less'}
          size={24}
          color="#fff" 
        />
        <Text style={styles.buttonText}>
          {isVisible ? 'Hide Menu' : 'Show Menu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default NavToggleButton;
