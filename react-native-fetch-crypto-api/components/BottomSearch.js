import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

import BottomSheet from 'react-native-raw-bottom-sheet';

export default function BottomSearch({bottomSheetRef, infoText, sCrypto, setSCrypto}) {
  return (
    <View>
        <BottomSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          height={300}
          openDuration={250}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f1f3f6',
              // alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 20
            }}
          > 
            <Text style={{ 
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              paddingBottom: 10
            }}>
              Select crypto:
            </Text>
            <FlatList style={styles.header} data={infoText} renderItem={({item}) => (
            // Render result item
            <TouchableOpacity style={styles.rezString} onPress={() => {
              console.log('touch');
              setSCrypto(item);
              console.log(sCrypto);
              bottomSheetRef.current.close();
            }

            }>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center'
              }}>
              <Image
                  style={styles.cryptoLogo}
                  source={{
                    uri: item.thumb,
                  }}
                /> 
                <Text style={styles.cryptoName}>
                
                {item.symbol} 
              </Text>
              </View>
              
              <TouchableOpacity style={styles.btnAdd}>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )} />
          </View>
        </BottomSheet>
      </View>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#333333',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  rezString: {
    paddingHorizontal: 20,
    height: 40,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cryptoLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  
  cryptoName: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 16,
  },
});
