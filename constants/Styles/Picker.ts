import { StyleSheet } from "react-native";


export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      // borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      // paddingRight: 30, // to ensure the text is not obscured by the arrow
      // backgroundColor : 'grey'
      // alignItems : 'center'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is not obscured by the arrow
    },
    iconContainer: {
      top: 10,
      right: 1,
    },
  });