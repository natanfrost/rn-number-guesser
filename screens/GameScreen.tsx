import { Alert, FlatList, StyleSheet, View } from "react-native";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";

interface GameScreenProps {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
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
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const guessRoundsLength = guessRounds.length;

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
    setGuessRounds((prevRounds) => [newGuess, ...prevRounds]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundsLength);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    lowerBound = 1;
    upperBound = 100;
  }, []);

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
              onPress={() => handleNextGuess(GuessDirection.lower)}
            >
              <Ionicons
                name="remove-outline"
                size={24}
                color={Colors.textLight}
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => handleNextGuess(GuessDirection.higher)}
            >
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <GuessLogItem
              guess={item}
              roundNumber={guessRoundsLength - index}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
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
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
