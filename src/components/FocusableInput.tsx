import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

interface FocusableInputProps extends TextInputProps {
  onFocusChange?: (focused: boolean) => void;
}

const FocusableInput: React.FC<FocusableInputProps> = ({ style, onFocusChange, ...props }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <TextInput
        {...props}
        style={[styles.input, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#222',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  focusedContainer: {
    borderColor: '#00d2ff',
    backgroundColor: '#333',
    transform: [{ scale: 1.02 }],
  },
  input: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
  },
});

export default FocusableInput;
