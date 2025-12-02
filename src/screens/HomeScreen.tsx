import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

import { Sidebar } from '../components/Sidebar';
import { MovieList } from '../components/MovieList';
import { TVKeyboard } from '../components/TVKeyboard';
import FocusableButton from '../components/FocusableButton';
import { addMovie, Movie } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [videoUrl, setVideoUrl] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handlePlay = () => {
    if (!videoUrl) return;
    console.log('Playing stream with URL:', videoUrl);
    const newMovie: Movie = {
      id: Date.now().toString(),
      title: `Stream ${movies.length + 1}`, // Simple title generation
      url: videoUrl,
      // thumbnail: 'https://via.placeholder.com/300x450' // Optional
    };

    dispatch(addMovie(newMovie));
    navigation.navigate('Player', { url: videoUrl });
    setVideoUrl('');
    setShowKeyboard(false);
  };
  
  const handlePaste = async () => {
      try {
        const content = await Clipboard.getString();
        setVideoUrl(content);
      } catch (e) {
        console.error('Failed to paste', e);
      }
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Player', { url: movie.url });
  };

  const handleSidebarSelect = (item: string) => {
    if (item === 'Search') {
      navigation.navigate('Search');
    } else if (item === 'Settings') {
      navigation.navigate('Settings');
    }
    // 'Home' is already the current screen, no action needed
  };

  const handleKeyboardDone = () => {
    setShowKeyboard(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentRow}>
        <Sidebar onSelect={handleSidebarSelect} />
        
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle}>TV Stream</Text>
            
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Video URL:</Text>
                
                {showKeyboard ? (
                  <TVKeyboard 
                    onTextChange={setVideoUrl}
                    onDone={handleKeyboardDone}
                    initialValue={videoUrl}
                  />
                ) : (
                  <>
                    <View style={styles.urlDisplay}>
                      <Text style={styles.urlText} numberOfLines={1}>
                        {videoUrl || 'No URL entered'}
                      </Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <FocusableButton 
                            title="Type URL" 
                            onPress={() => setShowKeyboard(true)} 
                            style={styles.actionButton} 
                        />
                        <FocusableButton 
                            title="Paste URL" 
                            onPress={handlePaste} 
                            style={styles.actionButton} 
                        />
                        <FocusableButton 
                            title="Play Stream" 
                            onPress={handlePlay} 
                            style={styles.playButton} 
                        />
                    </View>
                  </>
                )}
            </View>
            
            <Text style={styles.sectionTitle}>Recent Streams</Text>
            <MovieList movies={movies} onMoviePress={handleMoviePress} />
        </View>
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
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 18,
    color: '#AAA',
    marginBottom: 10,
  },
  urlDisplay: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#444',
    minHeight: 50,
    justifyContent: 'center',
  },
  urlText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    minWidth: 120,
  },
  playButton: {
    minWidth: 120,
    backgroundColor: '#E50914',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#DDD',
    marginBottom: 15,
  },
});

export default HomeScreen;
