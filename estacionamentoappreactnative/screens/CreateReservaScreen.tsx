import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Picker, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateReserva'>;

const CreateReservaScreen = ({ navigation }: Props) => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [vagas, setVagas] = useState<any[]>([]);
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [selectedVeiculo, setSelectedVeiculo] = useState<number | null>(null);
  const [selectedVaga, setSelectedVaga] = useState<number | null>(null);
  const [selectedTarifa, setSelectedTarifa] = useState<number | null>(null);
  const [selectedPagamentos, setSelectedPagamentos] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch('http://localhost:8000/veiculos/'),
          fetch('http://localhost:8000/vagas/'),
          fetch('http://localhost:8000/tarifas/'),
          fetch('http://localhost:8000/pagamentos/'),
        ]);
        const [d1, d2, d3, d4] = await Promise.all([r1.json(), r2.json(), r3.json(), r4.json()]);
        setVeiculos(d1);
        setVagas(d2);
        setTarifas(d3);
        setPagamentos(d4);
      } catch (err) {
        console.error('fetchLists', err);
      } finally {
        setLoadingLists(false);
      }
    };
    fetchLists();
  }, []);

  const handleTogglePagamento = (id: number) => {
    setSelectedPagamentos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:8000/reservas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data_inicio: dataInicio,
          data_fim: dataFim,
          valor_total: parseFloat(valorTotal || '0'),
          veiculo: selectedVeiculo,
          vaga: selectedVaga,
          tarifa: selectedTarifa,
          pagamentos: selectedPagamentos, // dependendo do backend, talvez precise enviar por relacionamentos separados
        }),
      });
      navigation.navigate('Reservas');
    } catch (err) {
      console.error('save reserva', err);
    } finally {
      setSaving(false);
    }
  };

  if (loadingLists) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4B7BE5" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Reserva</Text>

      <Text style={styles.label}>Data Início (YYYY-MM-DD)</Text>
      <TextInput value={dataInicio} onChangeText={setDataInicio} style={styles.input} />

      <Text style={styles.label}>Data Fim (YYYY-MM-DD)</Text>
      <TextInput value={dataFim} onChangeText={setDataFim} style={styles.input} />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput value={valorTotal} onChangeText={setValorTotal} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Veículo</Text>
      <Picker selectedValue={selectedVeiculo} onValueChange={(v) => setSelectedVeiculo(Number(v))}>
        <Picker.Item label="Selecione" value={null} />
        {veiculos.map(v => <Picker.Item key={v.id} label={`${v.modelo} - ${v.placa}`} value={v.id} />)}
      </Picker>

      <Text style={styles.label}>Vaga</Text>
      <Picker selectedValue={selectedVaga} onValueChange={(v) => setSelectedVaga(Number(v))}>
        <Picker.Item label="Selecione" value={null} />
        {vagas.map(v => <Picker.Item key={v.id} label={`Vaga ${v.numero} (${v.tipo_vaga})`} value={v.id} />)}
      </Picker>

      <Text style={styles.label}>Tarifa</Text>
      <Picker selectedValue={selectedTarifa} onValueChange={(v) => setSelectedTarifa(Number(v))}>
        <Picker.Item label="Selecione" value={null} />
        {tarifas.map(t => <Picker.Item key={t.id} label={`R$ ${t.valor_hora}/h`} value={t.id} />)}
      </Picker>

      <Text style={styles.label}>Pagamentos (marque os aplicáveis)</Text>
      {pagamentos.map(p => (
        <TouchableOpacity key={p.id} style={{ marginVertical: 6 }} onPress={() => handleTogglePagamento(p.id)}>
          <Text style={{ color: selectedPagamentos.includes(p.id) ? '#4B7BE5' : '#333' }}>
            {selectedPagamentos.includes(p.id) ? '✓ ' : '○ '} {p.metodo_pagamento} - R$ {p.valor}
          </Text>
        </TouchableOpacity>
      ))}

      {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />}
      <Button title="Voltar" onPress={() => navigation.navigate('Reservas')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateReservaScreen;
