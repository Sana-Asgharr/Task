import React, { createRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
// import Carousel, { Pagination } from 'react-native-snap-carousel'
import onboarding_1 from '../../assets/images/Onboarding_1.png'
import onboarding_2 from '../../assets/images/Onboarding_2.png'
import onboarding_3 from '../../assets/images/Onboarding_3.png'
import { AppButton } from '../../components'
import { COLORS, FONT1MEDIUM, FONT1REGULAR } from '../../constants'

function Onboarding({ navigation }) {
  let carouselRef = createRef()
  const sliderWidth = Dimensions.get('window').width
  const [state, setState] = useState({
    entries: [
      {
        image: onboarding_1,
        title: 'Bitemate',
        sub:
          'A place to discover food of every culture ever.'
      },
      {
        image: onboarding_2,
        title: 'The Digital Cookbook',
        sub:
          'Support your favorite creators and discover delicacies and fusions you’d never have thought possible'
      },
      {
        image: onboarding_3,
        title: 'Travel from your Kitchen',
        sub:
          'Learn new and ancient techniques from chefs and personalities from all around the world'
      }
    ],
    activeSlide: 0
  })
  const { activeSlide, entries } = state

  const _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.slide}>
        <View style={{ borderRadius: 300, height: 270, width: 270, borderWidth: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#d3d3d3' }}>
          <Image
            source={item.image}
            style={{ width: 240, borderRadius: 170, height: 240, resizeMode: 'contain' }}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.sub}</Text>
      </View>
    )
  }

  function pagination() {
    return (
      <></>
      // <Pagination
      //   dotsLength={entries.length}
      //   activeDotIndex={activeSlide}
      //   dotStyle={styles.dotStyle}
      //   inactiveDotStyle={styles.inactiveDotStyle}
      //   inactiveDotOpacity={0.4}
      //   inactiveDotScale={1}
      // />
    )
  }

  const changeSlide = () => {
    if (activeSlide === 2) {
      navigation.navigate('GettingStarted')
      return
    }
    carouselRef?._snapToItem(activeSlide + 1)
    setState(pre => ({ ...pre, activeSlide: pre.activeSlide + 1 }))
  }

  const backSlide = () => {
    carouselRef?._snapToItem(activeSlide - 1)
    setState(pre => ({ ...pre, activeSlide: pre.activeSlide - 1 }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        {/* <Carousel
          layout={'default'}
          ref={e => {
            carouselRef = e
          }}
          onSnapToItem={index =>
            setState(pre => ({ ...pre, activeSlide: index }))
          }
          data={entries}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
        /> */}
        {pagination()}
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonWidth}>
          <AppButton
            title={activeSlide === 2 ? 'Get Started' : 'Next'}
            onPress={changeSlide}
          />
          {activeSlide === 1 && (
            <AppButton
              title={'Prev'}
              prefix={
                <Icon
                  name='arrowleft'
                  type='antdesign'
                  size={12}
                  containerStyle={{ marginRight: 5 }}
                />
              }
              backgroundColor={'transparent'}
              color={COLORS.darkBlack}
              onPress={backSlide}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: wp('100%'),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  postfix: { flexDirection: 'row', alignItems: 'center' },
  carousel: {
    height: '70%',
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide: { width: '100%', alignItems: 'center' },
  title: {
    textAlign: 'center',
    fontFamily: FONT1MEDIUM,
    fontSize: hp(4),
    width: '60%',
    marginTop: 30
  },
  sub: {
    textAlign: 'center',
    fontFamily: FONT1REGULAR,
    fontSize: hp('2%'),
    marginTop: 10,
    width: '70%'
  },
  buttonView: { height: '20%', width: '100%', alignItems: 'center' },
  buttonWidth: { width: '80%' },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: -5,
    backgroundColor: COLORS.primary
  },
  inactiveDotStyle: {
    backgroundColor: COLORS.darkGrey
  }
})

export default Onboarding
