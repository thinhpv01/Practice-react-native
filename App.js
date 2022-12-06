import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./app/store";
import PhotoGallery from "./screen/PhotoGallery";
import { PinchViewProvider } from "react-native-pinch-view";
export default function App() {
  return (
    <Provider store={store}>
      <PinchViewProvider>
        <PhotoGallery />
      </PinchViewProvider>
    </Provider>
  );
}
