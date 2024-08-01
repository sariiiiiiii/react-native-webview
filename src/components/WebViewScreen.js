import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, Button, View } from "react-native";
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WebViewScreen = () => {
  const [showWebView, setShowWebView] = useState(true);
  const webViewRef = useRef(null);

  const handleMessage = (event) => {
    console.log("Url:", event.nativeEvent.url);
    console.log("Title:", event.nativeEvent.title);
    console.log("Data:", event.nativeEvent.data);

    const data = JSON.parse(event.nativeEvent.data);
    console.log("Data:", data);

    if (data.action === "Website2Mobile") {
      const { isOpen } = data.payload;
      console.log("Received data from web:", data.payload);
      setShowWebView(isOpen);  // 웹뷰 닫기 또는 열기
    }
  };

  return (
    <View style={styles.container}>
      {showWebView && (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://edoc.postline.co.kr/contract/01?q=83F064F52434CF5269E28757A0458CB8' }}
          onMessage={handleMessage}
        />
      )}
      {!showWebView && (
        <Button onPress={() => setShowWebView(true)} title="Open WebView" />
      )}
    </View>
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
