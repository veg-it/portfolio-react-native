import { useState, useRef } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
 } from 'react-native';

import RNModal from 'react-native-modal';
import { Icon } from 'react-native-elements';

export default function AddWalletModal({
  bottomSheetRef, 
  sCrypto, 
  setAddmodalVisible, 
  addmodalVisible,
  setWallets,
  setinfoText,
  wallets,
  infoText
}){

  const [value,setValue] = useState('');
  const [crypto, setCrypto] = useState('');

  const toastRef = useRef();

  const _getData = async () => {
    fetch('https://api.coingecko.com/api/v3/search?query='+crypto)
    .then((response) => response.json())
    .then((responseJson) => {
      setinfoText((list) => {
        return [
          ...responseJson['coins']
        ];
      });
    })
    .catch((error) => {
      setModalVisible(true);
      console.error(error)
    });
  }

  const addValue = (value) => {
    setValue(value);
  }
  const addSearchedText = (crypto) => {
    setCrypto(crypto);
  }
  const addNewWallet = (thumb, symbol, value) => {
    setWallets(oldArray => [...oldArray, {thumb: thumb, symbol: symbol, value: value}]);
  };

  return(
    <RNModal
        isVisible={addmodalVisible}
        animationIn='zoomIn'
        animationOut='zoomOut'
      >
        <View style={styles.addmodalView}>

          <Text style={{ 
              fontSize: 18, 
              fontWeight: '700'
          }}>
            Add to wallet
          </Text>

          <Text style={{
              marginVertical: 10 
          }}>
            Search crypto: 
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={{ 
                flex: 1, 
                paddingHorizontal: 12
              }}
              onChangeText={addSearchedText}
              placeholder={'Search'}
              autoFocus={true}
            />
              <TouchableOpacity
                style={{ padding: 4}}
                onPress={() => {
                  _getData();
                  console.log({infoText})
                  bottomSheetRef.current.open();
                }}
              >
                <Icon 
                  name='search' 
                  type='font-awesome-5' 
                  size={20} 
                />
              </TouchableOpacity>
          </View>
          
          <Text style={{ marginVertical: 10 }}>
            Selected crypto: 
          </Text>

          <View style={styles.selectedCrypto}>
            <View style={styles.iconHolder}>
                <Image
                  style={{
                    width: 30,
                    height: 30
                  }}
                  source={{
                    uri: sCrypto.thumb
                  }} />
            </View>
            <Text style={styles.selectedCryptoText}>
              {sCrypto.symbol}
            </Text>
          </View>

          <Text style={{ marginVertical: 10 }}>
            Add wallet balance: 
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12}}
              onChangeText={addValue}
              placeholder={'Value'}
            />
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAddmodalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                console.log(typeof value);
                
                if (sCrypto.thumb && sCrypto.symbol && value) {
                  
                  addNewWallet(sCrypto.thumb, sCrypto.symbol, value);
                  console.log(wallets);
                  setAddmodalVisible(false)
                } else {
                  console.log('empty');
                }
                
              }}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
      
      
  )
}

const styles = StyleSheet.create({
  selectedCrypto:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedCryptoText: {
    marginHorizontal: 10
  },
  iconHolder: {
    width: 50,
    height: 50,
    backgroundColor: '#f1f3f6',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputView: {
    // width: '100%',
    height: 44,
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  addmodalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#222f3e',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16
  },
})