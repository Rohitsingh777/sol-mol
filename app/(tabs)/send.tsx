
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Camera } from 'expo-camera';
import ImageBackgroundWrapper from '@/components/Imagewrapper';
import { useNavigation, useRouter } from 'expo-router';
import { CameraView, Camera } from "expo-camera";
import { useRecoilState } from 'recoil';
import { receiverspublickey } from '@/store/receiverspubkey';

export default function Readqr() {

  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const router = useRouter();
  const [publickey , setpublickey ] = useRecoilState(receiverspublickey) ; 
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // (async () => {
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   setHasPermission(status === 'granted');
    // })();
    const getCameraPermissions = async () => {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(granted);
    };
    getCameraPermissions();
  }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setpublickey(data.toString()) ; 
    router.push('/sendviaid') ; 

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  };

  // if (hasPermission === null) {
  //   return <View />;
  // }

  // if (hasPermission === false) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>Camera permission not granted</Text>
  //     </View>
  //   );
  // }

  return (
    <ImageBackgroundWrapper image={image}>

      <View style={styles.container}>
        <Text style={styles.title}>Scan to Pay </Text>
        <Text style={styles.paragraph}>Scan a barcode to Pay .</Text>
        {renderCamera()}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/sendviaid')}
          disabled={scanned}
        >
          <Text style={styles.buttonText}> Send via @publickey instead </Text>
        </TouchableOpacity>
      </View>

    </ImageBackgroundWrapper>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
    color: 'white'
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: 'red'
  }
});