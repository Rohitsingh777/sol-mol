import React, { ReactNode } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

interface ImageBackgroundWrapperProps {
    children: ReactNode; // Defines that children can be any valid React node
    image: any; // You may also use ImageSourcePropType if you want to be more specific
}

const ImageBackgroundWrapper: React.FC<ImageBackgroundWrapperProps> = ({ children, image }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.innerContainer}>
                    {children}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',      // Center content horizontally
    },
});

export default ImageBackgroundWrapper;
