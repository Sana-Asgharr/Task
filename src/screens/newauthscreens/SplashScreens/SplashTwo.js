import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../../assets/images/signInLogo.svg'
import Frame from '../../../assets/images/Frame.svg'
import NextButton from '../../../components/NextButton'

const SplashTwo = () => {
    const navigation = useNavigation()
  

    return (
        <SafeAreaView style={[styles.safeArea]}>
            <StatusBar barStyle='dark-content' translucent={true} backgroundColor="transparent" />
            <Frame style={{ position: "absolute" }} />
            <View style={styles.container}>

                <Logo style={{ marginTop: 130 }} />
                <View style={{ marginTop: 100, marginHorizontal: 40 }}>
                    <Text style={{ color: 'rgba(13, 16, 64, 0.79)', fontSize: 30, fontFamily: 'Poppins-Bold', textAlign: 'center', }}>
                        We are what we do</Text>
                    <Text style={{ color: 'rgba(13, 16, 64, 0.79)', fontSize: 16, fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 20 }}>
                        Thousand of people are usign silent moon
                        for smalls meditation </Text>
                </View>

            </View>
            <View style={{ width: '90%', marginTop: 66 }}>
                <NextButton title={'Sign Up'} onPress={() => navigation.navigate('SignUp')} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: 8 }}>
                    <Text style={{ color: 'rgba(161, 164, 178, 1)', fontSize: 14, fontFamily: 'Poppins-Regular', textAlign: 'center', }}>
                        ALREADY HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={{ color: 'rgba(0, 96, 91, 1)', left: 2 }}>LOG IN</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>

    )
}

export default SplashTwo

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    }
})