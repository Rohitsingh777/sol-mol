import { title } from "process";
import Toast from "react-native-toast-message";

export type toastparam ={
    status : 'error' | 'success' |  'info'  ,
    position :  'top' | 'bottom' , 
    Title : string , 
    Text : string , 
}
export default function  UseToast( params : toastparam  ) : void {
    const {status  ,
        position, 
        Title , 
        Text } = params ; 

    const  showToast = () => {
        Toast.show({
          type:  status  , 
          text1: Title  ,
          text2:  Text ,
          position :  position 
        });
      };
      showToast(); 

}







