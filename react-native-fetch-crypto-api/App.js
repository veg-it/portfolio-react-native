import { useState } from 'react';
import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Image,
  Platform,
  
} from 'react-native';

import RNModal from 'react-native-modal';

import { Icon } from 'react-native-elements';

import BottomSheet from 'react-native-raw-bottom-sheet';

import Constants from 'expo-constants';

export default function App() {

  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const bottomSheetRef = useRef();
  const [crypto, setCrypto] = useState('');

  const [sCrypto, setSCrypto] = useState('');

  const [infoText, setinfoText] = useState ([]);

  const addSearchedText = (crypto) => {
    setCrypto(crypto);
  }

  const [wallets,setWallets] = useState([]);
  const [value,setValue] = useState('');
  const addValue = (value) => {
    setValue(value);
  }

  const addNewWallet = (thumb, symbol, value) => {
    setWallets(oldArray => [...oldArray, {thumb: thumb, symbol: symbol, value: value}]);
  };

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

  return (
    <View style={styles.container}>

      <View style={{
        backgroundColor: '#f1f3f6',
        width: '90%',
        height: '30%',
        marginBottom: 20,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
      }}>
        <Text style={{
          fontSize: 30,
          color: '#333'
        }}>
          0$
        </Text>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
      }}>
        <Text>Your crypto wallets: </Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddmodalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      

      <FlatList 
        style={{
          width: '90%'
        }} 
        data={wallets} 
        renderItem={({item}) => (
            // Render result item
            <TouchableOpacity  
              style={{
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                borderRadius: 8,
                marginVertical: 10,
                backgroundColor: '#f1f3f6'
                
              }}
            >
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
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
              
              <View style={{
                
              }}>
                <Text>{item.value}</Text>
              </View>
            </TouchableOpacity>
          )} />

      <RNModal
        isVisible={addmodalVisible}
        animationIn='zoomIn'
        animationOut='zoomOut'
      >
        <View style={styles.addmodalView}>
          <Text style={{ fontSize: 18, fontWeight: '700'}}>
            Add to wallet
          </Text>

          <Text style={{ marginVertical: 10 }}>
            Search crypto: 
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12}}
              onChangeText={addSearchedText}
              placeholder={'Search'}
            />
              <TouchableOpacity
                style={{ padding: 4}}
                onPress={() => {
                  _getData();
                  bottomSheetRef.current.open();
                }}
              >
                <Icon name='search' type='font-awesome-5' size={20} />
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
                addNewWallet(sCrypto.thumb, sCrypto.symbol, value);
                console.log(wallets);
                setAddmodalVisible(false)
              }}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>

      {/* Bottom sheet */}
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight + 10
  },
  addButton: {
    backgroundColor: '#333',
    padding: 10,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10
  },
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
  addButtonText:{
    color: '#fff'
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

  cryptoLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 10
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
  cryptoName: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 16,
    
  },
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
});
