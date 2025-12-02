import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Movie } from '../redux/slices/movieSlice';

interface MovieListProps {
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, onMoviePress }) => {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={[
        styles.card,
        focusedId === item.id && styles.cardFocused
      ]}
      onFocus={() => setFocusedId(item.id)}
      onBlur={() => setFocusedId(null)}
      onPress={() => onMoviePress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderText}>▶</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text 
          style={[
            styles.title,
            focusedId === item.id && styles.titleFocused
          ]} 
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  card: {
    width: 220,
    marginRight: 20,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    overflow: 'hidden',
    elevation: 5,
  },
  cardFocused: {
    borderColor: '#E50914',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
    zIndex: 1,
  },
  thumbnailContainer: {
    height: 120,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFF',
    fontSize: 40,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: '#DDD',
    fontSize: 14,
    fontWeight: '600',
  },
  titleFocused: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
