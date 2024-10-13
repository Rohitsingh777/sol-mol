


import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutPage = () => {
  return (
    <View style={{...styles.container , padding: 0 , paddingTop : 60 }}>
    <ScrollView contentContainerStyle={styles.container}>
      {/* App logo or image */}
      <Image
        source={require('../../assets/images/ethicon.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>About Our Web 3 Wallet</Text>

      {/* Introduction */}
      <Text style={styles.description}>
        Welcome to our next-generation Web 3 wallet, providing seamless interaction with decentralized applications on the Solana and Ethereum blockchains. Whether you're managing tokens, staking, or exploring the world of DeFi, we’ve got you covered.
      </Text>

      {/* Supported blockchains */}
      <Text style={styles.subheading}>Supported Blockchains</Text>
      <View style={styles.blockchainContainer}>
        <View style={styles.blockchainItem}>
          <Image
            source={require('../../assets/images/ethicon.png')} // Replace with Solana logo path
            style={styles.blockchainLogo}
            resizeMode="contain"
          />
          <Text style={styles.blockchainText}>Solana</Text>
        </View>
        <View style={styles.blockchainItem}>
          <Image
            source={require('../../assets/images/ethicon.png')} // Replace with Ethereum logo path
            style={styles.blockchainLogo}
            resizeMode="contain"
          />
          <Text style={styles.blockchainText}>Ethereum</Text>
        </View>
      </View>

      {/* App features */}
      <Text style={styles.subheading}>Features</Text>
      <Text style={styles.features}>
        • Secure management of Solana and Ethereum assets{'\n'}
        • Seamless integration with decentralized apps (dApps){'\n'}
        • Easy token swapping and transfers{'\n'}
        • Support for staking and yield farming{'\n'}
        • Future-proof design for upcoming Web 3 innovations
      </Text>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for trusting us as your gateway to the decentralized web. Explore, transact, and build on Web 3 with ease!
      </Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c1e', // Dark background for Web 3 feel
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 10,
  },
  blockchainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  blockchainItem: {
    alignItems: 'center',
  },
  blockchainLogo: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  blockchainText: {
    color: 'white',
    fontSize: 14,
  },
  features: {
    fontSize: 14,
    color: '#b8b8b8',
    marginBottom: 20,
    textAlign: 'left',
  },
  footer: {
    fontSize: 14,
    color: '#b8b8b8',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AboutPage;
