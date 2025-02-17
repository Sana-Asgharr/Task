import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import InputField from '../../../components/InputField'
import PasswordInput from '../../../components/PasswordInput'
import SocialField from '../../../components/SocialField'
import { Checkbox } from 'react-native-paper';

import NextButton from '../../../components/NextButton'

const { width, height } = Dimensions.get('window')


const SignUp = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setUserName] = useState('')
    const [checked, setChecked] = useState(false)

    return (
        <SafeAreaView style={[styles.safeArea,]}>
            <StatusBar barStyle='dark-content' translucent={true} backgroundColor="transparent" />
            <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back.png')} resizeMode='contain' style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
                <View style={{ marginTop: 14 }}>
                    <Text style={{ color: 'rgba(13, 16, 64, 1)', fontFamily: 'Poppins-Bold', fontSize: 28, textAlign: 'center' }} >Create your account</Text>
                </View>
            </View>
            <View style={styles.container}>
                <SocialField text={'CONTINUE WITH FACEBOOK'} mg={require('../../../assets/images/facebook.png')} style={{ backgroundColor: 'rgba(54, 74, 176, 1)' }} textStyle={{ color: 'rgba(246, 241, 251, 1)' }} />
                <SocialField text={'CONTINUE WITH GOOGLE'} mg={require('../../../assets/images/Google.png')} />
                <Text style={{ textAlign: 'center', color: 'rgba(13, 16, 64, 0.5)', fontFamily: 'Poppins-Regular', fontSize: 14, marginVertical: 20 }}>OR SIGN UP WITH EMAIL</Text>
                <InputField placeholder={'john'} value={name} onChangeText={(t) => setUserName(t)} name={'check'} />
                <InputField placeholder={'imshuvo97@gmail.com'} value={email} onChangeText={(t) => setEmail(t)} name={'check'} />
                <PasswordInput placeholder={'12345'} value={password} onChangeText={(t) => setPassword(t)} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ marginHorizontal: 6, left: 3 }}>
                        <Text style={{ color: 'rgba(161, 164, 178, 1)', fontFamily: 'Poppins-Regular' }}>
                            I have read the<Text style={{ color: 'rgba(142, 151, 253, 1)' }}> Privacy Policy</Text>
                        </Text>
                    </View>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        uncheckedColor={'rgba(161, 164, 178, 1)'}
                        color={'#11E2CC'}
                    />


                </View>
            </View>
            <View style={{ width: '90%', marginTop: 40, alignSelf: 'center' }}>

                <NextButton title={'SIGN UP'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:5 }}>
                <Text style={{ color: 'rgba(161, 164, 178, 1)', fontSize: 14, fontFamily: 'Poppins-Regular', textAlign: 'center', }}>
                    ALREADY HAVE AN ACCOUNT?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ color: 'rgba(0, 96, 91, 1)', left: 4 }}>SIGN UP</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>

    )
}

export default SignUp

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width*0.03,
        paddingTop: 20
    }
})