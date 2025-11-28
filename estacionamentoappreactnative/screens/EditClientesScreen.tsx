import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCliente'>;

const EditClienteScreen = ({ route, navigation }: Props) => {
  const { cliente } = route.params;

  const [nome, setNome] = useState(cliente.nome);
  const [email, setEmail] = useState(cliente.email);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [cpf, setCpf] = useState(cliente.cpf);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setCpf(cliente.cpf);
  }, [cliente]);

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/clientes/${cliente.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone, cpf }),
    });

    setSaving(false);
    navigation.navigate('Clientes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} />

      <Text style={styles.label}>CPF</Text>
      <TextInput value={cpf} onChangeText={setCpf} style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Clientes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditClienteScreen;