import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

interface StartGameProps {
  onPickNumber: (number: number) => void;
}

const StartGame = ({ onPickNumber }: StartGameProps) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const handleInputChange = (text: string) => {
    setEnteredNumber(text.replace(/[^0-9]/g, ""));
  };

  const handleResetInput = () => {
    setEnteredNumber("");
  };

  const handleConfirmation = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Please enter a valid number between 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: handleResetInput,
          },
        ]
      );
      return;
    }
    onPickNumber(chosenNumber);
    setEnteredNumber("");
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          maxLength={2}
          keyboardType="number-pad"
          style={styles.numberInput}
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={handleInputChange}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleResetInput}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleConfirmation}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.primary500,
    borderBottomWidth: 2,
    color: Colors.primary500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
