import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

interface GuessLogItemProps {
  guess: number;
  roundNumber: number;
}

const GuessLogItem = ({ guess, roundNumber }: GuessLogItemProps) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{`#${roundNumber}`}</Text>
      <Text style={styles.itemText}>Opponent's guess: {guess}</Text>
    </View>
  );
};
export default GuessLogItem;
const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,

    marginVertical: 8,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
