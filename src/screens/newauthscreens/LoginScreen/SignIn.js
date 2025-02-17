import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import InputField from '../../../components/InputField'
import SocialField from '../../../components/SocialField'
import NextButton from '../../../components/NextButton'

const { width, height } = Dimensions.get('window')


const SignIn = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    return (
        <SafeAreaView style={[styles.safeArea,]}>
            <StatusBar barStyle='dark-content' translucent={true} backgroundColor="transparent" />
            <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back.png')} resizeMode='contain' style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'rgba(13, 16, 64, 1)', fontFamily: 'Poppins-Bold', fontSize: 28, textAlign: 'center' }} >Welcome Back!</Text>
                </View>
            </View>
            <View style={styles.container}>
                <SocialField text={'CONTINUE WITH FACEBOOK'} img={require('../../../assets/images/facebook.png')} style={{ backgroundColor: 'rgba(54, 74, 176, 1)' }} textStyle={{ color: 'rgba(246, 241, 251, 1)' }} />
                <SocialField text={'CONTINUE WITH GOOGLE'} img={require('../../../assets/images/Google.png')} />
                <Text style={{ textAlign: 'center', color: 'rgba(13, 16, 64, 0.5)', fontFamily: 'Poppins-Regular', fontSize: 14, marginVertical: 30 }}>OR LOG IN WITH EMAIL</Text>
                <InputField placeholder={'Email address'} value={email} onChangeText={(t) => setEmail(t)} />
                <InputField placeholder={'Password'} value={password} onChangeText={(t) => setPassword(t)} />
            </View>
            <View style={{ width: '90%', marginTop: 40, alignSelf: 'center' }}>

                <NextButton title={'LOG IN'} onPress={() => navigation.navigate('SignIn')} />
                <TouchableOpacity style={{ marginTop: 14 }}>
                    <Text style={{ color: 'rgba(13, 16, 64, 1)', textAlign: 'center' }}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: 60 }}>
                <Text style={{ color: 'rgba(161, 164, 178, 1)', fontSize: 14, fontFamily: 'Poppins-Regular', textAlign: 'center', }}>
                    DON'T HAVE AN ACCOUNT?
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: 'rgba(0, 96, 91, 1)', left: 4 }}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default SignIn

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.03,
        paddingTop: 20
    }
})