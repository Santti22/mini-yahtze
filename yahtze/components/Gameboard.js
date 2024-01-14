import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../style/style';

// Array to save dice on roll
let board = [];


// Loop to print cols and rows to make code more compact

let gridArray = [];

const NBR_OF_THROWS = 3;
const NBR_OF_DICES = 5;
const BONUSAMOUNT = 63;
const TURNS = 13;
const newScore = 0;

export default function Gameboard() {

    const [status, setStatus] = useState('Roll dice');
    const [select, setSelect] = useState(false);
    const [total, setTotal] = useState(0);

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [turnsLeft, setTurnsLeft] = useState(TURNS)
    const [selectedDice, setSelectedDice] = useState([false,false,false,false,false,false])
    for (let i = 0; i < 6; i++) {
        gridArray.push(
            <Col>
                <Row name={'item' + i}
                key={"row" + i}
                size={35}
                color={'steelblue'}
                style={styles.gridTop}>
                    {total}
                </Row>
                <Row>
                    <MaterialCommunityIcons
                        name={'numeric-' + (i+1) + '-circle'}
                        key={"row" + i}
                        size={35}
                        color={'steelblue'}
                        style={styles.gridBot}>
                    </MaterialCommunityIcons>
                </Row>
            </Col>
        )
    }
    function throwDices() {

        setStatus('Select dice');

        for (let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);

        if (nbrOfThrowsLeft === 0) {
            setNbrOfThrowsLeft(3)
            setTurnsLeft(turnsLeft - 1)
        }

        if (nbrOfThrowsLeft === 0 && turnsLeft === 0) {
            setStatus('Game over. All points selected.')
        }
        // Reset array on roll
        setSelectedDice([false,false,false,false,false,false,])
    }

    // Row is the array used when rendering, followed by a loop making dice selectable
    let row = [];

    function selectDice(index) {
        // Get dice value from board-array
        const addTotalString = board[index]
        const newSelectedDice = [...selectedDice];
        newSelectedDice[index] = !newSelectedDice[index];
        setSelectedDice(newSelectedDice);
    }

    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable key={"row" + i} onPress={() => {selectDice(i); setSelect(true)}}>
                <MaterialCommunityIcons
                name={board[i]}
                size={50}
                color={selectedDice[i] ? 'black':'steelblue'}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    console.log(board)
    return (
        <View style={styles.gameboard}>
            <Text style={styles.item}>{row}</Text>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>
                        Roll dice
                    </Text>
                </Pressable>
                <Text style={styles.gameinfo}>Total: {total}</Text>
                <Text style={styles.gameinfo}>You are {BONUSAMOUNT - newScore} points away from bonus</Text>
                <Grid style={styles.gameinfo}>
                    {gridArray[0]}
                    {gridArray[1]}
                    {gridArray[2]}
                    {gridArray[3]}
                    {gridArray[4]}
                    {gridArray[5]}
                </Grid>
        </View>
    )
}