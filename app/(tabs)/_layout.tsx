import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import styles from '@/constants/Styles/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function TabLayout() {
//   const colorScheme = useColorScheme();

  return (
    // <SafeAreaView style={styles.container}>
// {/* // <ImageBackgroundWrapper image={image}>  */}

    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // tabBarActiveBackgroundColor : 'grey' ,
        headerShown: false,
        tabBarStyle :{
          // margin : 0, 
          backgroundColor : 'black' ,   
          // marginBottom : 5
        }
      }}  >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="receive"
        options={{
          title: 'Receive',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'qr-code' : 'qr-code-outline'} color={color} />
          ),
        }}
      />
 <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="send"
        options={{
          title: 'Send',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'send' : 'send-outline'} color={color} />
          ),
        }}
      />
      
    <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  
    // {/* // </ImageBackgroundWrapper>  */}

    //  </SafeAreaView>
  );
}

