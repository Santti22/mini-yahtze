import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo } from '@expo/vector-icons';
import styles from '../style/style';

let board = [];

// Array for numbers at bottom
let placeholderNums = [1, 2, 3, 4, 5, 6];

// Count dice numbers and assign them here
let pointArray = [];

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
                <Text style={styles.gameinfo}></Text>
                <Text style={styles.gameinfo}>{placeholderNums}</Text>
        </View>
    )
}