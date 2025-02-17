import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient'

const NextButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <LinearGradient colors={['#11E2CC', '#00605B']} style={styles.nextButton} start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} >
                <Text style={[styles.nextButtonText, { color: props.color }]}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default NextButton

const styles = StyleSheet.create({
    nextButton: {
        width: '100%',
        height: 63,
        // backgroundColor: '#CD9A8A',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    nextButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
})