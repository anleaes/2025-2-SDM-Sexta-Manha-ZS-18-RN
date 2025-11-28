import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditEstacionamento'>;

const EditEstacionamentoScreen = ({ route, navigation }: Props) => {
  const { estacionamento } = route.params;

  const [nome, setNome] = useState(estacionamento.nome);
  const [endereco, setEndereco] = useState(estacionamento.endereco);
  const [capacidade_total, setCapacidadeTotal] = useState(String(estacionamento.capacidade_total));
  const [funcionario, setFuncionario] = useState(String(estacionamento.funcionario));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/estacionamentos/${estacionamento.id}/`, {
      method: 'PUT',
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
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Endereço</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

      <Text style={styles.label}>Capacidade Total</Text>
      <TextInput value={capacidade_total} onChangeText={setCapacidadeTotal} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>ID Funcionário</Text>
      <TextInput value={funcionario} onChangeText={setFuncionario} keyboardType="numeric" style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Estacionamentos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
});

export default EditEstacionamentoScreen;
