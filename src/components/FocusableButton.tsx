import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface FocusableButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const FocusableButton: React.FC<FocusableButtonProps> = ({ title, onPress, style, textStyle }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        styles.container,
        style,
        focused && styles.focusedContainer,
      ]}
    >
      <Text style={[styles.text, textStyle, focused && styles.focusedText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  focusedContainer: {
    borderColor: '#00d2ff', // Cyan highlight
    backgroundColor: '#444',
    transform: [{ scale: 1.05 }],
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
  },
  focusedText: {
    color: '#fff',
  },
});

export default FocusableButton;
