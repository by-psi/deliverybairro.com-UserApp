import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cartContext } from '../../context/Cart';

import logo_png from '../../../assets/logo.png';
import marca_png from '../../../assets/marca.png'
import cart_png from '../../../assets/cart.png';

export default function Header() {
  const navigation = useNavigation();
  const { cart } = cartContext();

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=> {
            alert("DeliveryBairro App v1.0 Build #21 "+'\n'+"(31) 98410-7540");
          }}
        >
          <Image source={logo_png} style={{ width: 85, height: 85 }} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={marca_png} style={{ width: 195, height: 85 }} resizeMode="contain" />
        </View>

        <TouchableOpacity onPress={()=>GoToLink("CartInfo")}>
          <Image source={cart_png} style={{ width: 85, height: 85 }} resizeMode="contain" />
          { cart.length >= 1 &&
            <View style={styles.dot}>
              <Text style={styles.dotText}>{ cart?.length }</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 100,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  dot:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 30,
    height: 30, 
    borderRadius: 15,
    position: 'absolute',
    zIndex: 99,
    bottom: -4,
    left: -6
  },
  dotText:{
    fontSize: 14,
    color: '#FFF'
  }
})

/**
 tabela de cores: #FFB901 #55A9D6 #7F7B7B #5D5D5D #FF0000 #0033CC #FFF000 #131313 #4DCE4D
*/
