import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';


export default function WalletList({wallets}) {
  return(
    <FlatList 
        style={{
          width: '90%'
        }} 
        data={wallets} 
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
            // Render result item
            <TouchableOpacity  
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 15,
                borderBottomColor: '#EBEEF2',
                borderBottomWidth: 1
                // backgroundColor: '#f1f3f6'
                
              }}
              onPress={
                () => console.log({wallets})
              }
            >
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <View style={{
                  width: 56,
                  height: 56,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: '#f1f3f6',
                  marginRight: 10
                }}>
                  <Image
                      style={styles.cryptoLogo}
                      source={{
                        uri: item.thumb,
                      }}
                    /> 
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <Text>Wallet Name</Text>
                  <Text style={styles.cryptoName}>
                    {item.symbol} 
                  </Text>
                </View>
              </View>
              
              <View style={{
                
              }}>
                <Text>{item.value}</Text>
              </View>
            </TouchableOpacity>
          )} />
  )
}

const styles = StyleSheet.create({
  cryptoLogo: {
    width: 24,
    height: 24,
  },
  
  cryptoName: {
    display: 'flex',
    textAlign: 'center',
    fontSize: 11,
    color: '#858C94'
  },
});
