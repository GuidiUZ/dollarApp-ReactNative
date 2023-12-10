import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import fetchApi from "../utils/fetch";
import { dollarProps } from "../components/TypesDollar";
import { Button, Input } from "@rneui/themed";
import Header from "../components/Header";
import CalculatorPriceItem from "../components/CalculatorPriceItem";

const Calculator: React.FC = () => {
  const [calculateDollar, setCalculateDollar] = useState<dollarProps[]>([]);
  const [toCalculate, setToCalculate] = useState<string>("");
  const [buyPriceSelected, setbuyPriceSelected] = useState<string>("");
  const [sellPriceSelected, setsellPriceSelected] = useState<string>("");
  const [result, setResult] = useState<string>();
  const [buySell, setBuySell] = useState(false);

  const getDollarsPrices = async () => {
    try {
      const dataDollars = await fetchApi();
      setCalculateDollar(dataDollars);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getDollarsPrices();
  }, []);

  const handleTouchComponent = async (compra: string, venta: string) => {
    try {
      await setbuyPriceSelected(compra);
      await setsellPriceSelected(venta);
      return Promise.resolve();
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  useEffect(() => {}, [buyPriceSelected, sellPriceSelected]);

  const handleBuyProcess = async () => {
    try {
      await setBuySell(true);
      return Promise.resolve();
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  const handleSellProcess = async () => {
    try {
      await setBuySell(false);
      return Promise.resolve();
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  useEffect(() => {}, [buySell]);

  const handleCalculate = async () => {
    try {
      if (buySell == true) {
        const resultBuy =
          await parseFloat(toCalculate) * parseFloat(buyPriceSelected);
          setResult(resultBuy.toString());
      } else if (buySell == false) {
        const resultSell =
          await parseFloat(toCalculate) * parseFloat(sellPriceSelected);
        setResult(resultSell.toString());
      }

      return Promise.resolve();
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  const handleResetOperations = () => {
    setToCalculate("");
    setbuyPriceSelected("");
    setsellPriceSelected("");
    setResult(undefined);
  };

  const formatResult = () => {

  }

  useEffect(() => {}, [result]);



  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.inputContainer}>
        <Input
          value={toCalculate}
          keyboardType="numeric"
          onChangeText={(text) => setToCalculate(text)}
          placeholder="Ingrese el valor en USD"
        />
      </View>
      <View style={styles.switchTransaction}>
        <Button
          buttonStyle={{
            marginRight: 15,
            paddingHorizontal: 50,
            backgroundColor: "#278664",
          }}
          title={"Comprar"}
          onPress={handleBuyProcess}
        />
        <Button
          buttonStyle={{ paddingHorizontal: 50, backgroundColor: "#278664" }}
          title={"Vender"}
          onPress={handleSellProcess}
        />
      </View>
      <View style={styles.ledContainer}>
        <View style={styles.leftLedContainer}>
          <Text style={styles.result}>{result !== undefined ? "$" + result : undefined}</Text>
        </View>
        <View style={styles.rightLedContainer}>
          <Button
            buttonStyle={{ backgroundColor: "#278664", marginBottom: 8 }}
            title={"Calcular"}
            onPress={handleCalculate}
            disabled={
              toCalculate == "" ||
              buyPriceSelected == "" ||
              sellPriceSelected == ""
            }
          />
          <Button
            buttonStyle={{
              backgroundColor: "#278664",
              marginBottom: 8,
              paddingHorizontal: 19,
            }}
            title={"Reset"}
            onPress={handleResetOperations}
            disabled={
              toCalculate == "" ||
              buyPriceSelected == "" ||
              sellPriceSelected == ""
            }
          />
        </View>
      </View>
      <Text style={styles.textCotizacion}>Selecciona una cotizacion:</Text>
      <View style={styles.itemsContainer}>
        {calculateDollar?.map((item) =>
          item.nombre !== "Solidario" ? (
            <TouchableOpacity
              key={item.nombre}
              onPress={() => handleTouchComponent(item.compra, item.venta)}
            >
              <CalculatorPriceItem
                nombre={item.nombre}
                compra={item.compra}
                venta={item.venta}
                key={item.nombre}
                fechaActualizacion={item.fechaActualizacion}
              />
            </TouchableOpacity>
          ) : undefined
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#fff"
  },
  inputContainer: {
    flex: 1,
  },
  itemsContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  switchTransaction: {
    padding: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  ledContainer: {
    flexDirection: "row",
  },
  leftLedContainer: {
    flex: 1,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
  rightLedContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-end",
  },
  result: {
    fontSize: 24,
  },
  textCotizacion: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500"
  }
});

export default Calculator;
