import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './AppInput.styles';

export interface AppInputProps extends TextInputProps {
  label?: string;
  countryCode?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  countryCode,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
        {countryCode && (
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </View>
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#94A3B8"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>
    </View>
  );
};
