import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../style/style';

let board = [];


// Loop to print cols and rows to make code more compact

let gridArray = [];

for (let i = 0; i < 6; i++) {
    gridArray.push(
        <Col>
            <Row name={'item' + i}
            key={"row" + i}
            size={35}
            color={'steelblue'}>
                0
            </Row>
            <Row>
                <MaterialCommunityIcons
                    name={'numeric-' + (i+1) + '-circle'}
                    key={"row" + i}
                    size={35}
                    color={'steelblue'}>
                </MaterialCommunityIcons>
            </Row>
        </Col>
    )
}

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

    let row = [];

    function throwDices() {

        for (let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50}
            color={'steelblue'}>
            </MaterialCommunityIcons>
        );
    }

    return (
        <View style={styles.gameboard}>
            <Text style={styles.item}>{row}</Text>
            <Text style={styles.gameinfo}>Throws left: {NBR_OF_THROWS}</Text>
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