import React, { useState, useRef } from 'react';
import { TextInput, StyleSheet, View, TextInputProps, ViewStyle, Keyboard } from 'react-native';

interface FocusableInputProps extends TextInputProps {
  onFocusChange?: (focused: boolean) => void;
  containerStyle?: ViewStyle;
}

const FocusableInput: React.FC<FocusableInputProps> = ({ style, containerStyle, onFocusChange, ...props }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setFocused(true);
    onFocusChange?.(true);
    // Force keyboard to show on Android TV
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  return (
    <View style={[styles.container, containerStyle, focused && styles.focusedContainer]}>
      <TextInput
        ref={inputRef}
        {...props}
        style={[styles.input, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="#888"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="url"
        returnKeyType="done"
        showSoftInputOnFocus={true}
        autoFocus={false}
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
