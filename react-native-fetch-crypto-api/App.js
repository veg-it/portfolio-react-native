import { useState } from 'react';
import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Constants from 'expo-constants';

import BottomSearch from './components/BottomSearch';
import WalletList from './components/WalletList';
import AddWalletModal from './components/AddWalletModal';

export default function App() {

  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const bottomSheetRef = useRef();
  
  const [sCrypto, setSCrypto] = useState('');
  const [infoText, setinfoText] = useState ([]);
  const [wallets, setWallets] = useState([{thumb:"https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",symbol:"BTC",value:"0.00001"},{thumb:"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png",symbol:"USDT",value:"10"},{thumb:"https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",symbol:"ETH",value:"5"},{thumb:"https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",symbol:"DOGE",value:"677"},{thumb:"https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",symbol:"LTC",value:"56"}]);

  

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
        alignItems: 'flex-end',
        width: '90%'
      }}>
        <Text style={{
          fontWeight: '600',
          fontSize: 16
        }}>Your crypto wallets: </Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddmodalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <WalletList 
        wallets={wallets}
      />
      
      <AddWalletModal
        bottomSheetRef = {bottomSheetRef}
        sCrypto = {sCrypto}
        setAddmodalVisible = {setAddmodalVisible} 
        addmodalVisible = {addmodalVisible}
        wallets = {wallets}
        setWallets = {setWallets}
        setinfoText = {setinfoText}
        infoText = {infoText}
      />
      {/* Bottom sheet */}
      <BottomSearch 
        bottomSheetRef={bottomSheetRef} 
        infoText={infoText} 
        sCrypto={sCrypto} 
        setSCrypto={setSCrypto}
      />
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
    paddingTop: Platform.OS === "ios" ? 40 : Constants.statusBarHeight + 10
  },
  addButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',

  },
  
  addButtonText:{
    color: '#fff'
  },
  
  
});
