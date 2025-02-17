import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '../services/colors'
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../redux/theme/theme';

const { width, height } = Dimensions.get('window')

const InputField = (props) => {
  const theme = useSelector(state => state.theme.theme)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <View style={{
      width: width * 0.9,
      backgroundColor: 'rgba(242, 243, 247, 1)',
      borderRadius: 15,
      paddingHorizontal: 20,
      height: 63,
      marginVertical: 10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
      <TextInput placeholder={props.placeholder} placeholderTextColor={'rgba(13, 16, 64, 0.5)'} style={{ color: 'rgba(13, 16, 64, 0.5)', fontFamily: 'Poppins-Regular', }} value={props.value} onChangeText={props.onChangeText} />
      <Feather name={props.name} color={'rgba(108, 178, 142, 1)'} size={20} />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
})