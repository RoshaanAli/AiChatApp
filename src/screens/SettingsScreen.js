import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { colors, isDarkTheme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedApiKey = await AsyncStorage.getItem('apiKey');
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveApiKey = async () => {
    try {
      await AsyncStorage.setItem('apiKey', apiKey);
      Alert.alert('Success', 'API key saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save API key. Please try again.');
    }
  };

  const clearApiKey = async () => {
    Alert.alert(
      'Clear API Key',
      'Are you sure you want to clear your API key?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('apiKey');
              setApiKey('');
              Alert.alert('Success', 'API key cleared successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear API key. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          API Configuration
        </Text>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Enter your AI API key to enable real AI responses. Your key is stored locally and securely.
        </Text>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>API Key</Text>
          <TextInput
            style={[styles.textInput, {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border
            }]}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your API key..."
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
            onPress={clearApiKey}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.section, { borderTopColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Appearance
        </Text>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Dark Theme
          </Text>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isDarkTheme ? '#FFFFFF' : colors.text}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
