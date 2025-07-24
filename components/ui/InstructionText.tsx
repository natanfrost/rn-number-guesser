import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

interface InstructionTextProps {
  children: React.ReactNode;
  style?: StyleSheet | object;
}

const InstructionText = ({ children, style = {} }: InstructionTextProps) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.textLight,
    fontSize: 16,
    marginBottom: 8,
  },
});
