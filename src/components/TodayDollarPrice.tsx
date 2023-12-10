import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { dollarProps } from "./TypesDollar";
import { format, parseISO } from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";

const TodayDollarPrice: React.FC<dollarProps> = ({
  nombre,
  compra,
  venta,
  fechaActualizacion,
}) => {
  const [fechaUpdate, setFechaUpdate] = useState<string>(fechaActualizacion);

  useEffect(() => {
    const date = parseISO(fechaActualizacion);
    const dateArgentina =  utcToZonedTime(date, 'America/Argentina/Buenos_Aires');
    const formattedDate = format(dateArgentina, "dd-MM HH:mm");
    setFechaUpdate(formattedDate);
  }, [fechaActualizacion]); 
 
  return (
    <View style={styles.container}>
      <Text style={styles.tipoDolar}>{nombre}</Text>

      <View style={styles.itemsContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.compra}>Compra</Text>
          <Text style={styles.price}>{`$${compra}`}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.compra}>Venta</Text>
          <Text style={styles.price}>{`$${venta}`}</Text>
        </View>
      </View>
      <Text style={styles.fechaActual}>{`Actualizado:${fechaUpdate}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    backgroundColor: "#278664",
    borderRadius: 8,
    marginBottom: 35,
    elevation: 5,
  },
  fechaActual: {
    marginTop: 8,
    marginBottom: -15,
    marginLeft: -10,
    fontSize: 16,
  },

  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tipoDolar: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: -8,
    marginLeft: -10,
    marginBottom: 12,
  },
  compra: {
    fontSize: 18,
  },
  price: {
    fontWeight: "500",
    fontSize: 25,
  },
});

export default TodayDollarPrice;
