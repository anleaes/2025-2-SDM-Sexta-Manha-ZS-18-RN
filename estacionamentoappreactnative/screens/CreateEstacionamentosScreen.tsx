import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { useFocusEffect } from 'expo-router';

type Props = DrawerScreenProps<DrawerParamList, 'CreateEstacionamento'>;

const CreateEstacionamentoScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [capacidade_total, setCapacidadeTotal] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setEndereco('');
      setCapacidadeTotal('');
      setFuncionario('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/estacionamentos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        endereco,
        capacidade_total: Number(capacidade_total),
        funcionario: Number(funcionario)
      }),
    });
    setSaving(false);
    navigation.navigate('Estacionamentos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Estacionamento</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Capacidade Total</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={capacidade_total} onChangeText={setCapacidadeTotal} />

      <Text style={styles.label}>ID do Funcionário</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={funcionario} onChangeText={setFuncionario} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" color="#4B7BE5" onPress={handleSave} />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Estacionamentos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20, alignSelf: 'center' },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
});

export default CreateEstacionamentoScreen;
