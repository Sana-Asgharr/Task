import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react';
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
  Animated,
  SafeAreaView,
  Modal,
  Platform,
} from 'react-native';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppButton, AppInput, Header} from '../../components';
import {COLORS, FONT1MEDIUM, FONT1REGULAR, mapStyle} from '../../constants';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getContinents} from '../../api/auth';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import GlobeWebView from './globeView';
import {useSelector} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

Geocoder.init('AIzaSyCvKP9iZ6fpXwTiokStkPe8H0XSUD12DbU');

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const navigation = useNavigation()

const NewGlobeModal = ({
  setNameValue,
  visible,
  onClose,
  setSelectedId,
  setIsCountryData,
  navigation,
  onBackPress,
  handleChangeMain,
  setSelectedCountry,
  selectedCountry,
  setLocationType,
  setCountryInformation
}) => {
  var mapRef = useRef(null);
  const {countries, userData} = useSelector(state => state.user);
  const [state, setState] = useState({
    locationRegion: {
      latitude: 40.7128,
      longitude: 74.006,
      latitudeDelta: 0.0922,
      longitudeDelta: LONGITUDE_DELTA,
    },
    searchText: '',
    // filteredList: countries || [],
    filteredList: countries,
    showSearch: false,
    bySearch: false,
    countryName: '',
    countryID: '',
    countryCode: '',
    continents: [],
    continentID: '',
    continentName: '',
    countryDish: '',
    isRight: false,
    id: null,
    name: '',
  });

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
    name,
  } = state;
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});


  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      handleChange('bySearch', false);
      setCountryData(null);
      handleChange('continentName', '');
      setCountryData('');
      handleChange('countryID', '');
      handleChange('countryCode', '');
      handleChange('countryDish', '');
      handleChange('continentID', '');
      // handleChange("continentName", "")
      handleChange('countryName', '');
      handleChange('searchText', '');
      getContinentData();
      setIsCountryData(null);
      // setIsCountryData(countryData)
    }, []),
  );

    // const handleScroll = () => {
    //   setIsScrolling(true)
    // }
  
    // const handleScrollEnd = () => {
    //   setIsScrolling(false)
    // }
    // const getContinentData = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem("token")
    //     const continents = await getContinents(token)
    //     handleChange("continents", continents?.data)
    //   } catch (error) {
    //     console.log("error", error)
    //   }
    // }
  
    // const handleChange = (name, value) => {
    //   setState(pre => ({ ...pre, [name]: value }))
    // }
  
    // const filtered = (key, value) => {
    //   handleChange(key, value)
    //   if (value) {
    //     const re = new RegExp(value?.toLocaleLowerCase(), "i")
    //     var filtered = countries?.filter(entry => {
    //       return Object.values(entry).some(val =>
    //         JSON.stringify(val)?.toLocaleLowerCase().match(re)
    //       )
    //     })
    //     handleChange("filteredList", filtered)
    //   } else {
    //     handleChange("filteredList", countries)
    //   }
    // }
  
    // const findCountry = async name => {
    //   try {
    //     setLoading(true)
    //     const response = await axios.get(
    //       `https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`
    //     )
    //     const country = response.data[0]
        
    //     setLoading(false)
    //     handleChange("showSearch", !showSearch)
    //     handleChange("countryCode", "")
    //     return country
    //   } catch (error) {
    //     console.error("Error fetching country data", error)
    //     setLoading(false)
    //   }
    // }
  
    // useEffect(() => {
    //   if (countryName) {
    //     findCountry(countryName).then(country => {
    //       console.log("country", country)
    //       setIsCountryData({
    //           name: country.name.common,
    //           capital: country.capital?.[0],
    //           population: Number(country.population),
    //           continent: country.continents?.[0],
    //           flag: country.flags?.png,
    //           countryCode: country.cca2
    //         })
    //     })
    //   }
    // }, [countryName])
  
  const [isSwiping, setIsSwiping] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };
  const getContinentData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const continents = await getContinents(token);
      handleChange('continents', continents?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = (name, value) => {
    setState(pre => ({...pre, [name]: value}));
  };

  const filtered = (key, value) => {
    handleChange(key, value);
    if (value) {
      const re = new RegExp(value?.toLocaleLowerCase(), 'i');
      const filtered = countries?.filter((country) => re.test(country?.name));      handleChange('filteredList', filtered);
    } else {
      handleChange('filteredList', countries);
    }
  };

  const findCountry = async name => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`,
      );
      const country = response.data[0];

      setCountryData({
        name: country.name.common,
        capital: country.capital?.[0],
        population: Number(country.population),
        continent: country.continents?.[0],
        flag: country.flags?.png,
        countryCode: country.cca2,
      });
      setLoading(false);
      handleChange('showSearch', !showSearch);
      handleChange('countryCode', '');
      setIsCountryData({
        name: country.name.common,
        capital: country.capital?.[0],
        population: Number(country.population),
        continent: country.continents?.[0],
        flag: country.flags?.png,
        countryCode: country.cca2,
      });
    } catch (error) {
      console.error('Error fetching country data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countryName) {
      findCountry(countryName);
    }
  }, [countryName]);

  const toggleShowMore = id => {
    setShowMore(prev => ({...prev, [id]: !prev[id]}));
  };

  const [features, setFeatures] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [groupedData, setGroupedData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
        );
        const worldData = await response.json();
        const validFeatures = worldData?.features?.filter(
          feature => feature.properties?.NAME,
        );

        setFeatures(validFeatures);
        const grouped = groupFeatures(validFeatures);
        setGroupedData(grouped);
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    loadMapData();
  }, []);

  useEffect(() => {
    if(searchText){
      if(!visible){
        handleChange('searchText', '')
      }
    }
  }, [visible]);

  const groupFeatures = (data) => {
    return data.reduce((acc, feature) => {
      const {CONTINENT, SUBREGION, NAME} = feature.properties;

      if (!acc[CONTINENT]) {
        acc[CONTINENT] = {};
      }

      if (!acc[CONTINENT][SUBREGION]) {
        acc[CONTINENT][SUBREGION] = [];
      }

      acc[CONTINENT][SUBREGION].push(NAME);
      return acc;
    }, {});
  };

  const handleCheckboxPress = item => {
    setSelectedItem(item);
    setSearchInput(item);
  };

  const handleShowMore = continent => {
    setShowMore(prev => ({...prev, [continent]: !prev[continent]}));
  };

  //   const renderGroupedData = () => {
  //     return Object.entries(groupedData).map(([continent, subregions]) => {
  //       const isExpanded = showMore[continent];
  //       const visibleSubregions = isExpanded
  //         ? subregions
  //         : Object.fromEntries(Object.entries(subregions).slice(0, 1));

  //       return (
  //         <View key={continent} style={styles.groupContainer}>
  //           <View style={styles.continentHeaderContainer}>
  //             <BouncyCheckbox
  //               size={18}
  //               fillColor={'#c92020'}
  //               onPress={() => handleCheckboxPress(continent)}
  //               disableText={true}
  //               isChecked={selectedItem === continent}
  //             />
  //             <Text style={styles.continentHeader}>{continent}</Text>
  //           </View>

  //           {Object.entries(visibleSubregions).map(([subregion, countries]) => (
  //             <View key={subregion} style={styles.subregionContainer}>
  //               <View style={styles.subregionHeaderContainer}>
  //                 <BouncyCheckbox
  //                   size={18}
  //                   fillColor={'#c92020'}
  //                   onPress={() => handleCheckboxPress(subregion)}
  //                   disableText={true}
  //                   isChecked={selectedItem === subregion}
  //                 />
  //                 <Text style={styles.subregionHeader}>{subregion}</Text>
  //               </View>

  //               {countries.slice(0, isExpanded ? countries.length : 5).map((country, index) => (
  //                 <View key={index} style={styles.countryRow}>
  //                   <BouncyCheckbox
  //                     size={18}
  //                     fillColor={'#c92020'}
  //                     onPress={() => handleCheckboxPress(country)}
  //                     disableText={true}
  //                     isChecked={selectedItem === country}
  //                   />
  //                   <Text style={styles.countryText}>{country}</Text>
  //                 </View>
  //               ))}

  //               {!isExpanded && countries.length > 5 && (
  //                 <TouchableOpacity onPress={() => handleShowMore(continent)}>
  //                   <Text style={styles.showMore}>Show More</Text>
  //                 </TouchableOpacity>
  //               )}
  //             </View>
  //           ))}

  //           {isExpanded && (
  //             <TouchableOpacity onPress={() => handleShowMore(continent)}>
  //               <Text style={styles.showMore}>Show Less</Text>
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //       );
  //     });
  //   };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              position: 'relative',
              paddingTop: Platform.OS == 'ios' ? 70 : 10,
              paddingBottom: 50
            }}>
            <Header
              fontFamily={FONT1MEDIUM}
              back
              onBackPress={() => {
                onClose();
                handleChange('bySearch', false);
                handleChange('isRight', false);
              }}
              title={'Countries-Continents-Regions'}
            />
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: '100%',
              }}>
              <AppInput
                label={'Search…'}
                width={'95%'}
                marginTop={20}
                placeholder={'Search…'}
                placeholderColor={COLORS.black}
                fullBorder={false}
                borderColor={COLORS.grey}
                prefix={
                  <Icon
                    name={'search1'}
                    type="antdesign"
                    style={{marginLeft: 5, marginRight: 10}}
                    color={COLORS.black}
                  />
                }
                height={45}
                name={'searchText'}
                value={searchText}
                onChange={(key, value) => filtered(key, value)}
              />
              <ScrollView
                nestedScrollEnabled
                style={{width: '100%', height: '100%'}}
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={handleScroll}
                onScrollEndDrag={handleScrollEnd}
                onTouchStart={() => setIsSwiping(true)}
                onTouchEnd={() => setIsSwiping(false)}>
                <View>
                  <FlatList
                    data={searchText ? filteredList : continents}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={{width: '100%', marginTop: 20}}
                    scrollEnabled
                    renderItem={({item}) => {
                      const flattenedItems = [
                        ...(item.country || []),
                        ...(item.island || []),
                        ...(item.region || []),
                        ...(item.territory || []),
                      ].sort((a, b) => a[1]?.localeCompare(b[1]));

                      const itemsToDisplay = searchText ? [] : showMore[item.id]
                        ? flattenedItems
                        : flattenedItems.slice(0, 5);

                      return (
                        <View style={{width: '100%'}}>
                          <TouchableOpacity
                            style={{
                              width: '100%',
                              height: 30,
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              borderRadius: 8,
                              backgroundColor: COLORS.white,
                            }}>
                            <View
                              style={{
                                height: 40,
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderRadius: 8,
                                backgroundColor: COLORS.white,
                              }}>
                              {/* <BouncyCheckbox
                                size={18}
                                fillColor={COLORS.primary}
                                disableBuiltInState={true}
                                unfillColor={COLORS.white}
                                onPress={() => {
                                  setNameValue(item?.name);
                                  setSelectedId(item?.id);
                                  setSelectedCountry(item?.id);
                                  setLocationType(item?.location_type)
                                  handleChange('countryID', '');
                                  handleChange('id', item?.id);
                                  handleChange('name', item?.name);
                                  if (continentID === item?.id) {
                                    handleChange('continentID', '');
                                  } else {
                                    handleChange('continentID', item?.id);
                                    handleChange('continentName', item?.name);
                                    handleChange('countryID', '');
                                  }
                                  if(selectedCountry !== item?.id){
                                    onClose();
                                  }
                                }}
                                disableText={true}
                                isChecked={selectedCountry === item?.id}
                                iconStyle={{borderColor: COLORS.primary}}
                              /> */}
                              <TouchableOpacity 
                              onPress={() => {
                                setNameValue(item?.name);
                                setSelectedId(item?.id);
                                setSelectedCountry(item?.id);
                                setLocationType(item?.location_type)
                                handleChange('countryID', '');
                                handleChange('id', item?.id);
                                handleChange('name', item?.name);
                                
                                if (continentID === item?.id) {
                                  handleChange('continentID', '');
                                } else {
                                  handleChange('continentID', item?.id);
                                  handleChange('continentName', item?.name);
                                  handleChange('countryID', '');
                                }
                                if(selectedCountry !== item?.id){
                                  onClose();
                                }
                              }}
                              >
                              <Text
                                style={[
                                  styles.text1,
                                  {
                                    fontFamily: FONT1REGULAR,
                                    marginLeft: searchText ? 10 : 15,
                                    fontSize: searchText ? 14 : 18,
                                    color: COLORS.black,
                                    fontWeight: searchText ? '100' : 'bold',
                                  },
                                ]}>
                                {item?.name}
                              </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                          <FlatList
                            data={itemsToDisplay}
                            numColumns={showMore[item.id] ? 2 : 1}
                            key={showMore[item.id] ? 'twoColumns' : 'oneColumn'}
                            keyExtractor={(subItem, index) =>
                              `${item.id}-${index}`
                            }
                            renderItem={({item: subItem}) => {
                              return (
                                <View
                                  style={{
                                    flex: 1,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {/* <BouncyCheckbox
                                    size={18}
                                    fillColor={COLORS.primary}
                                    unfillColor={COLORS.white}
                                    onPress={() => {
                                      setLocationType(subItem?.[2])
                                      setSelectedCountry(subItem?.[0]);
                                      setNameValue(subItem?.[1]);
                                      setSelectedId(subItem?.[0]);
                                      selectedCountry !== subItem?.[0] && onClose();
                                      handleChange('countryName', subItem?.[1]);
                                    }}
                                    disableText={true}
                                    isChecked={selectedCountry == subItem?.[0]}
                                    iconStyle={{borderColor: COLORS.primary}}
                                  /> */}
                                  <TouchableOpacity
                                  onPress={() => {
                                    setLocationType(subItem?.[2])
                                    setSelectedCountry(subItem?.[0]);
                                    setNameValue(subItem?.[1]);
                                    setSelectedId(subItem?.[0]);
                                    selectedCountry !== subItem?.[0] && onClose();
                                    handleChange('countryName', subItem?.[1]);
                                  }}
                                  >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: COLORS.black,
                                      marginLeft: 10,
                                    }}>
                                    {subItem?.[1] || subItem.name}
                                  </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            }}
                          />

                          {flattenedItems.length > 5 && (
                            <TouchableOpacity
                              onPress={() => toggleShowMore(item.id)}
                              style={{alignItems: 'center', padding: 10}}>
                              <Text style={{color: COLORS.primary}}>
                                {showMore[item.id] ? 'Show Less' : 'Show More'}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    }}
                    keyExtractor={item => item?.id.toString()}
                  />
                </View>
              </ScrollView>

              {/* {continentID === id && (
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
            )} */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: 'white',
    // marginVertical: Platform.OS == 'ios' ? 100 : 1,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    width: '75%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    right: -15,
  },
  back: {
    width: 30,
    height: 30,
  },
  pageWrapper: {
    margin: 10,
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    fontSize: 16,
    borderColor: '#adadad',
    marginBottom: 10,
  },
  checkButton: {
    width: 20,
    height: 20,
  },
  searchButton: {
    width: 30,
    height: 30,
  },
  groupContainer: {
    margin: 10,
  },
  continentHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  continentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  subregionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  subregionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  subregionContainer: {
    marginLeft: 10,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 20,
  },
  countryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  showMore: {
    color: '#c92020',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 5,
  },
});

export default NewGlobeModal;
