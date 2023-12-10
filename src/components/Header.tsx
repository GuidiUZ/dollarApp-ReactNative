import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { Button, Icon } from "@rneui/themed";



const Header = () => {
  const { canGoBack, goBack } = useNavigation();
  return (
    
      

    <View style={styles.container}>
     {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.legend}>Dolar App</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 24,
    backgroundColor: "#fff"
  },
  arrowContainer: {
    marginLeft: -30,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  legend: {
    fontSize: 24,
    fontWeight: "500",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  share: {
    fontSize: 18,
  },
});

export default Header;
