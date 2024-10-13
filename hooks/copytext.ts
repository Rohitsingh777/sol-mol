
import * as ClipboardEvent  from 'expo-clipboard';
// var SendIntentAndroid = require("react-native-send-intent");
// import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as IntentLauncher from 'expo-intent-launcher';
import { Alert, Share } from 'react-native';


const onShare = async (message : string ) => {
    try {
      const result = await Share.share({
        message 
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

export default async function copytoclipboar( texttocopy  : string ) {
    // Clipbo.setString
    // await ClipboardEvent.setStringAsync(texttocopy )
    // alert(`copied -- ${texttocopy}`)
    
    // startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    // const intent = IntentLauncher.startActivityAsync( "android.settings.ACCESSIBILITY_SETTINGS" )
    // console.log(intent)s
    onShare(texttocopy)
// SendIntentAndroid.sendText({
//     title: "Please share this text",
//     text: "Lorem ipsum dolor sit amet, per error erant eu, antiopam intellegebat ne sed",
//     type: SendIntentAndroid.TEXT_PLAIN,
//   });


    }