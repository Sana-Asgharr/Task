import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window')

const PasswordInput = (props) => {
    const [visible, setVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };

    return (
        <View style={{
            width: width * 0.9,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(242, 243, 247, 1)',
            borderRadius: 15,
            paddingHorizontal: 20,
            height: 63,
            marginVertical: 5,
            justifyContent: 'space-between',
            marginVertical: 10

        }}>
            <TextInput placeholder={props.placeholder} placeholderTextColor={'rgba(13, 16, 64, 0.5'} style={{ width: 250, color: 'rgba(13, 16, 64, 0.5', fontFamily: 'Poppins-Regular', left: 0 }} secureTextEntry={!visible} value={props.value} onChangeText={props.onChangeText} />
            <TouchableOpacity
                onPress={togglePasswordVisibility}>
                <Image source={require('../assets/images/eyeOff.png')} resizeMode='contain' style={{ width: 20, height: 10 }} />
                {/* <Feather name={visible ? 'eye' : 'eye-off'} size={24} color={currentTheme.lightGrey} /> */}
            </TouchableOpacity>
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({
    container: {

    }
})