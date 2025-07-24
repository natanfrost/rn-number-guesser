import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.textLight,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.primary500,
    padding: 12,
  },
});
