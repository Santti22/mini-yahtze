import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../style/style';

// Array to save dice on roll
let board = [];
let countBoard = [];

// Loop to print cols and rows to make code more compact


const NBR_OF_THROWS = 3;
const NBR_OF_DICES = 5;
const BONUSAMOUNT = 63;
const TURNS = 13;
const newScore = 0;

export default function Gameboard() {

    const [status, setStatus] = useState('Roll dice');
    const [select, setSelect] = useState(false);
    const [total, setTotal] = useState(0)
    const [totalArray, setTotalArray] = useState([0, 0, 0, 0, 0, 0]);
    const [gridArray, setGridArray] = useState([])

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [turnsLeft, setTurnsLeft] = useState(TURNS)
    const [selectedDice, setSelectedDice] = useState([false,false,false,false,false,false])

    function throwDices() {

        countTotal();

        setStatus('Select dice');

        for (let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            countBoard[i]  = randomNumber;
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

    // Counter runs on dice roll, extracts number from array if the dice is selected
    function countTotal() {
        let sum = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (selectedDice[i]) {
                const amount = countBoard[i]
                sum += amount

                const arrayIndex = amount - 1;

                // Add the sum to the score-array
                setTotalArray(prevTotalArray => {
                    const newTotalArray = [...prevTotalArray];
                    newTotalArray[arrayIndex] += sum;
                    return newTotalArray;
            })
        }
        console.log(totalArray)
        
    }}

    for (let i = 0; i < 6; i++) {
        gridArray.push(
            <Col>
                <Row name={'item' + i}
                key={"row" + i}
                size={35}
                color={'steelblue'}
                style={styles.gridTop}>
                    {totalArray[i]}
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
    useEffect(() => {
        const grid = totalArray.map((value, index) => (
            <Col key={`col${index}`}>
            <Row key={`rowTop${index}`} size={35} color={'steelblue'} style={styles.gridTop}>
                {value}
            </Row>
            <Row key={`rowBot${index}`}>
                <MaterialCommunityIcons
                    name={`numeric-${index + 1}-circle`}
                    size={35}
                    color={'steelblue'}
                    style={styles.gridBot}
                />
            </Row>
            </Col>
        ) )
        setGridArray(grid)
      }, [totalArray]);

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