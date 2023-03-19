import React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import styles from '../style/Style';

export default Header = () => {

    const [fontLoaded] = useFonts({
        lobsterTwoItalic: require('../assets/fonts/LobsterTwo-Italic.ttf')
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style={styles.header}>
            <Text style={[styles.title, {fontFamily: 'lobsterTwoItalic'}]}>Mini-Yahtzee</Text>
        </View>
    );
};