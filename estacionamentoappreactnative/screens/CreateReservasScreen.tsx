import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateReserva'>;

export type Pagamento = {
  id: number;
  valor: number;
  metodo_pagamento: string;
  aprovado: string;
  data_pagamento: string;
};

export type Veiculo = {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  cliente: number;
};

export type Vaga = {
  id: number;
  numero: number;
  tipo_vaga: string;
  localizacao: string;
  status: boolean;
};

export type Tarifa = {
  id: number;
  valor_hora: number;
  valor_diaria: number;
  valor_mensal: number;
  hora_entrada: string;
};


const CreateReservaScreen = ({ navigation }: Props) => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [aprovado, setAprovado] = useState(false);

  const [veiculoId, setVeiculoId] = useState('');
  const [vagaId, setVagaId] = useState('');
  const [tarifaId, setTarifaId] = useState('');
  const [pagamentosIds, setPagamentosIds] = useState(''); // "1,2"

  const [loading, setLoading] = useState(false);

  // opcional: você pode carregar listas pra mostrar ao usuário
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [vagas, setVagas] = useState<any[]>([]);
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [pagamentos, setPagamentos] = useState<any[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch('http://localhost:8000/veiculos/'),
          fetch('http://localhost:8000/vagas/'),
          fetch('http://localhost:8000/tarifas/'),
          fetch('http://localhost:8000/pagamentos/'),
        ]);
        setVeiculos(await r1.json());
        setVagas(await r2.json());
        setTarifas(await r3.json());
        setPagamentos(await r4.json());
      } catch (err) {
        console.error('fetchLists', err);
      }
    };
    fetchLists();
  }, []);

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
      await fetch('http://localhost:8000/reservas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      navigation.navigate('Reservas');
    } catch (err) {
      console.error('create reserva', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Reserva</Text>

      <Text style={styles.label}>Data Início (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={dataInicio} onChangeText={setDataInicio} />

      <Text style={styles.label}>Data Fim (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={dataFim} onChangeText={setDataFim} />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput style={styles.input} value={valorTotal} onChangeText={setValorTotal} keyboardType="numeric" />

      <Text style={styles.label}>Veículo (ID) — veja lista abaixo</Text>
      <TextInput style={styles.input} value={veiculoId} onChangeText={setVeiculoId} keyboardType="numeric" />
      <Text style={styles.small}>
        {veiculos.slice(0,5).map(v=>`${v.id}:${v.placa}`).join(' • ')}
      </Text>

      <Text style={styles.label}>Vaga (ID)</Text>
      <TextInput style={styles.input} value={vagaId} onChangeText={setVagaId} keyboardType="numeric" />
      <Text style={styles.small}>{vagas.slice(0,5).map(v=>`${v.id}:${v.numero}`).join(' • ')}</Text>

      <Text style={styles.label}>Tarifa (ID)</Text>
      <TextInput style={styles.input} value={tarifaId} onChangeText={setTarifaId} keyboardType="numeric" />
      <Text style={styles.small}>{tarifas.slice(0,5).map(t=>`${t.id}:R$${t.valor_hora}`).join(' • ')}</Text>

      <Text style={styles.label}>Pagamentos (IDs separados por vírgula)</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  small: { color: '#666', marginTop: 6 }
});

export default CreateReservaScreen;
