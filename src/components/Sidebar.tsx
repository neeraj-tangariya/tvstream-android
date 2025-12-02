import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface SidebarProps {
  onSelect: (item: string) => void;
}

const MENU_ITEMS = ['Home', 'Search', 'Settings'];

export const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {MENU_ITEMS.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.menuItem,
            focusedItem === item && styles.menuItemFocused,
          ]}
          onFocus={() => setFocusedItem(item)}
          onBlur={() => setFocusedItem(null)}
          onPress={() => onSelect(item)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.menuText,
            focusedItem === item && styles.menuTextFocused
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: '#1E1E1E',
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  menuItemFocused: {
    backgroundColor: '#E50914', // Netflix Red-ish
    transform: [{ scale: 1.05 }],
  },
  menuText: {
    color: '#AAA',
    fontSize: 18,
    fontWeight: '500',
  },
  menuTextFocused: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
