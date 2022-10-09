import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  
} from 'react-native';

//npm i react-native-modal
import RNModal from 'react-native-modal';

import { Icon } from 'react-native-elements';

export default function App() {

  const [addmodalVisible, setAddmodalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Add your first crypto to the wallet</Text>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setAddmodalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

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
              
              placeholder={'Search'}
            />
              <TouchableOpacity
                style={{ padding: 4}}
              >
                <Icon name='search' type='font-awesome-5' size={20} />
              </TouchableOpacity>
          </View>
          
          <Text style={{ marginVertical: 10 }}>
            Selected crypto: 
          </Text>

          <View style={styles.selectedCrypto}>
            <View style={styles.iconHolder}>

            </View>
            <Text style={styles.selectedCryptoText}>
              None
            </Text>
          </View>

          <Text style={{ marginVertical: 10 }}>
            Add wallet balance: 
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12}}
              
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
              onPress={() => setAddmodalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 50
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
  }
});
