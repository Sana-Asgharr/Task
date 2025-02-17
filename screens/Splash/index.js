import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS, FONT2BOLD } from '../../constants'
import Logo from "../../assets/images/Logo.png"
class Splash extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render = () => (
    <View style={styles.View_617_1877}>
      <View style={{ height: 50 }} />
      <View style={{ borderWidth: 3, borderColor: '#9A9495', width: 330, alignItems: 'center', justifyContent: 'center', height: 330, borderRadius: 500 }}>
        <View style={{ borderWidth: 6, borderColor: COLORS.primary, width: 300, height: 300, borderRadius: 500, alignItems: 'center', justifyContent: 'center', }}>
          <Image source={Logo} style={{ width: '80%', height: 180 }} resizeMode='contain' />
        </View>
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.primary,
          fontSize: hp(2),
          fontFamily: FONT2BOLD,
          marginBottom: 20
        }}
      >
        Why did the sandwich ask the pickle to be its Bitemate?
        Because it couldn't relish the thought of being alone!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  View_617_1877: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default Splash
