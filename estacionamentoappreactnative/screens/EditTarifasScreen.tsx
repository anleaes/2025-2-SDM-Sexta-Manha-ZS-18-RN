import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditTarifa'>;

const EditTarifaScreen = ({ route, navigation }: Props) => {

  const { tarifa } = route.params;

  const [valorHora, setValorHora] = useState(tarifa.valor_hora.toString());
  const [valorDiaria, setValorDiaria] = useState(tarifa.valor_diaria.toString());
  const [valorMensal, setValorMensal] = useState(tarifa.valor_mensal.toString());
  const [horaEntrada, setHoraEntrada] = useState(tarifa.hora_entrada);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/tarifas/${tarifa.id}/`, {
      method: 'PUT',
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '600', marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 10, marginTop: 4,
  }
});

export default EditTarifaScreen;
