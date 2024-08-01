import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WebViewScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onReceiveDateFromWeb = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log("Data:", data);

    if (data["action"] === "Website2Mobile") {
      const isOpen = data["payload"]["isOpen"];
      setIsOpen(isOpen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: 'https://edoc.postline.co.kr/contract/01?q=0D91E01B194B2583461CE1A686AADE9C' }}
        onMessage={onReceiveDateFromWeb}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default WebViewScreen;
