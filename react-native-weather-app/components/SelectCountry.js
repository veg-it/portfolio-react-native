import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import { Icon } from 'react-native-elements';

export default function SelectCountry({
  gXY,
  _getcloudcover,
  _getData,
  _getprecipitation,
  _getrelativehumidity_2m,
  _getwindspeed_10m,
}) {
  //Список стран для выпадающего списка
  const countries = [
    'Kyiv',
    'Lviv',
    'Dnieper',
    'Kharkiv',
    'IvanoFrankivsk',
    'Ternopil',
    'Vinnitsa',
    'Zaporozhye',
    'Khmelnytskyy',
    'Odessa',
    'LutskVolynska',
    'Poltava',
    'Rovno',
    'Cherkasy',
    'Kropyvnytskyi',
    'Zhitomir',
    'Chernivtsi',
    'Mykolaiv',
    'Chernihiv',
    'Sumy',
    'Uzhgorod',
    'Kherson',
    'Donetsk',
    'Lugansk',
    'Simferopol',
  ];
  return (
    <View style={styles.container}>
      {/* Выбор страны из списка */}
      <SelectDropdown
        // Передаем список стран
        data={countries}
        //Элемент по умолчанию
        defaultButtonText={'Kyiv'}
        // Параметр для отображения поискавой строки
        search={true}
        renderSearchInputRightIcon={() => {
          return (
            // Иконка поисковой строки
            <Icon name={'search'} type="font-awesome" size={18} color="#333" />
          );
        }}
        searchInputStyle={styles.searchInputStyle}
        searchInputTxtColor={'#f3f3f3'}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle}
        dropdownStyle={styles.dropdownStyle}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.selectC_buttonTextStyle}
        onSelect={(selectedItem) => {
          //При выборе другой страны отправляется запрос к АПИ на обновление информации
          //Получение облачности
          _getcloudcover(gXY[0][selectedItem]['l'], gXY[0][selectedItem]['d']);
          //Получение облачности
          _getprecipitation(
            gXY[0][selectedItem]['l'],
            gXY[0][selectedItem]['d']
          );
          //Получение осадки
          _getrelativehumidity_2m(
            gXY[0][selectedItem]['l'],
            gXY[0][selectedItem]['d']
          );
          //Получение скорости ветра
          _getwindspeed_10m(
            gXY[0][selectedItem]['l'],
            gXY[0][selectedItem]['d']
          );
          //Получение температуры
          _getData(gXY[0][selectedItem]['l'], gXY[0][selectedItem]['d']);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectC_buttonTextStyle: {
    textAlign: 'left',
    marginTop: 24,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f3f3f3',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  buttonStyle: {
    backgroundColor: 'none',
    paddingHorizontal: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    height: 100,
  },
  dropdownStyle: {
    backgroundColor: '#1b1d1f',
    height: 400,
    borderWidth: 0,
  },
  rowTextStyle: {
    color: '#5A5C5E',
    marginHorizontal: 0,
    borderWidth: 0,
  },
  searchInputStyle: {
    backgroundColor: '#1b1d1f',
    paddingLeft: 10,
    borderWidth: 0,
  },
  rowStyle: {
    paddingLeft: 5,
    paddingVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
});
