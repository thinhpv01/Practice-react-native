import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
const { height, width } = Dimensions.get("window");
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { bottom } = useSafeAreaInsets();
console.log(bottom);
export default function ZoomScreen({ navigation }) {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zoom = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
      console.log(event);
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });
  const PanGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const sStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={zoom}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={PanGestureEvent}>
          <Animated.View style={{ flex: 1 }}>
            <SharedElement id={`item.1.photo`}>
              <AnimatedImage
                style={[{ ...StyleSheet.absoluteFillObject }, rStyle, sStyle]}
                source={require("../assets/2.jpg")}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  console.log("hi");
                }}
              >
                <Animated.View style={[styles.focalPoint, focalPointStyle]} />
              </TouchableOpacity>
            </SharedElement>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 40,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 20,
  },
});

// <NavigationContainer>
// <Stack.Navigator screenOptions={{ headerShown: false }}>
//   <Stack.Screen name="Image" component={VImage} />
//   <Stack.Screen
//     name="ZoomScreen"
//     component={ZoomScreen}
//     sharedElements={(route, otherRoute, showing) => {
//       const { item } = route.params;
//       return [`item.1.photo`];
//     }}
//   />
// </Stack.Navigator>
// </NavigationContainer>

// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import React from "react";
// import { SharedElement } from "react-navigation-shared-element";

// const VImage = ({ navigation }) => {
//   return (
//     <TouchableOpacity
//       onPress={() => navigation.push("ZoomScreen")}
//       style={styles.container}
//     >
//       <SharedElement id={`item.1.photo`}>
//         <Image source={require("../assets/2.jpg")} style={styles.img} />
//       </SharedElement>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   img: {
//     width: 150,
//     height: 150,
//   },
// });

// export default VImage;
