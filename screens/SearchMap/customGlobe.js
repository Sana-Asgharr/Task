import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import * as d3 from 'd3-geo';
import {Icon} from 'react-native-elements';
import {COLORS, FONT1MEDIUM} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import NewGlobeModal from './selectStatesModal';
import GlobeModal from './globeSelectModal';
import {getCountries} from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components';
import axios from 'axios';

const WorldGlobe = () => {
  const width = 400;
  const height = 400;
  const [features, setFeatures] = useState([]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [clickSelected, setClickSelected] = useState('');
  const [pointerPosition, setPointerPosition] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  // const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryInformation, setCountryInformation] = useState(null);
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({type: '', value: ''});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isCountryFlags, setIsCountryFlags] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [locationType, setLocationType] = useState('');

  const navigation = useNavigation();

  const findCountry = async name => {
    try {
      setCountryLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`,
      );
      const country = response.data[0];

      console.log('country>>>>>>>>>>', country)
      setCountryLoading(false);

      setCountryInformation({
        name: country.name.common,
        capital: country.capital?.[0],
        population: Number(country.population),
        continent: country.continents?.[0],
        flag: country.flags?.png,
        countryCode: country.cca2,
      });
      // setLoading(false);
      // handleChange('showSearch', !showSearch);
      // handleChange('countryCode', '');
      // setIsCountryData({
      //   name: country.name.common,
      //   capital: country.capital?.[0],
      //   population: Number(country.population),
      //   continent: country.continents?.[0],
      //   flag: country.flags?.png,
      //   countryCode: country.cca2,
      // });
    } catch (error) {
      console.error('Error fetching country data', error);
      // setLoading(false);
      setCountryLoading(false);
    }
  };

  useEffect(() => {
    if (selectedInfo?.value || clickSelected) {
      findCountry(selectedInfo?.value || clickSelected);
    }
  }, [selectedInfo?.value, clickSelected]);

  // console.log('selectedInfo, clickSelected', selectedInfo, clickSelected, countryInformation)

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
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    loadMapData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setClickSelected('');
    }
  }, [selectedCountry]);

  const projection = d3
    .geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(180)
    .rotate(rotation)
    .clipAngle(90);

  const pathGenerator = d3.geoPath(projection);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const {dx, dy} = gestureState;
      setRotation(([lon, lat, roll]) => [
        lon + dx / 2,
        Math.max(Math.min(lat - dy / 2, 90), -90),
        roll,
      ]);
      setPointerPosition(null);
    },
  });

  useEffect(() => {
    if (selectedName) {
      handleSearch();
    }
  }, [selectedName]);

  const selectedArea = feature => {
    const countryName = feature.properties?.NAME?.toLowerCase();
    const regionName = feature.properties?.CONTINENT?.toLowerCase();
    const subregionName = feature.properties?.SUBREGION?.toLowerCase();

    const searchText = selectedName.toLowerCase();
    if (selectedName) {
      if (countryName == searchText && isSearchClick) {
        return 'white';
      } else if (subregionName == searchText && isSearchClick) {
        return 'white';
      } else if (regionName == searchText && isSearchClick) {
        return 'white';
      } else {
        return '#415704';
      }
    } else {
      if (countryName == clickSelected) {
        return 'white';
      } else {
        return '#415704';
      }
    }
  };

  const handlePress = event => {
    setSearchResult(null);
    setSelectedInfo({type: '', value: ''});
    const {locationX, locationY} = event.nativeEvent;
    const coords = projection.invert([locationX, locationY]);
    if (coords) {
      const country = features.find(feature => d3.geoContains(feature, coords));
      if (country) {
        setSelectedCoords({latitude: coords[1], longitude: coords[0]});
        setClickSelected(country?.properties?.NAME);
        setSelectedName(country?.properties?.NAME);
        setSelectedCountry('');
        // setSearchResult({ ...country, coords });
      } else {
        setIsSearchClick(false);
        setSelectedCoords(null);
        setSelectedCountry('');
        setClickSelected('');
      }
    }
  };

  const handleSearch = () => {
    const query = selectedName.toLowerCase();
    setIsSearchClick(true);
    const countryOrRegion = features.find(feature => {
      const countryName = feature.properties?.NAME?.toLowerCase();
      const regionName = feature.properties?.CONTINENT?.toLowerCase();
      const subregionName = feature.properties?.SUBREGION?.toLowerCase();

      return (
        countryName?.includes(query) ||
        regionName?.includes(query) ||
        subregionName?.includes(query)
      );
    });

    if (countryOrRegion) {
      const coords = d3.geoCentroid(countryOrRegion);
      setSearchResult({...countryOrRegion, coords});
      setSelectedCoords({latitude: coords[1], longitude: coords[0]});

      setSelectedInfo({
        type:
          query === countryOrRegion.properties?.NAME?.toLowerCase()
            ? 'Country'
            : query === countryOrRegion.properties?.CONTINENT?.toLowerCase()
            ? 'Continent'
            : 'Subregion',
        value:
          query === countryOrRegion.properties?.NAME?.toLowerCase()
            ? countryOrRegion.properties?.NAME
            : query === countryOrRegion.properties?.CONTINENT?.toLowerCase()
            ? countryOrRegion.properties?.CONTINENT
            : countryOrRegion.properties?.SUBREGION,
      });
      animateRotation([-coords[0], -coords[1]]);
    } else {
      setSelectedCoords(null);
      // setSearchResult(null);
      setSelectedInfo({type: '', value: selectedName});
      // alert('Location not found');
    }
  };

  const animateRotation = targetRotation => {
    const animationDuration = 1000;
    const frameRate = 1;
    const totalFrames = (animationDuration / 1000) * frameRate;

    const [startLon, startLat] = rotation;
    const [endLon, endLat] = targetRotation;
    let frame = 0;

    const animate = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const interpolatedLon = startLon + progress * (endLon - startLon);
      const interpolatedLat = startLat + progress * (endLat - startLat);

      const newRotation = [
        interpolatedLon,
        Math.max(Math.min(interpolatedLat, 90), -90),
        0,
      ];

      setRotation(newRotation);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        if (searchResult && searchResult.coords) {
          const projectedCoords = projection(searchResult.coords);
          setPointerPosition([projectedCoords[0], projectedCoords[1]]);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // const resetSelection = () => {
  //   setSelectedCoords(null);
  //   setSelectedCountry('');
  //   setPointerPosition(null);
  //   setSearchResult(null);
  //   setSelectedInfo({ type: '', value: '' });
  // };

  const handleVisitCountry = async () => {
    setSearchLoading(true);
    if (clickSelected) {
      try {
        const token = await AsyncStorage.getItem('token');
        const filterCountries = await getCountries(token, clickSelected);
        const country_object = {
          id: filterCountries?.data?.[0]?.id,
          name: filterCountries?.data?.[0]?.name,
          continent: filterCountries?.data?.[0]?.continent,
          flag: filterCountries?.data?.[0]?.flag,
          countryCode: filterCountries?.data?.[0]?.code,
        };
        setSearchLoading(false);
        navigation.navigate('CountryPosts', {
          countryID: filterCountries?.data?.[0]?.id,
          country: filterCountries?.data?.[0]?.name,
          countryFlag: country_object,
          countryCode: undefined,
          continentName: filterCountries?.data?.[0]?.name,
          locationName: filterCountries?.data?.[0]?.name,
          locationType: 'country'
        });
      } catch (error) {
        setSearchLoading(false);
        alert('Location not found');
        // console.log("error", error)
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
              fontFamily={FONT1MEDIUM}
              bgColor={'black'}
              whiteLogo
              menuWhite
              onBackPress={() => navigation.navigate('Home')}
              menu
              marginLeftTitle={25}
            />
    
    <ImageBackground
      source={require('../../assets/images/galaxy.jpg')}
      style={styles.background}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <Svg height={height} width={width} onPress={handlePress}>
          {/* Draw the globe outline (circle) */}
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={180}
            fill="#0e0936"
            stroke="#292929"
            strokeWidth={1}
          />
          {/* Draw each country */}
          {features.map((feature, index) => (
            <Path
              key={`path-${index}`}
              d={pathGenerator(feature)}
              fill={selectedArea(feature)}
              stroke="#333"
              strokeWidth="0.5"
            />
          ))}
          {/* Pointer */}
          {selectedCoords && (clickSelected || selectedName) && (
            <>
              {/* Dot */}
              <Circle
                cx={
                  projection([
                    selectedCoords?.longitude,
                    selectedCoords?.latitude,
                  ])[0]
                }
                cy={
                  projection([
                    selectedCoords?.longitude,
                    selectedCoords?.latitude,
                  ])[1]
                }
                r={5}
                fill="black"
              />
              {/* Country Name */}
              <Text
                style={{
                  position: 'absolute',
                  top:
                    projection([
                      selectedCoords?.longitude,
                      selectedCoords?.latitude,
                    ])[1] - 15,
                  left:
                    projection([
                      selectedCoords?.longitude,
                      selectedCoords?.latitude,
                    ])[0] + 10,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 4,
                  borderRadius: 4,
                  fontSize: 12,
                }}>
                {selectedInfo.value ? selectedInfo.value : clickSelected}
              </Text>
            </>
          )}
        </Svg>
      </View>

      <View style={styles.bottomWrap}>
      {selectedInfo?.value || clickSelected ?  (
        countryLoading ? <ActivityIndicator size={'small'} style={{height: 100}} /> : <View>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 600}}>
              {selectedInfo?.value || clickSelected}
            </Text>
            <Text style={{color: 'white', marginLeft: 10}}>
              Capital: {countryInformation?.capital}
            </Text>
            <Text style={{color: 'white', marginLeft: 10}}>
              Continent: {countryInformation?.continent}
            </Text>
            <Text style={{color: 'white', marginLeft: 10}}>
              Population: {countryInformation?.population}
            </Text>
            <Text style={{color: 'white', marginLeft: 10}}>
              National Dish: N/A
            </Text>
        </View>
            )
          :
          (
          <View style={styles.search}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{}}>
            <View style={{ marginRight: 10 }}>
                            <Icon
                              name={"search1"}
                              type="antdesign"
                              color={COLORS.white}
                              size={30}
                            />
                          </View>
          </TouchableOpacity>
        </View>
          )}
        {selectedName && searchResult && !clickSelected ? (
          <View style={{alignItems: 'center', top: '15%', width: 160}}>
            <TouchableOpacity
              style={styles.infoBox}
              onPress={() =>
                navigation.navigate('CountryPosts', {
                  countryID: selectedId,
                  country:
                    selectedInfo.type == 'Country'
                      ? selectedInfo.value
                      : undefined,
                  countryFlag: isCountryFlags,
                  countryCode: undefined,
                  continentName:
                    selectedInfo.type == 'Continent'
                      ? selectedInfo.value
                      : undefined,
                  searchType: selectedInfo.type,
                  locationName: selectedInfo.value,
                  locationType: locationType
                })
              }>
              <Text style={styles.infoText}>
                Visit: {selectedInfo.value}
              </Text>
            </TouchableOpacity>
          </View>
        ) : clickSelected ? (
          <View style={{alignItems: 'center', top: '15%', width: 160}}>
            <TouchableOpacity
              style={styles.infoBox}
              onPress={() => handleVisitCountry()}>
              <Text style={styles.infoText}>
                {searchLoading ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  `Visit: ${clickSelected}`
                )}
              </Text>
            </TouchableOpacity>
          </View>
        ) : selectedInfo?.value ? (
          <View style={{alignItems: 'center', top: '15%', width: 160}}>
            <TouchableOpacity
              style={styles.infoBox}
              onPress={() =>
                navigation.navigate('CountryPosts', {
                  countryID: selectedId,
                  country: selectedInfo.value,
                  countryFlag: undefined,
                  countryCode: undefined,
                  searchType: selectedInfo.type,
                  continentName: selectedInfo.value,
                  locationName: selectedInfo.value,
                  locationType: locationType
                  // searchType: selectedInfo.type
                })
              }>
              <Text style={styles.infoText}>Visit: {selectedInfo.value}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {/* <View style={styles.bottomWrap}>
        <View style={styles.search}>
          
        </View>
        <TouchableOpacity style={styles.infoBox}>
          {selectedName && searchResult ? (
            <Text style={styles.infoText}>
              {selectedInfo.type}: {selectedInfo.value}
            </Text>
          ) : (
            <Text style={styles.infoText}>Country: {selectedCountry}</Text>
          )}
        </TouchableOpacity>
      </View> */}

      <View style={{zIndex: 1000}}>
        <NewGlobeModal
          setNameValue={setSelectedName}
          setSelectedId={setSelectedId}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          visible={isModalVisible}
          setIsCountryData={setIsCountryFlags}
          setLocationType={setLocationType}
          setCountryInformation={setCountryInformation}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    // marginLeft: '45%',
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  bottomWrap: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 20,
    padding: 10,
    // marginHorizontal: 20,
    width: '100%',
  },
  search: {
    padding: 6,
    marginHorizontal: 0,
    justifyContent: 'center',
    marginLeft: 0
  },
  searchButton: {
    width: 50,
    height: 50,
  },
});

export default WorldGlobe;
