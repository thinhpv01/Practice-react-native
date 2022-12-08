import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoInvisible } from "../app/feature/PhotoModalSlice";
import VImage from "./VImage";

const { width, height } = Dimensions.get("window");

const PhotoDetailModal = () => {
  const [imgSize, setImgSize] = useState({ width: 0.1, height: 0 });
  const dispatch = useDispatch();
  const {
    isPhotoVisible,
    photoData: { image, specs },
  } = useSelector((state) => state.photoModal);
  useEffect(() => {
    Image.getSize(image.url, (width, height) => {
      setImgSize({ width, height });
    });
  }, []);

  console.log(isPhotoVisible, image, specs);
  const anim = useSharedValue(0);
  const animY = useSharedValue(0);
  const animScale = useSharedValue(1);
  const animFocalX = useSharedValue(0);
  const animFocalY = useSharedValue(0);

  useEffect(() => {
    if (isPhotoVisible) {
      anim.value = withTiming(1);
    } else {
      anim.value = withTiming(0);
    }
  }, []);

  const onBackPress = useCallback(() => {
    const callback = () => dispatch(setPhotoInvisible());
    anim.value = withTiming(
      0,
      {},
      (isFinished) => isFinished && runOnJS(callback)()
    );
  }, []);
  const panGestureHandler = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      animY.value = translationY;
    },
    onEnd: ({ translationY, translationX }) => {
      if (translationY > height * 0.35) {
        runOnJS(onBackPress)();
        animY.value = withTiming(0);
      } else {
        animY.value = withTiming(0);
      }
    },
  });
  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: ({ scale, focalX, focalY }) => {
      animScale.value = 1 - (1 - scale) * 0.5;
      animFocalX.value = width / 2 - focalX;
      animFocalY.value = height / 2 - focalY;
    },
    onEnd: () => {
      animScale.value = withTiming(1);
      animFocalX.value = withTiming(0);
      animFocalY.value = withTiming(0);
    },
  });
  const opacityStyle = useAnimatedStyle(() => ({
    opacity:
      anim.value *
      interpolate(animY.value, [-height * 0.3, 0, height * 0.3], [0.6, 1, 0.6]),
  }));
  const imageContainerStyle = useAnimatedStyle(() => {
    const isPortrait = imgSize.width < imgSize.height;
    const targetWidth = isPortrait ? Math.min(imgSize.width, width) : width;
    const targetHeight = Math.min(
      (targetWidth / imgSize.width) * imgSize.height,
      height
    );

    const targetX = (width - targetWidth) / 2;
    const targetY = (height - targetHeight) / 2;

    return {
      left: interpolate(anim.value, [0, 1], [specs.pageX, targetX]),
      top: interpolate(anim.value, [0, 1], [specs.pageY, targetY]),
      width: interpolate(anim.value, [0, 1], [specs.width, targetWidth]),
      height: interpolate(anim.value, [0, 1], [specs.height, targetHeight]),
      borderRadius: interpolate(
        anim.value,
        [0, 1],
        [specs.borderRadius || 5, 0]
      ),
      transform: [
        {
          translateY: animY.value,
        },
        {
          translateX: -animFocalX.value,
        },
        {
          translateY: -animFocalY.value,
        },
        {
          scale: animScale.value,
        },
        {
          translateX: animFocalX.value,
        },
        {
          translateY: animFocalY.value,
        },
      ],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: isPhotoVisible ? 99 : -99,
        }}
      >
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: isPhotoVisible ? 99 : -99,
            }}
          >
            {isPhotoVisible && (
              <Animated.View style={[styles.header, opacityStyle]}>
                <TouchableOpacity
                  onPress={onBackPress}
                  style={styles.btnHeader}
                >
                  <Ionicons name="close-outline" size={28} color="#222" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.btnHeader}>
                  <Ionicons name="heart" size={28} color="#222" />
                </TouchableOpacity>
              </Animated.View>
            )}
            <Animated.View style={[styles.backdrop, opacityStyle]}>
              <Pressable onPress={onBackPress} style={styles.backdropInner} />
            </Animated.View>
            {isPhotoVisible && (
              <Animated.View
                style={[styles.imageContainer, imageContainerStyle]}
              >
                <VImage resizeMode="cover" data={image} />
              </Animated.View>
            )}
            {isPhotoVisible && (
              <Animated.View style={[styles.authorContainer, opacityStyle]}>
                <Text style={styles.title}>{image.title}</Text>
                <Text style={styles.description}>{image.description}</Text>
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0)",
                    "rgba(0,0,0,0.3)",
                    "rgba(0,0,0,0.6)",
                  ]}
                  style={{ ...StyleSheet.absoluteFillObject }}
                />
              </Animated.View>
            )}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default PhotoDetailModal;

const styles = StyleSheet.create({
  btnHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    paddingHorizontal: 20,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  imageContainer: {},
  authorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
  },
});
