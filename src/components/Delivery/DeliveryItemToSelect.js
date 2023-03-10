/**
 * DeliveryItemToSelect.js (src/components/Delivery/DeliveryItemToSelect.js) 
 */

import { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { Produto } from "../../models";
import { CartContext } from "../../contexts/CartContext";

import NO_IMAGE from "../../../assets/sem-imagem.jpg";

export default function DeliveryItemToSelect({ item, close }) {
  const { AddToCart } = useContext(CartContext);

  const [produto, setProduto] = useState([]);
  const [qtd, setQtd] = useState(1);
  const [total, setTotal] = useState(item.vr_unitario);

  const id = item.id; console.log("Produto ID: ", id);

  useEffect(() => {
    if (id) {
      DataStore.query(Produto, id).then(setProduto);
      console.log('Produto: ', produto);
    }
  }, [id]);

  function add() {
    setQtd(qtd +1)
    setTotal((qtd +1) * produto.vr_unitario);
  }

  function remove() {
    if (qtd>1) {
      setQtd(qtd -1);
      setTotal((qtd -1) * produto.vr_unitario);
    }
  }

  async function AddItem() {
    await AddToCart(produto, qtd, total);
    close();
  }

  return (
    <View style={styles.shadow}>
      <View style={styles.modal}>

        <View style={styles.indicator} />
        <View style={styles.card}>
          <Image style={styles.image} source={!produto.url_imagem ? NO_IMAGE : { uri: produto.url_imagem }} />
          <Text style={styles.title}>{produto.nome}</Text>
          <Text style={styles.description}>{produto.descricao}</Text>
          <Text style={styles.summary}>{qtd} x R$ {parseFloat(produto.vr_unitario).toFixed(2)} = R$ {total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
        </View>

        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 150, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <TouchableOpacity onPress={remove}>
              <Ionicons name="md-remove-circle-outline" size={50} color="red"/>
            </TouchableOpacity>
            <Text style={styles.title}>{qtd}</Text>
            <TouchableOpacity onPress={add}>
              <Ionicons name="ios-add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnAdd} onPress={()=>AddItem()}>
            <Text style={{ color: '#FFF', fontSize: 18 }}>Adiciona Pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClose} onPress={close}>
            <Text style={{ color: '#FFF', fontSize: 18 }}>FECHAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '80%',
    backgroundColor: '#FFF',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  },
  card:{
    flexDirection: 'column', 
    justifyContent: 'center', alignItems: 'center', 
    padding: 10, marginBottom: 10, 
    borderBottomColor: 'lightgray', borderBottomWidth: 1 
  },
  title: {
    color: '#000', 
    fontSize: 28, 
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  image:{
    width: 200, 
    height: 200, 
    marginTop: 10
  },
  summary:{
    color: '#000', 
    fontSize: 21, 
    fontWeight: 'bold', 
    margin: 10
  },
  description:{
    color: 'grey', 
    fontSize: 18, 
    fontStyle: 'italic', 
    textAlign: 'center'
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnClose: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
})

