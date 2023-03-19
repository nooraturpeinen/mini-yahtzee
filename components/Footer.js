import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style/Style';

export default Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.author}>Author: Noora Turpeinen</Text>
        </View>
    );
};