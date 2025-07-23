import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

const StartGame = () => {
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
    console.log("Chosen number:", chosenNumber);
  };

  return (
    <View style={styles.inputContainer}>
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
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#31091c",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
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
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
