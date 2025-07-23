import { StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";

interface GameScreenProps {
  userNumber: number;
}

const GameScreen = ({ userNumber }: GameScreenProps) => {
  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      <Text>Higher or Lower?</Text>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
