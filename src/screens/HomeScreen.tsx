import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FocusableButton from '../components/FocusableButton';
import FocusableInput from '../components/FocusableInput';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [videoUrl, setVideoUrl] = useState('');

  const handlePlay = () => {
    if (videoUrl) {
      navigation.navigate('Player', { url: videoUrl });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stream from Drive</Text>
      
      <Text style={styles.subtitle}>Enter Direct Video Link:</Text>
      <FocusableInput
        placeholder="https://example.com/video.mp4"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      <View style={styles.buttonContainer}>
        <FocusableButton
          title="Play Movie"
          onPress={handlePlay}
          style={styles.playButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  buttonContainer: {
    marginTop: 30,
    width: 200,
  },
  playButton: {
    backgroundColor: '#0066cc',
  },
});

export default HomeScreen;
