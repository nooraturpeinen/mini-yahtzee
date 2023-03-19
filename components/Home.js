import React, { useState } from 'react';
import { ScrollView, View, Keyboard } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import Header from './Header';
import Footer from './Footer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/Style';

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        };
    };

    return (
        <ScrollView style={styles.outerContainer}>
            <Header/>
            <View style={styles.innerContainer}>
                { !hasPlayerName
                    ?
                    <>
                        <View style={styles.flex}>
                            <MaterialCommunityIcons
                                name={'dice-3'}
                                size={60}
                                color={'#a692d9'}
                            />
                        </View>
                        <Text style={styles.text}>Enter your name to start playing!</Text>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            onChangeText={setPlayerName}
                            autoFocus={true}
                        />
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={() => handlePlayerName(playerName)}>
                            <Text style={styles.buttonText}>OK</Text>
                        </Button>
                    </>
                    :
                    <>
                        <View style={styles.flex}>
                            <MaterialCommunityIcons
                                name={'information'}
                                size={60}
                                color={'#a692d9'}
                            />
                        </View>
                        <Text style={styles.text}>How to Play</Text>
                        <Text style={styles.rules}>
                            THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points have been selected. The order for selecting those is free.
                        </Text>
                        <Text style={styles.rules}>
                            POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
                        </Text>
                        <Text style={styles.rules}>
                            GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives you {BONUS_POINTS} points more.
                        </Text>
                        <Text style={styles.player}>Good luck, {playerName}!</Text>
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                            <Text style={styles.buttonText}>PLAY</Text>
                        </Button>
                    </>
                }
            </View>
            <Footer/>
        </ScrollView>
    );
};