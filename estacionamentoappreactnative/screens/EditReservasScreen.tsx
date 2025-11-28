import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditReserva'>;

const EditReservaScreen = ({ route, navigation }: Props) => {
  const { reserva } = route.params;

  const [dataInicio, setDataInicio] = useState(reserva.data_inicio);
  const [dataFim, setDataFim] = useState(reserva.data_fim);
  const [valorTotal, setValorTotal] = useState(String(reserva.valor_total ?? '0'));
  const [aprovado, setAprovado] = useState(Boolean(reserva.aprovado));

  const [veiculoId, setVeiculoId] = useState(String(reserva.veiculo ?? ''));
  const [vagaId, setVagaId] = useState(String(reserva.vaga ?? ''));
  const [tarifaId, setTarifaId] = useState(String(reserva.tarifa ?? ''));
  const [pagamentosIds, setPagamentosIds] = useState((reserva.pagamentos || []).join(','));

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const body = {
      data_inicio: dataInicio,
      data_fim: dataFim,
      aprovado,
      valor_total: parseFloat(valorTotal || '0'),
      veiculo: Number(veiculoId),
      vaga: Number(vagaId),
      tarifa: Number(tarifaId),
      pagamentos: pagamentosIds ? pagamentosIds.split(',').map(s => Number(s.trim())) : []
    };

    try {
      await fetch(`http://localhost:8000/reservas/${reserva.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      navigation.navigate('Reservas');
    } catch (err) {
      console.error('edit reserva', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data Início</Text>
      <TextInput style={styles.input} value={dataInicio} onChangeText={setDataInicio} />
      <Text style={styles.label}>Data Fim</Text>
      <TextInput style={styles.input} value={dataFim} onChangeText={setDataFim} />
      <Text style={styles.label}>Valor Total</Text>
      <TextInput style={styles.input} value={valorTotal} onChangeText={setValorTotal} keyboardType="numeric" />
      <Text style={styles.label}>Veículo (ID)</Text>
      <TextInput style={styles.input} value={veiculoId} onChangeText={setVeiculoId} keyboardType="numeric" />
      <Text style={styles.label}>Vaga (ID)</Text>
      <TextInput style={styles.input} value={vagaId} onChangeText={setVagaId} keyboardType="numeric" />
      <Text style={styles.label}>Tarifa (ID)</Text>
      <TextInput style={styles.input} value={tarifaId} onChangeText={setTarifaId} keyboardType="numeric" />
      <Text style={styles.label}>Pagamentos (IDs separado por vírgula)</Text>
      <TextInput style={styles.input} value={pagamentosIds} onChangeText={setPagamentosIds} />

      {loading ? <ActivityIndicator size="large" color="#4B7BE5" /> :
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Reservas')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditReservaScreen;
