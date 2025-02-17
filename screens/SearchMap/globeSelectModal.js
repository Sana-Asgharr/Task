import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';

const GlobeModal = ({ setNameValue, visible, onClose }) => {
  const [features, setFeatures] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [groupedData, setGroupedData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
        );
        const worldData = await response.json();
        const validFeatures = worldData?.features?.filter(
          (feature) => feature.properties?.NAME
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

  const groupFeatures = (data) => {
    return data.reduce((acc, feature) => {
      const { CONTINENT, SUBREGION, NAME } = feature.properties;

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

  const handleSearch = (value) => {
    setSearchInput(value);
    const query = value.toLowerCase();
    const filtered = features.filter((feature) => {
      const { NAME, CONTINENT, SUBREGION } = feature.properties;
      return (
        NAME.toLowerCase().includes(query) ||
        CONTINENT.toLowerCase().includes(query) ||
        SUBREGION.toLowerCase().includes(query)
      );
    });

    if (filtered.length > 0) {
      const grouped = groupFeatures(filtered);
      setGroupedData(grouped);
    } else {
      Alert.alert('Location not found');
      setGroupedData(groupFeatures(features));
    }
  };

  const handleCheckboxPress = (item) => {
    setSelectedItem(item);
    // setSearchInput(item);
    handleTickButton(item)
  };

  const handleTickButton = (item) => {
    setSelectedItem('');
    setSearchInput('');
    setGroupedData(groupFeatures(features));
    if (setNameValue) setNameValue(item);
    onClose();
  };

  const handleShowMore = (continent) => {
    setShowMore(prev => ({ ...prev, [continent]: !prev[continent] }));
  };

  // Helper function to render countries in rows of 1 or 2
  const renderCountriesInRows = (countries, isExpanded) => {
    const limitedCountries = countries.slice(0, isExpanded ? countries.length : 5);

    // Create rows of 1 or 2 items per row
    const rows = [];
    for (let i = 0; i < limitedCountries.length; i += 2) {
      rows.push(limitedCountries.slice(i, i + 2));
    }

    return (
      <>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.countryRowContainer}>
            {row.map((country, index) => (
              <View key={index} style={[styles.countryRow, isExpanded && { width: '50%' }]}>
                {/* <BouncyCheckbox
                  size={18}
                  fillColor={'#c92020'}
                  onPress={() => handleCheckboxPress(country)}
                  disableText={true}
                  isChecked={selectedItem === country}
                /> */}
                <Text style={styles.countryText}>{country}</Text>
              </View>
            ))}
          </View>
        ))}
      </>
    );
  };

  const renderGroupedData = () => {
    return Object.entries(groupedData).map(([continent, subregions]) => {
      const isExpanded = showMore[continent];
      const visibleSubregions = isExpanded
        ? subregions
        : Object.fromEntries(Object.entries(subregions).slice(0, 1));

      return (
        <View key={continent} style={styles.groupContainer}>
          <View style={styles.continentHeaderContainer}>
            {/* <BouncyCheckbox
              size={18}
              fillColor={'#c92020'}
              onPress={() => handleCheckboxPress(continent)}
              disableText={true}
              isChecked={selectedItem === continent}
            /> */}
            <Text style={styles.continentHeader}>{continent}</Text>
          </View>

          {Object.entries(visibleSubregions).map(([subregion, countries]) => (
            <View key={subregion} style={styles.subregionContainer}>
              <View style={styles.subregionHeaderContainer}>
                {/* <BouncyCheckbox
                  size={18}
                  fillColor={'#c92020'}
                  onPress={() => handleCheckboxPress(subregion)}
                  disableText={true}
                  isChecked={selectedItem === subregion}
                /> */}
                <Text style={styles.subregionHeader}>{subregion}</Text>
              </View>

              {renderCountriesInRows(countries, isExpanded)}

              {!isExpanded && countries.length > 5 && (
                <TouchableOpacity onPress={() => handleShowMore(continent)}>
                  <Text style={styles.showMore}>Show More</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {isExpanded && (
            <TouchableOpacity onPress={() => handleShowMore(continent)}>
              <Text style={styles.showMore}>Show Less</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.head}>
              <TouchableOpacity onPress={onClose}>
                <Icon
                  name={'left'}
                  type="antdesign"
                  style={{ marginLeft: 5, marginRight: 5, width: 20, height: 20 }}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <Text style={styles.header}>Countries-Continents-Regions</Text>
            </View>
            <View style={styles.pageWrapper}>
              <View style={styles.input}>
                <Icon
                  name={'search1'}
                  type="antdesign"
                  style={{ marginLeft: 5, marginRight: 5 }}
                  color={COLORS.grey}
                />
                <TextInput
                  style={{ width: '95%', fontSize: 18, color: COLORS.darkBlack }}
                  value={searchInput}
                  placeholder={"Search…"}
                  placeholderColor={COLORS.darkBlack}
                  onChangeText={handleSearch}
                  onSubmitEditing={handleSearch}
                />
                {/* {searchInput && (
                  <TouchableOpacity
                    onPress={handleTickButton}
                    style={{ position: 'absolute', right: 0 }}
                  >
                    <Icon
                      name={'check-circle'}
                      type="octicons"
                      style={{ marginLeft: 5, marginRight: 5 }}
                      color={COLORS.grey}
                    />
                  </TouchableOpacity>
                )} */}
              </View>
              <ScrollView>{renderGroupedData()}</ScrollView>
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
    marginLeft: 0,
    marginBottom: 5,
  },
  subregionHeader: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  subregionContainer: {
    marginLeft: 10,
  },
  countryRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%', // Single column by default
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

export default GlobeModal;
