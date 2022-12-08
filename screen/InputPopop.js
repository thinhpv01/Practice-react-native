import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  Button,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useRef } from "react";

const { width, height } = Dimensions.get("window");

const InputPopop = () => {
  const ref = useRef({ message: "", allowAnimationCallback: false });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ccc", height, width }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{ borderWidth: 2, borderColor: "#000", padding: 4, flex: 1 }}
        >
          <Text>Hi</Text>
          <Button
            title="Click me"
            onPress={() => {
              console.log(ref.current.message);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={{
          width: width,
          height: 80,
          position: "absolute",
          bottom: 0,
          left: 0,
          borderWidth: 1,
          borderColor: "red",
        }}
        behavior="position"
      >
        <View style={styles.bottomWrapper}>
          <React.Fragment>
            <View style={styles.avatar}></View>
            <View>
              <TextInput
                onFocus={() => {}}
                onBlur={() => {}}
                clearTextOnFocus={true}
                onSubmitEditing={() => {
                  console.log(ref.current.message);
                }}
                returnKeyType="send"
                textAlignVertical="center"
                placeholder="Send a message"
                placeholderTextColor="#fff"
                onChangeText={(e) => (ref.current.message = e)}
                style={styles.messageInput}
              />
            </View>
          </React.Fragment>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InputPopop;

const styles = StyleSheet.create({
  bottomWrapper: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  messageInput: {
    height: 44,
    width: width - 44 * 2,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 44,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
  },
});
