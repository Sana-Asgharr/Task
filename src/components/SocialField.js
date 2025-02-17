import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../services/colors'
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get('window')
import { darkTheme, lightTheme } from '../redux/theme/theme'

const SocialField = (props) => {

      const theme = useSelector(state => state.theme.theme)
      const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <TouchableOpacity style={[{
      width: width * 0.9,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(235, 234, 236, 1)',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 60,
      marginVertical: 10
    }, props.style]}>
      <Image source={props.img} style={{ width: 24, height: 24 }} resizeMode='contain' />
      <Text style={[{ color: 'rgba(13, 16, 64, 1)', fontFamily: 'Poppins-Bold', left: 50 }, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default SocialField

const styles = StyleSheet.create({
 
})