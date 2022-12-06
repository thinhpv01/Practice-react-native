import React, { useCallback, useRef } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
const VImage = ({ data, onPress, style, imageProps }) => {
  const imageRef = useRef();
  const onImagePress = useCallback(() => {
    imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // console.log("imgPress: ", { x, y, width, height, pageX, pageY });
      onPress && onPress(data, { x, y, width, height, pageX, pageY });
    });
  }, []);

  return (
    <Pressable onPress={onImagePress} style={styles.container}>
      <Image
        style={[styles.container, style]}
        ref={imageRef}
        source={{
          uri: data.url,
        }}
        {...imageProps}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  videoLabel: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 5,
    right: 5,
    top: 5,
    borderRadius: 5,
  },
});

export default VImage;
