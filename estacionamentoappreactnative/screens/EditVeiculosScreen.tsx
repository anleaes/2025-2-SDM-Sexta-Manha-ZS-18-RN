import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditVeiculo'>;

const EditVeiculoScreen = ({ route, navigation }: Props) => {
  const { veiculo } = route.params;

  const [marca, setMarca] = useState(veiculo.marca);
  const [modelo, setModelo] = useState(veiculo.modelo);
  const [placa, setPlaca] = useState(veiculo.placa);
  const [cliente, setCliente] = useState(String(veiculo.cliente));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/veiculos/${veiculo.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marca, modelo, placa, cliente }),
    });
    setSaving(false);
    navigation.navigate('Veiculos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Marca</Text>
      <TextInput value={marca} onChangeText={setMarca} style={styles.input} />

      <Text style={styles.label}>Modelo</Text>
      <TextInput value={modelo} onChangeText={setModelo} style={styles.input} />

      <Text style={styles.label}>Placa</Text>
      <TextInput value={placa} onChangeText={setPlaca} style={styles.input} />

      <Text style={styles.label}>Cliente</Text>
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
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditVeiculoScreen;
