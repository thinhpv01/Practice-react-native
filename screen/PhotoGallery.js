import { useCallback } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoVisible } from "../app/feature/PhotoModalSlice";
import PhotoDetailModal from "./PhotoDetailModal";
import VImage from "./VImage";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { PinchView } from "react-native-pinch-view";

const { width } = Dimensions.get("window");

const MAX_COLUMN = 6;
const MIN_COLUMN = 1;
const PADDING = 10;

const getGridItemSize = (column, margin = 10) => {
  return (width - (column + 1) * margin) / column;
};

const SCALE_THRESHOLD = 0.3;

const data = [
  {
    id: 1,
    url: "https://i.pinimg.com/564x/6f/7f/00/6f7f002468054e0a1e25697774c29760.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/564x/a4/f1/b9/a4f1b9fc7d4b0afcbe52a3265dfcad6d.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/41/1c/7e/411c7e92728271f63f340f51be6dbfb0.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/564x/76/87/26/768726858fcedde6e06d35d1c5405930.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/58/5f/44/585f449058c0f2b4c061b3adc6088cac.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 6,
    url: "https://i.pinimg.com/564x/98/87/58/988758b1ea777e4d790f628be1fa0f7f.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 7,
    url: "https://i.pinimg.com/564x/1f/79/05/1f790584840ba4fcd63c9b2c09f14f7a.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 8,
    url: "https://i.pinimg.com/564x/d2/f7/3e/d2f73e855dfbc159d09d5526cbbd5677.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 9,
    url: "https://i.pinimg.com/564x/b0/33/c0/b033c0c87b1a802ad8efba89f3e39660.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 10,
    url: "https://i.pinimg.com/564x/5e/36/38/5e3638d3257ac8dd84aabcb7bd5c3ccc.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 11,
    url: "https://i.pinimg.com/736x/87/3a/20/873a20a4ad7e6696d8fe9fed1e1f41be.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 12,
    url: "https://i.pinimg.com/564x/75/62/f0/7562f0dc6251c484f7046811f3532905.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 13,
    url: "https://i.pinimg.com/564x/88/02/2f/88022f71df33e12e131ab3fd34d86ef0.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 14,
    url: "https://i.pinimg.com/564x/be/be/ef/bebeef8e0002ec3d95dd2fa132c28168.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 15,
    url: "https://i.pinimg.com/736x/aa/b8/2d/aab82d905e88e5fade4560fe9c952f7b.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 16,
    url: "https://i.pinimg.com/736x/7b/ac/02/7bac027ae0c163556293c246dfcb2c52.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 17,
    url: "https://i.pinimg.com/564x/c6/d2/53/c6d253a08675a1e6a5ac2d7a4fa29ef4.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 18,
    url: "https://i.pinimg.com/564x/10/b9/9a/10b99a7f88da12dc5eef3f1dec1b7133.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 19,
    url: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/278685650_2934539640181544_5605647359061089569_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=k9UhpXQA_A8AX9o0A6I&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfBTiM9EiDOe-NnN1eL242pneqYq63mIFpCslYVVgHptlQ&oe=6391D5AE",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
  {
    id: 20,
    url: "https://thumbs.dreamstime.com/z/spring-background-pink-flowers-heart-petals-greeting-card-woman-day-flat-lay-top-view-style-109972453.jpg",
    title: "PhamVanThinh",
    description: "Love scene from Perfume River",
  },
];

export default function PhotoGallery() {
  const dispatch = useDispatch();

  const onImagePress = useCallback((image, specs) => {
    dispatch(setPhotoVisible({ image, specs }));
  }, []);
  const { isPhotoVisible, photoData } = useSelector(
    (state) => state.photoModal
  );

  const animGridSize = useSharedValue(getGridItemSize(3));
  const animColumn = useSharedValue(3);
  const animGridLayout = useSharedValue(1);

  const gridItemStyle = useAnimatedStyle(() => ({
    height: animGridSize.value,
    width: animGridSize.value,
  }));

  const gridContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animGridLayout.value }],
  }));
  const pinGestureHandler = useAnimatedGestureHandler({
    onActive: ({ scale }) => {
      animGridLayout.value = 1 - (1 - scale) * 0.2;
    },
    onEnd: ({ scale }) => {
      if (scale > 1 + SCALE_THRESHOLD && animColumn.value > MIN_COLUMN) {
        animColumn.value = animColumn.value - 1;
      } else if (scale < 1 - SCALE_THRESHOLD && animColumn.value < MAX_COLUMN) {
        animColumn.value = animColumn.value + 1;
      }
      const size =
        (width - PADDING * (animColumn.value + 1)) / animColumn.value;
      animGridSize.value = withTiming(size);
      animGridLayout.value = withSpring(1);
    },
  });
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <PinchGestureHandler onGestureEvent={pinGestureHandler}>
        <Animated.ScrollView
          style={[{ flex: 1, paddingTop: 20 }, gridContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridContainer}>
            {data.map((item, index) => (
              <Animated.View key={index} style={[{ margin: 5 }, gridItemStyle]}>
                <PinchView>
                  <VImage
                    onPress={onImagePress}
                    style={[
                      styles.image,
                      photoData?.image.id == item.id && { opacity: 0 },
                    ]}
                    data={item}
                  />
                </PinchView>
              </Animated.View>
            ))}
          </View>
        </Animated.ScrollView>
      </PinchGestureHandler>
      {isPhotoVisible && <PhotoDetailModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
  },
});
