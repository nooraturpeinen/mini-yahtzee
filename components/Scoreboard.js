import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import { SCOREBOARD_KEY } from '../constants/Game';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/Style';

export default Scoreboard = ( {navigation} ) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort(function(a, b) {
                    return parseFloat(b.points) - parseFloat(a.points);
                });
                setScores(tmpScores.slice(0, 5));
            };
          } catch (error) {
            console.log('Error message: ' + error.message);
          };
    };

    return (
        <ScrollView>
            <View style={styles.board}>
                <Header/>
                <View style={styles.flex}>
                    <MaterialCommunityIcons
                        name={'view-list'}
                        size={60}
                        color={'#a692d9'}
                    />
                </View>
                <Text style={styles.text}>Top Five</Text>
                { scores.length === 0
                    ?
                        <Text style={styles.text}>Scoreboard is empty</Text>
                    :
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Player</DataTable.Title>
                                <DataTable.Title>Date & Time</DataTable.Title>
                                <DataTable.Title numeric>Points</DataTable.Title>
                            </DataTable.Header>
                            { scores.map((player, i) => (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{i + 1}. {player.name}</DataTable.Cell>
                                    <DataTable.Cell>{player.date} {player.time}</DataTable.Cell>
                                    <DataTable.Cell numeric>{player.points}</DataTable.Cell>
                                </DataTable.Row>
                            )) }
                        </DataTable>
                }
                <Footer/>
            </View>
        </ScrollView>
    );

};