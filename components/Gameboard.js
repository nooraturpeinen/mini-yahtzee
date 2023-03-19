import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateFormat from 'dateformat';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from '../constants/Game';
import Header from './Header';
import Footer from './Footer';
import { Col, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/Style';

let board = [];

export default Gameboard = ({ route }) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [bonusPointsStatus, setBonusPointsStatus] = useState('');
    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] =
        useState(new Array(NBR_OF_DICES).fill(0));
    const [dicePointsTotal, setDicePointsTotal] = 
        useState(new Array(MAX_SPOT).fill(0));
    const [selectedDicePoints, setSelectedDicePoints] = 
        useState(new Array(MAX_SPOT).fill(false));
    const [points, setPoints] = useState(0);
    const [scores, setScores] = useState([]);
    
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={'row' + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={'row' + i}
                    size={60}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    };

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={'points' + spot}>
                <Text key={'points' + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        );
    };

    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonsRow.push(
            <Col key={'buttonsRow' + diceButton}>
                <Pressable
                    key={'buttonsRow' + diceButton}
                    onPress={() => selectDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={'numeric-' + (diceButton + 1) + '-circle'}
                        key={'buttonsRow' + diceButton}
                        size={40}
                        color={getDicePointsColor(diceButton)}
                    />
                </Pressable>
            </Col>
        );
    };

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
            getScoreboardData();
        };
        setBonusPointsStatus('You are ' + BONUS_POINTS_LIMIT + ' points away from bonus.');
    }, []);

    useEffect(() => {
        checkBonusPoints();
    }, [dicePointsTotal]);

    useEffect(() => {
        if (nbrOfThrowsLeft === 0 && dicePointsTotal.includes(0)) {
            setStatus('Select your points');
        } else if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        } else if (selectedDicePoints.every(x => x)) {
            setNbrOfThrowsLeft(0);
            setStatus('Game over. All points selected.');
            savePlayerPoints();
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        } else if (nbrOfThrowsLeft === 2 && dicePointsTotal.includes(0) === false) {
            setPoints(0);
            setBonusPointsStatus('You are ' + BONUS_POINTS_LIMIT + ' points away from bonus.');
            setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices');
        };
    }, [nbrOfThrowsLeft]);

    function getDiceColor(i) {
        return selectedDices[i] ? '#a692d9' : '#95c98a';
    };

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? '#a692d9' : '#95c98a';
    };

    const selectDice = (i) => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS || status === 'Game over. All points selected.') {
            setStatus('You have to throw dices first');
            return;
        };
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    };

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    };

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft !== 0) {
            setStatus('Throw 3 times before setting points');
            return;
        };
        let dices = [...selectedDices];
        let dicePoints = [...selectedDicePoints];
        let dPTotal = [...dicePointsTotal];
        if (!dicePoints[i]) {
            dicePoints[i] = true;
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
            dPTotal[i] = nbrOfDices * (i + 1);
            setDicePointsTotal(dPTotal);
            let total = dPTotal.reduce((partialSum, a) => partialSum + a, 0);
            setPoints(total);
        } else {
            setStatus('You already selected points for ' + (i + 1));
            return;
        };
        dices.fill(false);
        setSelectedDices(dices);
        setSelectedDicePoints(dicePoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        return dPTotal[i];
    };

    const checkBonusPoints = async () => {
        if (points < BONUS_POINTS_LIMIT) {
            let pointsAway = BONUS_POINTS_LIMIT - points;
            setBonusPointsStatus('You are ' + pointsAway + ' points away from bonus.');
        } else {
            setPoints(points + BONUS_POINTS);
            setBonusPointsStatus('Congrats! Bonus points (50) added.');
        };
    };

    const throwDices = () => {
        if (selectedDices.includes(true) && nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next throw');
            return;
        };
        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            };
        };
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    };

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            };
          } catch (error) {
            console.log('Error message: ' + error.message);
          };
    };

    const savePlayerPoints = async () => {
        let newDate = new Date();
        let date = dateFormat(newDate, 'd.m.yyyy');
        let time = dateFormat(newDate, 'HH:MM');
        const playerPoints = {
            name: playerName,
            date: date,
            time: time,
            points: points
        };
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        } catch (error) {
            console.log('Error message: ' + error.message);
        };
    };

    return (
        <View style={styles.board}>
            <Header/>
            <View style={styles.flex}>
                { nbrOfThrowsLeft === NBR_OF_THROWS && points === 0
                    ?
                    <>
                        <MaterialCommunityIcons
                            name={'dice-multiple'}
                            size={60}
                            color={'#a692d9'}
                        />
                    </>
                    :
                    <>
                        {row}
                    </>
                }
            </View>
            <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.text}>{status}</Text>
            <Button style={styles.button} onPress={() => throwDices()}>
                <Text style={styles.buttonText}>THROW DICES</Text>
            </Button>
            <Text style={styles.total}>Total: {points}</Text>
            <Text>{bonusPointsStatus}</Text>
            <View style={styles.dicePoints}><Grid>{pointsRow}</Grid></View>
            <View style={styles.dicePoints}><Grid>{buttonsRow}</Grid></View>
            <Text style={styles.player}>Player: {playerName}</Text>
            <Footer/>
        </View>
    );
};