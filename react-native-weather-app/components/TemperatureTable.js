import * as React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';

export default function TemperatureTable({ time }) {
  return (
    <View>
      {/* Вывод таблицы температур */}
      <FlatList
        // отключить полосы прокрутки
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={time}
        renderItem={({ item }) => (
          <View style={styles.weatherLine}>
            <View style={styles.weatherLine__time}>
              {/* вывод времени */}
              <Text style={styles.weatherLine__time_text}>{item.time}</Text>
            </View>
            <View style={styles.weatherLine__temp}>
              {/* если облачность больше 70% сменить иконку */}
              {item.cloud > 70 ? (
                <Image
                  source={require('../img/cloud.png')}
                  style={styles.weatherLine__temp_image}
                />
              ) : (
                <Image
                  source={require('../img/weather.png')}
                  style={styles.weatherLine__temp_image}
                />
              )}
              {/* вывод температуры в это время */}
              <Text style={styles.weatherLine__temp_text}>{item.temp}°C</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// стили
const styles = StyleSheet.create({
  weatherLine: {
    backgroundColor: '#202329',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  weatherLine__temp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherLine__time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherLine__time_text: {
    color: '#f3f3f3',
    fontWeight: 'bold',
  },
  weatherLine__temp_image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  weatherLine__temp_text: {
    color: '#f3f3f3',
    fontWeight: 'bold',
  },
});
