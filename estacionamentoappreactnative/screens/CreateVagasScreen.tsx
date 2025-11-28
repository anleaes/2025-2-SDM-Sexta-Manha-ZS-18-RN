import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateVaga'>;

const CreateVagaScreen = ({ navigation }: Props) => {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNumero('');
      setTipo('');
      setLocalizacao('');
      setStatus('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);

    await fetch('http://localhost:8000/vagas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero,
        tipo_vaga: tipo,
        localizacao,
        status: status === '1',
      }),
    });

    setSaving(false);
    navigation.navigate('Vagas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Vaga</Text>

      <Text style={styles.label}>Número</Text>
      <TextInput style={styles.input} value={numero} onChangeText={setNumero} />

      <Text style={styles.label}>Tipo da vaga</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} />

      <Text style={styles.label}>Localização</Text>
      <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} />

      <Text style={styles.label}>Status (0 = livre / 1 = ocupada)</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" color="#4B7BE5" onPress={handleSave} />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Vagas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateVagaScreen;
