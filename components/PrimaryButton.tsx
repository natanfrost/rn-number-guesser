import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: Colors.primary600 }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary700,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.textLight,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
