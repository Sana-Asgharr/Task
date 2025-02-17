import { StyleSheet, Text, View, Dimensions, SafeAreaView, Image, StatusBar, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'

import Logo from '../../../assets/images/OnBoarding/onBoardingLogo.svg'
import LinearGradient from 'react-native-linear-gradient'
import NextButton from '../../../components/NextButton'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const SplashOne = () => {
  const navigation = useNavigation()

   return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <LinearGradient colors={['#11E2CC', '#000000']} style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: height * 0.16, marginHorizontal: 60 }}>
          <Text style={{ color: '#FFECCC', fontSize: 30, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>Hi Jhon, Welcome
            to My Daily Therapy</Text>
          <Text style={{ color: '#EBEAEC', fontSize: 16, fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 14 }}>
            Explore the app, Find some peace of mind to prepare for meditation.</Text>
        </View>
        <Image source={require('../../../assets/images/OnBoarding/elipse.png')} resizeMode='contain' style={{ width: 10, height: 6, top:45, left:24 }} />

        <Image source={require('../../../assets/images/OnBoarding/elipse.png')} resizeMode='contain' style={{ width: 30, height: 10, top:45, left:24 }} />

        <Image source={require('../../../assets/images/OnBoarding/clouds.png')} resizeMode='contain' style={{ width: 50, height: 20, top:50, right: 10, }} />

        <View style={{ marginTop: 50, alignSelf: 'center', position:'relative' }}>
          <View style={{ width: 492, height: 492, backgroundColor: '#1A4E55', borderRadius: 300, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{ width: 422, height: 422, backgroundColor: '#FCFCFC', borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 354, height: 354, backgroundColor: '#1A4E55', borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 284, height: 284, backgroundColor: '#051835', borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: '#1B383C', height: 215, bottom: 0, alignItems: 'center', justifyContent: 'center' , position:'absolute',}}>
          <Logo style={{ bottom: 225 }} />
          <Image source={require('../../../assets/images/OnBoarding/clouds.png')} resizeMode='contain' style={{ width: 115, height: 55, position: "absolute", bottom: 400, left: 270 }} />
          <Image source={require('../../../assets/images/OnBoarding/blackBird.png')} resizeMode='contain' style={{ width: 36, height: 14, position: "absolute", bottom: 470, left: 240 }} />
          <Image source={require('../../../assets/images/OnBoarding/blueBird.png')} resizeMode='contain' style={{ width: 22, height: 8, position: "absolute", bottom: 440, left: 50 }} />


        </View>
        <View style={{ bottom: 130 , marginHorizontal:25}}>
          <NextButton title={'GET STARTED'} onPress={()=> navigation.navigate('SplashTwo')} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SplashOne

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: height * 0.35
  }


})