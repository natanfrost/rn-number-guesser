import { Alert, StyleSheet, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import {
  GuessDirection,
  GuessDirectionType,
} from "../constants/guess_direction";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

interface GameScreenProps {
  userNumber: number;
  onGameOver: () => void;
}

const generateRandomNumber = (min: number, max: number, exclude: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  return randomNumber;
};

let lowerBound = 1;
let upperBound = 100;

const GameScreen = ({ userNumber, onGameOver }: GameScreenProps) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  const handleNextGuess = (direction: GuessDirectionType) => {
    if (
      (direction === GuessDirection.lower && currentGuess < userNumber) ||
      (direction === GuessDirection.higher && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === GuessDirection.lower) {
      upperBound = currentGuess;
    } else {
      lowerBound = currentGuess + 1;
    }
    const newGuess = generateRandomNumber(lowerBound, upperBound, currentGuess);
    setCurrentGuess(newGuess);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => handleNextGuess(GuessDirection.higher)}
            >
              +
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => handleNextGuess(GuessDirection.lower)}
            >
              -
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
