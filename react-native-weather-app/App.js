import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

// Подключение компонентов
import SelectCountry from './components/SelectCountry';
import TemperatureTable from './components/TemperatureTable';

export default function App() {
  // Выбранный день из недели
  const [selectedD, setSelectedD] = useState(1);

  // Координаты городов для АПИ
  const [gXY, setGXY] = useState([
    {
      Kyiv: { l: 47.85, d: 35.12 },
      Lviv: { l: 49.84, d: 24.02 },
      Dnieper: { l: 48.47, d: 35.04 },
      Kharkiv: { l: 49.98, d: 36.25 },
      IvanoFrankivsk: { l: 48.92, d: 24.71 },
      Ternopil: { l: 49.55, d: 25.59 },
      Vinnitsa: { l: 49.85, d: 37.72 },
      Zaporozhye: { l: 47.85, d: 35.12 },
      Khmelnytskyy: { l: 49.42, d: 26.98 },
      Odessa: { l: 46.49, d: 30.74 },
      LutskVolynska: { l: 50.76, d: 25.34 },
      Poltava: { l: 49.59, d: 34.55 },
      Rovno: { l: 50.62, d: 26.23 },
      Cherkasy: { l: 49.44, d: 32.06 },
      Kropyvnytskyi: { l: 46.92, d: 35 },
      Zhitomir: { l: 50.26, d: 28.68 },
      Chernivtsi: { l: 48.29, d: 25.93 },
      Mykolaiv: { l: 46.98, d: 31.99 },
      Chernihiv: { l: 51.51, d: 31.28 },
      Sumy: { l: 50.92, d: 34.8 },
      Uzhgorod: { l: 48.62, d: 22.29 },
      Kherson: { l: 46.64, d: 32.61 },
      Donetsk: { l: 48.02, d: 37.8 },
      Lugansk: { l: 47.89, d: 37.68 },
      Simferopol: { l: 44.96, d: 34.11 },
    },
  ]);

  // Переменные для работы приложения
  const [temperature, setTemperature] = useState([]);
  const [windspeed_10m, setWindspeed_10m] = useState([]);
  const [precipitation, setPrecipitation] = useState([]);
  const [relativehumidity_2m, setRelativehumidity_2m] = useState([]);
  const [cloudcover, setCloudcover] = useState([]);
  const [sendApi, setSendApi] = useState(false);
  const [time, setTime] = useState([]);

  // Запрос для получения сведений о температуре
  const _getData = (l, d) => {
    setSendApi(true);
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        l +
        '&longitude=' +
        d +
        '&hourly=temperature_2m'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTemperature((list) => {
          return [...responseJson['hourly']['temperature_2m']];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Запрос для получения сведений о скорости ветра
  const _getwindspeed_10m = (l, d) => {
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        l +
        '&longitude=' +
        d +
        '&hourly=windspeed_10m'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setWindspeed_10m((list) => {
          return [...responseJson['hourly']['windspeed_10m']];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Запрос для получения сведений о влажности
  const _getrelativehumidity_2m = (l, d) => {
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        l +
        '&longitude=' +
        d +
        '&hourly=relativehumidity_2m'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setRelativehumidity_2m((list) => {
          return [...responseJson['hourly']['relativehumidity_2m']];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Запрос для получения сведений о осадках
  const _getprecipitation = (l, d) => {
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        l +
        '&longitude=' +
        d +
        '&hourly=precipitation'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setPrecipitation((list) => {
          return [...responseJson['hourly']['precipitation']];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Запрос для получения сведений о облачности
  const _getcloudcover = (l, d) => {
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        l +
        '&longitude=' +
        d +
        '&hourly=cloudcover'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCloudcover((list) => {
          return [...responseJson['hourly']['cloudcover']];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Получить дату сегодня
  const getDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  };
  // Получить массив с датами ближайших 7 дней
  const sevendays = () => {
    const today = new Date();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return [
      { key: parseInt(dd) + '.' + parseInt(mm), id: 1 },
      { key: parseInt(dd) + 1 + '.' + parseInt(mm), id: 2 },
      { key: parseInt(dd) + 2 + '.' + parseInt(mm), id: 3 },
      { key: parseInt(dd) + 3 + '.' + parseInt(mm), id: 4 },
      { key: parseInt(dd) + 4 + '.' + parseInt(mm), id: 5 },
      { key: parseInt(dd) + 5 + '.' + parseInt(mm), id: 6 },
      { key: parseInt(dd) + 6 + '.' + parseInt(mm), id: 7 },
    ];
  };

  // Функция обновления данных при выборе страны
  const changeDateTemp = (item) => {
    setSelectedD(item);
    switch (item) {
      case 1:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[0]),
            cloud: Math.round(cloudcover[0]),
            relativehumidity: Math.round(relativehumidity_2m[0]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[4]),
            cloud: Math.round(cloudcover[4]),
            relativehumidity: Math.round(relativehumidity_2m[4]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[8]),
            cloud: Math.round(cloudcover[8]),
            relativehumidity: Math.round(relativehumidity_2m[8]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[12]),
            cloud: Math.round(cloudcover[12]),
            relativehumidity: Math.round(relativehumidity_2m[12]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[16]),
            cloud: Math.round(cloudcover[16]),
            relativehumidity: Math.round(relativehumidity_2m[16]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[20]),
            cloud: Math.round(cloudcover[20]),
            relativehumidity: Math.round(relativehumidity_2m[20]),
          },
        ]);
        break;
      case 2:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[24]),
            cloud: Math.round(cloudcover[24]),
            relativehumidity: Math.round(relativehumidity_2m[24]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[28]),
            cloud: Math.round(cloudcover[28]),
            relativehumidity: Math.round(relativehumidity_2m[28]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[32]),
            cloud: Math.round(cloudcover[32]),
            relativehumidity: Math.round(relativehumidity_2m[32]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[36]),
            cloud: Math.round(cloudcover[36]),
            relativehumidity: Math.round(relativehumidity_2m[36]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[40]),
            cloud: Math.round(cloudcover[40]),
            relativehumidity: Math.round(relativehumidity_2m[40]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[44]),
            cloud: Math.round(cloudcover[44]),
            relativehumidity: Math.round(relativehumidity_2m[44]),
          },
        ]);
        break;
      case 3:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[48]),
            cloud: Math.round(cloudcover[48]),
            relativehumidity: Math.round(relativehumidity_2m[48]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[52]),
            cloud: Math.round(cloudcover[52]),
            relativehumidity: Math.round(relativehumidity_2m[52]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[56]),
            cloud: Math.round(cloudcover[56]),
            relativehumidity: Math.round(relativehumidity_2m[56]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[60]),
            cloud: Math.round(cloudcover[60]),
            relativehumidity: Math.round(relativehumidity_2m[60]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[64]),
            cloud: Math.round(cloudcover[64]),
            relativehumidity: Math.round(relativehumidity_2m[64]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[68]),
            cloud: Math.round(cloudcover[68]),
            relativehumidity: Math.round(relativehumidity_2m[68]),
          },
        ]);
        break;
      case 4:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[72]),
            cloud: Math.round(cloudcover[72]),
            relativehumidity: Math.round(relativehumidity_2m[72]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[76]),
            cloud: Math.round(cloudcover[76]),
            relativehumidity: Math.round(relativehumidity_2m[76]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[80]),
            cloud: Math.round(cloudcover[80]),
            relativehumidity: Math.round(relativehumidity_2m[80]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[84]),
            cloud: Math.round(cloudcover[84]),
            relativehumidity: Math.round(relativehumidity_2m[84]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[88]),
            cloud: Math.round(cloudcover[88]),
            relativehumidity: Math.round(relativehumidity_2m[88]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[92]),
            cloud: Math.round(cloudcover[92]),
            relativehumidity: Math.round(relativehumidity_2m[92]),
          },
        ]);
        break;
      case 5:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[96]),
            cloud: Math.round(cloudcover[96]),
            relativehumidity: Math.round(relativehumidity_2m[96]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[100]),
            cloud: Math.round(cloudcover[100]),
            relativehumidity: Math.round(relativehumidity_2m[100]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[104]),
            cloud: Math.round(cloudcover[104]),
            relativehumidity: Math.round(relativehumidity_2m[104]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[108]),
            cloud: Math.round(cloudcover[108]),
            relativehumidity: Math.round(relativehumidity_2m[108]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[112]),
            cloud: Math.round(cloudcover[112]),
            relativehumidity: Math.round(relativehumidity_2m[112]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[116]),
            cloud: Math.round(cloudcover[116]),
            relativehumidity: Math.round(relativehumidity_2m[116]),
          },
        ]);
        break;
      case 6:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[120]),
            cloud: Math.round(cloudcover[120]),
            relativehumidity: Math.round(relativehumidity_2m[120]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[124]),
            cloud: Math.round(cloudcover[124]),
            relativehumidity: Math.round(relativehumidity_2m[124]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[129]),
            cloud: Math.round(cloudcover[129]),
            relativehumidity: Math.round(relativehumidity_2m[129]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[132]),
            cloud: Math.round(cloudcover[132]),
            relativehumidity: Math.round(relativehumidity_2m[132]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[137]),
            cloud: Math.round(cloudcover[137]),
            relativehumidity: Math.round(relativehumidity_2m[137]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[141]),
            cloud: Math.round(cloudcover[141]),
            relativehumidity: Math.round(relativehumidity_2m[141]),
          },
        ]);
        break;
      case 7:
        setTime([
          {
            time: '00:00',
            temp: Math.round(temperature[144]),
            cloud: Math.round(cloudcover[144]),
            relativehumidity: Math.round(relativehumidity_2m[144]),
          },
          {
            time: '04:00',
            temp: Math.round(temperature[148]),
            cloud: Math.round(cloudcover[148]),
            relativehumidity: Math.round(relativehumidity_2m[148]),
          },
          {
            time: '08:00',
            temp: Math.round(temperature[152]),
            cloud: Math.round(cloudcover[152]),
            relativehumidity: Math.round(relativehumidity_2m[152]),
          },
          {
            time: '12:00',
            temp: Math.round(temperature[156]),
            cloud: Math.round(cloudcover[156]),
            relativehumidity: Math.round(relativehumidity_2m[156]),
          },
          {
            time: '16:00',
            temp: Math.round(temperature[160]),
            cloud: Math.round(cloudcover[160]),
            relativehumidity: Math.round(relativehumidity_2m[160]),
          },
          {
            time: '20:00',
            temp: Math.round(temperature[164]),
            cloud: Math.round(cloudcover[164]),
            relativehumidity: Math.round(relativehumidity_2m[164]),
          },
        ]);
        break;
    }
  };
  // получить данные с АПИ при запуске
  useEffect(() => {
    if (!sendApi) {
      _getcloudcover(gXY[0]['Kyiv']['l'], gXY[0]['Kyiv']['d']);
      _getprecipitation(gXY[0]['Kyiv']['l'], gXY[0]['Kyiv']['d']);
      _getrelativehumidity_2m(gXY[0]['Kyiv']['l'], gXY[0]['Kyiv']['d']);
      _getwindspeed_10m(gXY[0]['Kyiv']['l'], gXY[0]['Kyiv']['d']);
      _getData(gXY[0]['Kyiv']['l'], gXY[0]['Kyiv']['d']);
    }
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          <SelectCountry
            gXY={gXY}
            sendApi={sendApi}
            setSendApi={setSendApi}
            _getcloudcover={_getcloudcover}
            _getData={_getData}
            _getprecipitation={_getprecipitation}
            _getrelativehumidity_2m={_getrelativehumidity_2m}
            _getwindspeed_10m={_getwindspeed_10m}
          />
          <Text
            style={{
              color: '#5A5C5E',
            }}>
            Click to select
          </Text>
          <Text
            style={{
              color: '#5A5C5E',
            }}>
            {getDate()}
          </Text>
          <Text
            style={{
              color: '#f3f3f3',
              fontSize: 54,
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            {/* температура в этот день */}
            {Math.round(temperature[selectedD * 23 - 1])}°C
          </Text>
        </View>
        {relativehumidity_2m > 50 ? (
          <Image
            source={require('./img/rain.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: 20,
            }}
          />
        ) : cloudcover[0] > 50 ? (
          <Image
            source={require('./img/cloud.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: 20,
            }}
          />
        ) : (
          <Image
            source={require('./img/weather.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: 20,
            }}
          />
        )}
      </View>

      {/* влажность в этот день */}
      <View
        style={{
          backgroundColor: '#202329',
          height: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderRadius: 10,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./img/relativehumidity.png')}
            style={{ height: 48, width: 48 }}
          />
          <Text
            style={{
              color: '#f3f3f3',
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            {relativehumidity_2m[selectedD * 23 - 1]}%
          </Text>
        </View>

        {/* осадки в этот день */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./img/zont.png')}
            style={{
              height: 48,
              width: 48,
            }}
          />
          <Text
            style={{
              color: '#f3f3f3',
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            {precipitation[selectedD * 23 - 1]}%
          </Text>
        </View>

        {/* скорость ветра в этот день */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./img/wind.png')}
            style={{
              height: 48,
              width: 48,
            }}
          />
          <Text
            style={{
              color: '#f3f3f3',
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            {windspeed_10m[selectedD * 24 - 1]}km/h
          </Text>
        </View>
      </View>

      <View>
        {/* Выбор даты для отображения погоды */}
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 30 }}
          data={sevendays()}
          renderItem={({ item }) => (
            //Сменить дату при нажатии на нн\ее
            <TouchableOpacity onPress={() => changeDateTemp(item.id)}>
              <Text
                // цвет текст в зависимости от того выбран ли элемент
                style={
                  item.id == selectedD
                    ? {
                        marginHorizontal: 10,
                        color: '#f3f3f3',
                      }
                    : {
                        marginHorizontal: 10,
                        color: '#5A5C5E',
                      }
                }>
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Подключение компонента с таблицей температуры на день */}
      <TemperatureTable time={time} />
    </View>
  );
}

// стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#1b1d1f',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
