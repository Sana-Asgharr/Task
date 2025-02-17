import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect
} from "react"
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  Animated
} from "react-native"
// import BouncyCheckbox from "react-native-bouncy-checkbox"
import { AppButton, AppInput, Header } from "../../components"
import { COLORS, FONT1MEDIUM, FONT1REGULAR, mapStyle } from "../../constants"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import Geolocation from "@react-native-community/geolocation"
import { Icon } from "react-native-elements"
import Geocoder from "react-native-geocoding"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getContinents } from "../../api/auth"
// import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures"
import GlobeWebView from "./globeView"
import { useSelector } from "react-redux"
Geocoder.init("AIzaSyCvKP9iZ6fpXwTiokStkPe8H0XSUD12DbU")

const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height
let LATITUDE_DELTA = 0.0922
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default function SearchMap({
  navigation,
  onBackPress,
  handleChangeMain
}) {
  // const navigation = useNavigation()
  var mapRef = useRef(null)
  const { countries, userData } = useSelector((state) => state.user)
  const [state, setState] = useState({
    locationRegion: {
      latitude: 40.7128,
      longitude: 74.006,
      latitudeDelta: 0.0922,
      longitudeDelta: LONGITUDE_DELTA
    },
    searchText: "",
    // filteredList: countries || [],
    filteredList: countries,
    showSearch: false,
    bySearch: false,
    countryName: "",
    countryID: "",
    countryCode: "",
    continents: [],
    continentID: "",
    continentName: "",
    countryDish: "",
    isRight: false,
    id: null,
    name: ""
  })

  const {
    locationRegion,
    searchText,
    filteredList,
    showSearch,
    bySearch,
    countryName,
    countryID,
    countryCode,
    continents,
    continentID,
    continentName,
    countryDish,
    isRight,
    id,
    name
  } = state
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showMore, setShowMore] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null);



  useFocusEffect(
    useCallback(() => {
      setLoading(false)
      handleChange("bySearch", false)
      setCountryData(null)
      handleChange("continentName", "")
      setCountryData("")
      handleChange("countryID", "")
      handleChange("countryCode", "")
      handleChange("countryDish", "")
      handleChange("continentID", "")
      handleChange("countryName", "")
      handleChange("searchText", "")
      getContinentData()
    }, [])
  )
  
  const [isSwiping, setIsSwiping] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const handleSwipeGesture = (direction, state) => {
    if (!isSwiping && isScrolling) {
      onSwipe(direction, state)
    }
  }

  const handleSwipeLeft = state => {
    if (!isSwiping) {
      onSwipeLeft(state)
    }
  }

  const handleSwipeRight = state => {
    if (!isSwiping) {
      onSwipeRight(state)
    }
  }

  const onSwipeRight = gestureState => {
    if (isRight) {
      handleChange("isRight", !isRight)
    }
  }

  const onSwipeLeft = gestureState => {
    handleChange("isRight", !isRight)
  }

  const onSwipe = gestureState => {
    if (isRight) {
      handleChange("isRight", false)
    }
  }
  const handleScroll = () => {
    setIsScrolling(true)
  }

  const handleScrollEnd = () => {
    setIsScrolling(false)
  }
  const getContinentData = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const continents = await getContinents(token)
      handleChange("continents", continents?.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const config = {
    velocityThreshold: 0.7,
    directionalOffsetThreshold: 80
  }

  const filtered = (key, value) => {
    handleChange(key, value)
    if (value) {
      const re = new RegExp(value?.toLocaleLowerCase(), "i")
      var filtered = countries?.filter(entry => {
        return Object.values(entry).some(val =>
          JSON.stringify(val)?.toLocaleLowerCase().match(re)
        )
      })
      handleChange("filteredList", filtered)
    } else {
      handleChange("filteredList", countries)
    }
  }

  const findCountry = async name => {
    try {
      setLoading(true)
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`
      )
      const country = response.data[0]

      setCountryData({
        name: country.name.common,
        capital: country.capital?.[0],
        population: Number(country.population),
        continent: country.continents?.[0],
        flag: country.flags?.png,
        countryCode: country.cca2
      })
      setLoading(false)
      handleChange("showSearch", !showSearch)
      handleChange("countryCode", "")
      handleChange("countryName", "")
    } catch (error) {
      console.error("Error fetching country data", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (countryName) {
      findCountry(countryName)
    }
  }, [countryName])

  function convertToMillion(number) {
    let millionValue = (number / 1000000).toFixed(2)
    return `${millionValue}M`
  }
  const toggleShowMore = id => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }))
  }
  if (bySearch || isRight) {
    return (
      // <GestureRecognizer
      //   onSwipe={(direction, state) => handleSwipeGesture(direction, state)}
      //   onSwipeRight={state => handleSwipeRight(state)}
      //   onSwipeLeft={state => handleSwipeLeft(state)}
      //   config={config}
      //   style={{
      //     flex: 1,
      //     backgroundColor: COLORS.white
      //   }}
      // >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            backgroundColor: COLORS.white,
            position: "relative"
          }}
        >
          <Header
            fontFamily={FONT1MEDIUM}
            back
            onBackPress={() => {
              handleChange("bySearch", false)
              handleChange("isRight", false)
            }}
            title={"Countries-Continents-Regions"}
          />
          <View
            style={{
              width: "90%",
              alignItems: "center",
              paddingHorizontal: 15,
              height: "100%"
            }}
          >
            <AppInput
              label={"Search…"}
              width={"95%"}
              marginTop={20}
              placeholder={"Search…"}
              placeholderColor={COLORS.black}
              fullBorder={false}
              borderColor={COLORS.grey}
              prefix={
                <Icon
                  name={"search1"}
                  type="antdesign"
                  style={{ marginLeft: 5, marginRight: 10 }}
                  color={COLORS.black}
                />
              }
              height={45}
              name={"searchText"}
              value={searchText}
              onChange={(key, value) => filtered(key, value)}
            />
            <ScrollView
              nestedScrollEnabled
              style={{ width: "100%", height: "100%" }}
              showsVerticalScrollIndicator={false}
              onScrollBeginDrag={handleScroll}
              onScrollEndDrag={handleScrollEnd}
              onTouchStart={() => setIsSwiping(true)}
              onTouchEnd={() => setIsSwiping(false)}
            >
              <View>
                <FlatList
                  data={continents}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={{ width: "100%", marginTop: 20 }}
                  scrollEnabled
                  renderItem={({ item }) => {
                    const flattenedItems = [
                      ...(item.country || []),
                      ...(item.island || []),
                      ...(item.region || []),
                      ...(item.territory || [])
                    ].sort((a, b) => a[1]?.localeCompare(b[1]))

                    const itemsToDisplay = showMore[item.id]
                      ? flattenedItems
                      : flattenedItems.slice(0, 5)

                    return (
                      <View style={{ width: "100%" }}>
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            height: 30,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 8,
                            backgroundColor: COLORS.white
                          }}
                        >
                          <View
                            style={{
                              height: 40,
                              alignItems: "center",
                              flexDirection: "row",
                              borderRadius: 8,
                              backgroundColor: COLORS.white
                            }}
                          >
                            {/* <BouncyCheckbox
                              size={18}
                              fillColor={COLORS.primary}
                              disableBuiltInState={true}
                              unfillColor={COLORS.white}
                              onPress={() => {
                                handleChange("countryID", "")
                                handleChange("id", item?.id)
                                handleChange("name", item?.name)
                                if (continentID === item?.id) {
                                  handleChange("continentID", "")
                                } else {
                                  handleChange("continentID", item?.id)
                                  handleChange("continentName", item?.name)
                                  handleChange("countryID", "")
                                }
                              }}
                              disableText={true}
                              isChecked={continentID === item?.id}
                              iconStyle={{ borderColor: COLORS.primary }}
                            /> */}
                            <Text
                              style={[
                                styles.text1,
                                {
                                  fontFamily: FONT1REGULAR,
                                  marginLeft: 15,
                                  fontSize: 18,
                                  color: COLORS.black,
                                  fontWeight: "bold"
                                }
                              ]}
                            >
                              {item?.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <FlatList
                          data={itemsToDisplay}
                          numColumns={showMore[item.id] ? 2 : 1}
                          key={showMore[item.id] ? "twoColumns" : "oneColumn"}
                          keyExtractor={(subItem, index) =>
                            `${item.id}-${index}`
                          }
                          renderItem={({ item: subItem }) => (
                            <View
                              style={{
                                flex: 1,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              {/* <BouncyCheckbox
                                size={18}
                                fillColor={COLORS.primary}
                                unfillColor={COLORS.white}
                                onPress={() => { }}
                                disableText={true}
                                isChecked={false}
                                iconStyle={{ borderColor: COLORS.primary }}
                              /> */}
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: COLORS.black,
                                  marginLeft: 10
                                }}
                              >
                                {subItem[1] || subItem.name}
                              </Text>
                            </View>
                          )}
                        />

                        {flattenedItems.length > 5 && (
                          <TouchableOpacity
                            onPress={() => toggleShowMore(item.id)}
                            style={{ alignItems: "center", padding: 10 }}
                          >
                            <Text style={{ color: COLORS.primary }}>
                              {showMore[item.id] ? "Show Less" : "Show More"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  }}
                  keyExtractor={item => item?.id.toString()}
                />
              </View>
            </ScrollView>
            {/* {countryID === id && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  left: 40,
                  bottom: 60
                }}
                onPress={() =>
                  navigation.navigate("CountryPosts", {
                    country: countryData?.name || countryName,
                    countryFlag: countryData?.flag,
                    countryCode: countryData?.countryCode,
                    continentName: continentName,
                    countryId: countryID
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    width: 160,
                    height: 50,
                    marginLeft: 50,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: 16 }}>
                    Visit {name}
                  </Text>
                </View>
              </TouchableOpacity>
            )} */}

            {continentID === id && (
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: 160,
                  height: 50,
                  marginLeft: 50,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: 40,
                  bottom: 60
                }}
              >
                <Text
                  onPress={() =>
                    navigation.navigate("CountryPosts", {
                      country: undefined,
                      countryFlag: undefined,
                      countryCode: undefined,
                      continentName: continentName
                    })
                  }
                  style={{ color: COLORS.white, fontSize: 16 }}
                >
                  Visit {name}
                </Text>
              </View>
            )}
          </View>
        </View>
      // </GestureRecognizer>
    )
  }
  return (
    // <GestureRecognizer
    //   onSwipe={(direction, state) => handleSwipeGesture(direction, state)}
    //   onSwipeRight={state => handleSwipeRight(state)}
    //   onSwipeLeft={state => handleSwipeLeft(state)}
    //   config={config}
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.white
    //   }}
    // >
      <View style={styles.container}>
        <Header
          onBackPress={() =>
            onBackPress ? onBackPress("byGlobe") : navigation.goBack()
          }
          menu
          extraHeight={true}
          bgColor={"#000000"}
          whiteLogo={true}
          menuWhite={true}
        />
        {/* <View
          style={{
            position: "relative",
            alignItems: "center",
            backgroundColor: "#000000"
          }}
        >
          {/* <Image
            source={require("../../assets/images/globe.png")}
            style={{ width: "100%", height: "90%", position: "relative" }}
            resizeMode="cover"
          />
        </View>
        {loading && (

          /> 
        </View> */}
        {/* <GlobeWebView onCountrySelect={setSelectedCountry} /> */}

        {selectedCountry && (
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 40,
              bottom: 60,
              backgroundColor: COLORS.primary,
              width: 160,
              height: 50,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10, // Ensure it stays on top
            }}
            onPress={() => {
              navigation.navigate("CountryPosts", {
                country: selectedCountry,
              });
              setSelectedCountry(null); // Reset after navigating
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 16 }}>
              Visit {selectedCountry}
            </Text>
          </TouchableOpacity>
        )}

        {loading && (
          <ActivityIndicator
            color={COLORS.primary}
            size="small"
            style={{
              position: "absolute",
              bottom: 60,
              display: "flex",
              alignItems: "center",
              width: "100%"
            }}
          />
        )}
        {!loading && (
          <>
            <View
              style={{
                position: "absolute",
                width: "95%",
                height: 50,
                bottom: 20,
                left: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Icon
                  name={"search1"}
                  type="antdesign"
                  color={COLORS.white}
                  size={30}
                  onPress={() => handleChange("bySearch", true)}
                />
              </View>
            </View>
          </>
        )}

        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            top: 50,
            zIndex: 9
          }}
        ></View>
      </View>
    // </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%"
  },

  mainBody: {
    width: "100%",
    height: "100%"
  },
  map: {
    width: "100%",
    ...StyleSheet.absoluteFillObject,
    height: "100%"
  }
})
