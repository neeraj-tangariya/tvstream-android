import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { MovieList } from '../components/MovieList';
import FocusableInput from '../components/FocusableInput';
import { Movie } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Player', { url: movie.url });
  };

  const handleSidebarSelect = (item: string) => {
    if (item === 'Home') {
      navigation.navigate('Home');
    } else if (item === 'Settings') {
      navigation.navigate('Settings');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentRow}>
        <Sidebar onSelect={handleSidebarSelect} />
        
        <View style={styles.mainContent}>
          <Text style={styles.headerTitle}>Search Streams</Text>
          
          <View style={styles.searchSection}>
            <FocusableInput
              placeholder="Search by title or URL..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              containerStyle={styles.searchInput}
            />
          </View>

          {searchQuery.length > 0 && (
            <Text style={styles.resultText}>
              {filteredMovies.length} result{filteredMovies.length !== 1 ? 's' : ''} found
            </Text>
          )}

          {filteredMovies.length > 0 ? (
            <MovieList movies={filteredMovies} onMoviePress={handleMoviePress} />
          ) : searchQuery.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No streams found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>🔍</Text>
              <Text style={styles.emptySubtext}>Start typing to search your streams</Text>
            </View>
          )}
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
  searchSection: {
    marginBottom: 30,
  },
  searchInput: {
    width: '100%',
  },
  resultText: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 48,
    color: '#555',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 18,
    color: '#777',
  },
});

export default SearchScreen;
