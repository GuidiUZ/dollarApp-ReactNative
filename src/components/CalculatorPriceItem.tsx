import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { dollarProps } from "./TypesDollar";

const CalculatorPriceItem: React.FC<dollarProps> = ({
  nombre,
  compra,
  venta,
}) => {
  return (
    <View>
      <Text>{nombre}</Text>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text>Compra</Text>
          <Text style={styles.legends}>${compra}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>Venta</Text>
          <Text style={styles.legends}>${venta}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    backgroundColor: "#278664",
    borderRadius: 8,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
    marginLeft: 14,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 14,
  },
  legends: {
    fontSize: 24,
    fontWeight: "500"
  },
});

export default CalculatorPriceItem;
