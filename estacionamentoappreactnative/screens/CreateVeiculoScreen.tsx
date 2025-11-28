import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateVeiculo'>;

const CreateVeiculoScreen = ({ navigation }: Props) => {

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cliente, setCliente] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setMarca('');
      setModelo('');
      setPlaca('');
      setCliente('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/veiculos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marca, modelo, placa, cliente }),
    });
    setSaving(false);
    navigation.navigate('Veiculos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Veículo</Text>

      <Text style={styles.label}>Marca</Text>
      <TextInput value={marca} onChangeText={setMarca} style={styles.input} />

      <Text style={styles.label}>Modelo</Text>
      <TextInput value={modelo} onChangeText={setModelo} style={styles.input} />

      <Text style={styles.label}>Placa</Text>
      <TextInput value={placa} onChangeText={setPlaca} style={styles.input} />

      <Text style={styles.label}>ID do Cliente</Text>
      <TextInput value={cliente} onChangeText={setCliente} style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Veiculos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default CreateVeiculoScreen;
