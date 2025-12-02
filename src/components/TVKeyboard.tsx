import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface TVKeyboardProps {
  onTextChange: (text: string) => void;
  onDone: () => void;
  initialValue?: string;
}

const KEYBOARD_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '-'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '/', ':'],
  ['SPACE', 'DELETE', 'CLEAR', 'DONE'],
];

export const TVKeyboard: React.FC<TVKeyboardProps> = ({ onTextChange, onDone, initialValue = '' }) => {
  const [text, setText] = useState(initialValue);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    let newText = text;
    
    switch (key) {
      case 'SPACE':
        newText = text + ' ';
        break;
      case 'DELETE':
        newText = text.slice(0, -1);
        break;
      case 'CLEAR':
        newText = '';
        break;
      case 'DONE':
        onDone();
        return;
      default:
        newText = text + key;
    }
    
    setText(newText);
    onTextChange(newText);
  };

  const renderKey = (key: string) => {
    const isSpecial = ['SPACE', 'DELETE', 'CLEAR', 'DONE'].includes(key);
    const isFocused = focusedKey === key;
    
    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.key,
          isSpecial && styles.specialKey,
          isFocused && styles.focusedKey,
        ]}
        onPress={() => handleKeyPress(key)}
        onFocus={() => setFocusedKey(key)}
        onBlur={() => setFocusedKey(null)}
      >
        <Text style={[
          styles.keyText,
          isSpecial && styles.specialKeyText,
          isFocused && styles.focusedKeyText,
        ]}>
          {key === 'SPACE' ? '___' : key}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{text || 'Type URL here...'}</Text>
      </View>
      
      <View style={styles.keyboard}>
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(renderKey)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  displayContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#444',
  },
  displayText: {
    color: '#FFF',
    fontSize: 18,
    minHeight: 25,
  },
  keyboard: {
    backgroundColor: '#0A0A0A',
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    minWidth: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  specialKey: {
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 15,
    minWidth: 80,
  },
  focusedKey: {
    backgroundColor: '#E50914',
    borderColor: '#FF1F2F',
    transform: [{ scale: 1.1 }],
  },
  keyText: {
    color: '#DDD',
    fontSize: 16,
    fontWeight: '600',
  },
  specialKeyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  focusedKeyText: {
    color: '#FFF',
  },
});
