import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');

  const handleCepChange = (text) => {
    const formattedCep = text
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})?/, '$1-$2');
    setCep(formattedCep);
  };

  const getAddress = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        throw new Error("Endereço não encontrado")
      } else {
        if (data.logradouro, data.bairro, data.localidade, data.uf) {
          setAddress(data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ' - ' + data.uf);
        } else {
          throw new Error("Erro em buscar o endereço!")
        }
      }
    } catch (error) {
      setAddress('')
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.formTitle}>Pesquisar Cep</Text>
        <TextInput style={styles.formInput}
          placeholder="Digite o CEP"
          keyboardType="numeric"
          maxLength={9}
          onChangeText={handleCepChange}
          value={cep}
        />
        <Pressable style={styles.formButton} onPress={getAddress}>
            <Text style={styles.textButton}>Buscar endereço</Text>
        </Pressable>
        <Text>{address}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  formTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'blue',
    margin: 10,
  },

  formInput: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    width: '80%',
    padding: 5,
    margin: 10,
  },

  formButton: {
    backgroundColor: 'blue',
    width:'80%',
    margin: 10,
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
  },

  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },


}); 




export default App;
// style={styles.formButton} 