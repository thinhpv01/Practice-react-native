import { SafeAreaView } from "react-native";
import Slider from "./components/Slider";
import InputPopop from "./screen/InputPopop";
import { Provider } from "react-redux";
import { PinchViewProvider } from "react-native-pinch-view";
import PhotoGallery from "./screen/PhotoGallery";
import store from "./app/store";
export default function App() {
  return (
    <Provider store={store}>
      <PinchViewProvider>
        <PhotoGallery />
      </PinchViewProvider>
    </Provider>
    // <InputPopop />
  );
}
