import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

type ParamList = {
  Player: { url: string };
};

const PlayerScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'Player'>>();
  const navigation = useNavigation();
  const { url } = route.params;

  const onError = (error: any) => {
    console.log('Video Error:', error);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onError={onError}
        onEnd={() => navigation.goBack()}
        fullscreen={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default PlayerScreen;
