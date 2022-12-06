import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./app/store";
import PhotoGallery from "./screen/PhotoGallery";

export default function App() {
  return (
    <Provider store={store}>
      <PhotoGallery />
    </Provider>
  );
}
