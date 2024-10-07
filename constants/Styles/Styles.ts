import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  graphbox: {
    width :150 ,
    height : 180, 
    backgroundColor : 'white',
    margin : 10,
    borderRadius : 10
  },
  transaction : {
    width : '100%' ,
    backgroundColor  : '#222121',
    height : 85 ,
    margin : 5 , 
    borderRadius : 10, 
  },
  smallgraph : {
    width : '100%',
    // padding : 2 , 
    // color  : 'blue' , 
    // height : 60 , 
    // backgroundColor : 'blue' , 
    marginBottom : 0
  },
});


export default styles ; 