import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONT1REGULAR} from '../../constants';
import Notification from '../../assets/svg/Notification.svg';
import MenuIcon from '../../assets/svg/menu.svg';
import BackIcon from '../../assets/svg/ArrowLeft.svg';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import BitemateLogo from '../../assets/svg/bitemateLogo.svg';
import {Icon} from 'react-native-elements';
import BiteMateWhite from '../../assets/svg/bitemateWhite.svg';
import WhiteMenuIcon from '../../assets/svg/whiteMenuIcon.svg';
// import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Header({
  title,
  menu,
  profile,
  bookmark,
  onBackPress,
  notification,
  back,
  left,
  right,
  rightText,
  titleFont,
  pin,
  titleStyle,
  onTitlePress,
  marginLeftTitle,
  vmenu,
  bgColor,
  centerMode,
  leftEmpty = false,
  extraHeight,
  rightTextPress,
  backWhite,
  isFav,
  showIsFav,
  favLoading,
  rightEmpty,
  _removeToFavorite,
  _addToFavorite,
  titlePress,
  fontFamily,
  edit,
  dots,
  bidOpen,
  blockUser,
  whiteLogo,
  menuWhite,
  hideLogo = false,
  message,
  bid,
  blocked,
  blockUsers,
  subscriptionOpen,
  _unsubscribeUser,
  marginRightTitle,
  userID,
}) {
  const [menuVisible, setMenuVisible] = useState(true);
  const [bidButton, setBidButton] = useState(false);
  const navigation = useNavigation();
  const {userData, otherUserData} = useSelector(state => state?.user);
  const handlemenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
  const openMenu = () => {
    setMenuVisible(true);
  };
  const openBid = () => {
    setBidButton(!bidButton);
  };
  const renderSubscriptionAction = (mySubscriptions, userID) => {
    const isSubscribed = mySubscriptions?.some(subscription =>
      subscription.beneficiary_users?.some(user => user?.id === userID),
    );
    return isSubscribed ? 'unsubscribe' : 'subscribe';
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor ? bgColor : COLORS.white,
          height: extraHeight
            ? hp('12%')
            : Platform.OS === 'ios'
            ? hp('5%')
            : hp('6%'),
          marginTop: extraHeight ? -10 : -8,
          justifyContent: centerMode ? 'center' : 'space-between',
        },
      ]}>
      {/* <StatusBar backgroundColor={COLORS.headerBG} barStyle="dark-content" /> */}
      {leftEmpty && <View style={styles.leftSide} />}
      {back ? (
        <TouchableOpacity
          style={backWhite ? styles.bookmark : styles.left}
          onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}>
          <BackIcon
            style={{
              marginLeft: left ? left : backWhite ? -5 : 0,
              marginRight: right ? right : 0,
            }}
            height={40}
            widt={40}
          />
        </TouchableOpacity>
      ) : (
        <>
          {!hideLogo && (
            <View>{whiteLogo ? <BiteMateWhite /> : <BitemateLogo />}</View>
          )}
        </>
      )}
      <View style={titleStyle ? titleStyle : styles.titleContainer}>
        <TouchableWithoutFeedback onPress={onTitlePress ? onTitlePress : ()=> {}}>
        <Text
          style={[
            styles.title,
            {
              fontFamily: fontFamily ? fontFamily : FONT1REGULAR,
              fontSize: titleFont ? titleFont : hp('2%'),
              marginLeft: marginLeftTitle ? marginLeftTitle : 0,
              marginRight: marginRightTitle ? marginRightTitle : 0,
              // textTransform: "capitalize",
            },
          ]}>
          {title?.length > 30 ? title.substring(0, 30 - 3) + '...' : title}
        </Text>
        </TouchableWithoutFeedback>
      </View>
      {menu && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {edit && (
            <TouchableOpacity
              onPress={() => navigation.navigate('SetupProfile')}>
              <Text
                style={{
                  fontFamily: FONT1REGULAR,
                  color: COLORS.darkBlack,
                  fontSize: hp(2),
                  marginRight: 15,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
          {notification && (
            <TouchableOpacity
              style={styles.notification}
              onPress={() => navigation.navigate('Notification')}>
              <Notification
                height={hp('3%')}
                width={hp('3%')}
                style={{marginRight: 15, marginLeft: -5}}
              />
              {/* <View style={styles.bagde} /> */}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            {menuWhite ? <WhiteMenuIcon /> : <MenuIcon />}
          </TouchableOpacity>
        </View>
      )}
      {/* {dots && (
        <Menu style={[styles.menu]}>
          <MenuTrigger onPress={!bid ? openMenu : openBid}>
            <Icon
              name="dots-three-vertical"
              type="entypo"
              size={18}
              color={COLORS.darkBlack}
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{marginTop: 30, width: 120}}
            style={{marginLeft: -30}}>
            {menuVisible && !bid && (
              <View
                style={[
                  {
                    height: otherUserData?.profile_type == 1 ? 120 : 100,
                    justifyContent: 'center',
                    borderColor: COLORS.gray3,
                    // borderWidth: 1,
                    borderRadius: 4,
                    backgroundColor: COLORS.white,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                  },
                ]}>
                {otherUserData?.profile_type == 1 && <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    bidOpen();
                    handlemenuVisible();
                  }}>
                  {/* <Image
                    source={require('../../assets/images/bid.png')}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 5,
                      marginLeft: 5,
                      marginBottom: 10
                    }} /> 
                  <Text
                    style={{
                      color: COLORS.darkBlack,
                      fontFamily: FONT1REGULAR,
                      fontSize: hp(2),

                      marginLeft: 5,
                      marginBottom: 10,
                      textTransform: 'capitalize',
                    }}>
                    {'Bid'}
                  </Text>
                </TouchableOpacity>}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    blockUser();
                    handlemenuVisible();
                  }}>
                  {/* {blocked ? <Image
                    source={require('../../assets/images/blok.png')}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 5,
                      marginLeft: 5,
                      marginBottom: 10
                    }} /> : <Image
                    source={require('../../assets/images/unblock.png')}
                    style={{
                      width: 26,
                      height: 26,
                      marginRight: 5,
                      marginLeft: 5,
                      marginBottom: 10
                    }} />}    
                  <Text
                    style={{
                      color: COLORS.darkBlack,
                      fontFamily: FONT1REGULAR,
                      fontSize: hp(2),
                      marginLeft: 5,
                      marginBottom: 10,

                      textTransform: 'capitalize',
                    }}>
                    {blocked ? 'Unblock' : 'block'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const action = renderSubscriptionAction(
                      userData?.my_subscriptions,
                      userID,
                    );
                    if (action === 'subscribe') {
                      subscriptionOpen();
                      handlemenuVisible();
                    } else {
                      _unsubscribeUser();
                      handlemenuVisible();
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  {/* <Image
                    source={require('../../assets/images/unsub.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 5,
                      marginLeft: 8,
                      marginBottom: 10
                    }} />
                  <Text
                    style={{
                      color: COLORS.darkBlack,
                      fontFamily: FONT1REGULAR,
                      fontSize: hp(2),
                      marginLeft: 5,
                      textTransform: 'capitalize',
                      marginBottom: 10,
                    }}>
                    {renderSubscriptionAction(
                      userData?.my_subscriptions,
                      userID,
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {bid && bidButton && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  bidOpen();
                  handlemenuVisible();
                }}>
                <Image
                  // source={require('../../assets/images/bid.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 5,
                    marginLeft: 40,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.darkBlack,
                    fontFamily: FONT1REGULAR,
                    fontSize: hp(2),
                    // marginLeft: 20,
                    marginBottom: 10,
                    textTransform: 'capitalize',
                  }}>
                  {'Bid'}
                </Text>
              </TouchableOpacity>
            )}
          </MenuOptions>
        </Menu>
      )} */}
      {rightText && (
        <TouchableOpacity
        // onPress={() => (rightTextPress ? rightTextPress() : console.log(""))}
        >
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      )}
      {/* {rightEmpty && <View style={{ width: "10%" }} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSide: {width: 30},
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: COLORS.darkBlack,
    fontFamily: FONT1REGULAR,
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  left: {
    width: 40,
    height: 40,
  },
  // titleContainer: {
  //   flex: 1,
  //   position: "absolute",
  //   left: 50,
  //   right: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width:100,
  // },

  title: {
    color: COLORS.darkBlack,
    fontFamily: FONT1REGULAR,
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  rightText: {
    color: COLORS.darkBlack,
    fontFamily: FONT1REGULAR,
  },
  bagde: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginTop: -22,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  notification: {},
  bookmark: {
    width: 50,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfile: {
    width: 150,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    right: 10,
    top: 40,
    zIndex: 3,
  },
  heartView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.heartBG,
    borderRadius: 50,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heartContainer: {width: '100%', alignItems: 'flex-end', marginTop: -50},
});
