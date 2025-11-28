import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateTarifa'>;

const CreateTarifaScreen = ({ navigation }: Props) => {

  const [valorHora, setValorHora] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [valorMensal, setValorMensal] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await fetch('http://localhost:8000/tarifas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor_hora: valorHora,
        valor_diaria: valorDiaria,
        valor_mensal: valorMensal,
        hora_entrada: horaEntrada,
      }),
    });

    setSaving(false);
    navigation.navigate('Tarifas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarifa</Text>

      <Text style={styles.label}>Valor Hora</Text>
      <TextInput value={valorHora} onChangeText={setValorHora} style={styles.input} />

      <Text style={styles.label}>Valor Diária</Text>
      <TextInput value={valorDiaria} onChangeText={setValorDiaria} style={styles.input} />

      <Text style={styles.label}>Valor Mensal</Text>
      <TextInput value={valorMensal} onChangeText={setValorMensal} style={styles.input} />

      <Text style={styles.label}>Hora Entrada</Text>
      <TextInput value={horaEntrada} onChangeText={setHoraEntrada} style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Tarifas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 },
  label: { fontWeight: '600', marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginTop: 4,
  }
});

export default CreateTarifaScreen;
