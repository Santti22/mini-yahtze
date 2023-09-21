import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../style/style';

let board = [];

// Array and loop for spot count
let placeholderNums = [];

for (let i = 0; i < 6; i++) {
    placeholderNums.push(
        <MaterialCommunityIcons
            name={'numeric-' + (i+1) + '-circle'}
            key={"row" + i}
            size={35}
            color={'steelblue'}>
        </MaterialCommunityIcons>
    )
}

// Count dice numbers and assign them here
let pointArray = [];

for (let i = 0; i < 6; i++) {
    pointArray.push(
        <View
            name={'item'}
            key={"row" + i}
            size={35}
            color={'steelblue'}>0
        </View>
    )
}


const NBR_OF_THROWS = 3;
const BONUSAMOUNT = 63;
const TURNS = 0;

export default function Gameboard() {

    const [status, setStatus] = useState('Roll dice');
    const [select, setSelect] = useState(false)
    const [total, setTotal] = useState(0)

    return (
        <View style={styles.gameboard}>
            <Text style={styles.gameinfo}>Throws left: {NBR_OF_THROWS}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>
                        Roll dice
                    </Text>
                </Pressable>
                <Text style={styles.gameinfo}>Total: {total}</Text>
                <Text style={styles.gameinfo}>You are {BONUSAMOUNT} points away from bonus</Text>
                <Grid>
                    <Col>
                        <Row>{pointArray[0]}</Row>
                        <Row>{placeholderNums[0]}</Row>
                    </Col>
                    <Col>
                        <Row>{pointArray[1]}</Row>
                        <Row>{placeholderNums[1]}</Row>
                    </Col>
                    <Col>
                        <Row>{pointArray[2]}</Row>
                        <Row>{placeholderNums[2]}</Row>
                    </Col>
                    <Col>
                        <Row>{pointArray[3]}</Row>
                        <Row>{placeholderNums[3]}</Row>
                    </Col>
                    <Col>
                        <Row>{pointArray[4]}</Row>
                        <Row>{placeholderNums[4]}</Row>
                    </Col>
                    <Col>
                        <Row>{pointArray[5]}</Row>
                        <Row>{placeholderNums[5]}</Row>
                    </Col>
                </Grid>
        </View>
    )
}