import React, {  useEffect, useState } from "react";
import fetchApi from "../utils/fetch";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import TodayDollarPrice from "../components/TodayDollarPrice";
import { dollarProps } from "../components/TypesDollar";
import Header from "../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [priceDollar, setPriceDollar] = useState<dollarProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation();

  const getDollarsPrices = async () => {
    try {
      const dataDollars = await fetchApi();
      setPriceDollar(dataDollars);
      return Promise.resolve(dataDollars);
    } catch (error) {
      return Promise.reject(error);
    }

    
  };

  useEffect(() => {
    getDollarsPrices();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getDollarsPrices();
      setRefreshing(false);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleNavigateToCalculator = () => {
    navigate("Calculator" as never);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <View style={styles.container}>
        {priceDollar?.map((item, index) =>
          item.nombre !== "Solidario" ? (
            <TodayDollarPrice
              key={`${item.nombre}_${index}`}
              nombre={item.nombre}
              compra={item.compra}
              venta={item.venta}
              fechaActualizacion={item.fechaActualizacion}
            />
          ) : undefined
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Calcular"}
          buttonStyle={{ backgroundColor: "#278664", flex: 1 }}
          titleStyle={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
          icon={<Icon name="calculate" />}
          onPress={handleNavigateToCalculator}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    paddingHorizontal: 25,
    marginTop: -25,
    marginBottom: 50,
  }
});

export default Home;
