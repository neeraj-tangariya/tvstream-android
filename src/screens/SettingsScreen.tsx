import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Sidebar } from '../components/Sidebar';
import FocusableButton from '../components/FocusableButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [autoPlay, setAutoPlay] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSidebarSelect = (item: string) => {
    if (item === 'Home') {
      navigation.navigate('Home');
    } else if (item === 'Search') {
      navigation.navigate('Search');
    }
  };

  const handleClearHistory = () => {
    // TODO: Implement clear history with Redux action
    console.log('Clear history');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentRow}>
        <Sidebar onSelect={handleSidebarSelect} />
        
        <ScrollView style={styles.mainContent}>
          <Text style={styles.headerTitle}>Settings</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Playback</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto-play Next</Text>
                <Text style={styles.settingDescription}>
                  Automatically play next stream when current ends
                </Text>
              </View>
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: '#444', true: '#E50914' }}
                thumbColor={autoPlay ? '#FFF' : '#CCC'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Display</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Show Thumbnails</Text>
                <Text style={styles.settingDescription}>
                  Display thumbnail previews in stream list
                </Text>
              </View>
              <Switch
                value={showThumbnails}
                onValueChange={setShowThumbnails}
                trackColor={{ false: '#444', true: '#E50914' }}
                thumbColor={showThumbnails ? '#FFF' : '#CCC'}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Use dark theme throughout the app
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#444', true: '#E50914' }}
                thumbColor={darkMode ? '#FFF' : '#CCC'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data</Text>
            
            <FocusableButton
              title="Clear Stream History"
              onPress={handleClearHistory}
              style={styles.dangerButton}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>0.0.1</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>TV Stream © 2025</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    padding: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E50914',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  settingInfo: {
    flex: 1,
    marginRight: 20,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#AAA',
  },
  dangerButton: {
    backgroundColor: '#8B0000',
    borderColor: '#E50914',
    borderWidth: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 16,
    color: '#AAA',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default SettingsScreen;
