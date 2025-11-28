import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditPagamento'>;

const EditPagamentoScreen = ({ route, navigation }: Props) => {
  const { pagamento } = route.params;

  const [valor, setValor] = useState(pagamento.valor.toString());
  const [metodo_pagamento, setMetodoPagamento] = useState(pagamento.metodo_pagamento);
  const [aprovado, setAprovado] = useState(pagamento.aprovado);
  const [data_pagamento, setDataPagamento] = useState(pagamento.data_pagamento);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/pagamentos/${pagamento.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor,
        metodo_pagamento,
        aprovado,
        data_pagamento
      }),
    });

    setSaving(false);
    navigation.navigate('Pagamentos');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Valor</Text>
      <TextInput value={valor} onChangeText={setValor} style={styles.input} />

      <Text style={styles.label}>Método</Text>
      <TextInput value={metodo_pagamento} onChangeText={setMetodoPagamento} style={styles.input} />

      <Text style={styles.label}>Status</Text>
      <TextInput value={aprovado} onChangeText={setAprovado} style={styles.input} />

      <Text style={styles.label}>Data</Text>
      <TextInput value={data_pagamento} onChangeText={setDataPagamento} style={styles.input} />

      {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> :
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }

      <Button title="Voltar" onPress={() => navigation.navigate('Pagamentos')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }
});

export default EditPagamentoScreen;
