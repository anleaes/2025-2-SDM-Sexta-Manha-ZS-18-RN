import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Reserva } from './ReservasScreen';

type Props = DrawerScreenProps<DrawerParamList, 'EditReserva'>;

export type Pagamento = {
  id: number;
  valor: number;
  metodo_pagamento: string;
  aprovado: boolean;
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

const EditReservaScreen = ({ route, navigation }: Props) => {
  const { reserva } = route.params as { reserva: Reserva };

  const [dataInicio, setDataInicio] = useState(reserva.data_inicio);
  const [dataFim, setDataFim] = useState(reserva.data_fim);
  const [aprovado, setAprovado] = useState(reserva.aprovado);
  const [valorTotal, setValorTotal] = useState(String(reserva.valor_total));

  const [veiculo, setVeiculo] = useState<number | null>(reserva.veiculo);
  const [vaga, setVaga] = useState<number | null>(reserva.vaga);
  const [tarifa, setTarifa] = useState<number | null>(reserva.tarifa);

  const [pagamentosSelecionados, setPagamentosSelecionados] = useState<number[]>(
    reserva.pagamentos || []
  );

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const [pagRes, veiRes, vagRes, tarRes] = await Promise.all([
      fetch('http://localhost:8000/pagamentos/'),
      fetch('http://localhost:8000/veiculos/'),
      fetch('http://localhost:8000/vagas/'),
      fetch('http://localhost:8000/tarifas/'),
    ]);

    setPagamentos(await pagRes.json());
    setVeiculos(await veiRes.json());
    setVagas(await vagRes.json());
    setTarifas(await tarRes.json());

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePagamento = (id: number) => {
    setPagamentosSelecionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/reservas/${reserva.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data_inicio: dataInicio,
        data_fim: dataFim,
        aprovado,
        valor_total: Number(valorTotal),
        veiculo,
        vaga,
        tarifa,
        pagamentos: pagamentosSelecionados, // <-- CORRETO
      }),
    });

    setSaving(false);
    navigation.navigate('Reservas');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data de Início (AAAA-MM-DD HH:MM)</Text>
      <TextInput value={dataInicio} onChangeText={setDataInicio} style={styles.input} />

      <Text style={styles.label}>Data de Fim (AAAA-MM-DD HH:MM)</Text>
      <TextInput value={dataFim} onChangeText={setDataFim} style={styles.input} />

      <Text style={styles.label}>Aprovado (true/false)</Text>
      <TextInput
        value={String(aprovado)}
        onChangeText={v => setAprovado(v === 'true')}
        style={styles.input}
      />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput
        value={valorTotal}
        onChangeText={setValorTotal}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Veículo</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={veiculo} onValueChange={itemValue => setVeiculo(itemValue)}>
          {veiculos.map(v => (
            <Picker.Item
              key={v.id}
              label={`${v.marca} ${v.modelo} - ${v.placa}`}
              value={v.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Vaga</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={vaga} onValueChange={itemValue => setVaga(itemValue)}>
          {vagas.map(v => (
            <Picker.Item
              key={v.id}
              label={`Vaga ${v.numero} - ${v.tipo_vaga}`}
              value={v.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tarifa</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={tarifa} onValueChange={itemValue => setTarifa(itemValue)}>
          {tarifas.map(t => (
            <Picker.Item key={t.id} label={`R$ ${t.valor_hora}/hora`} value={t.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Pagamentos</Text>
      {pagamentos.map(p => {
        const selected = pagamentosSelecionados.includes(p.id);
        return (
          <TouchableOpacity
            key={p.id}
            style={[styles.checkbox, selected && styles.checkboxSelected]}
            onPress={() => togglePagamento(p.id)}
          >
            <Text style={styles.checkboxText}>
              {p.metodo_pagamento} - R$ {p.valor}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={{ height: 30 }} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Reservas')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 32,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  checkboxSelected: {
    backgroundColor: '#4B7BE5',
    borderColor: '#4B7BE5',
  },
  checkboxText: {
    color: '#000',
  },
});

export default EditReservaScreen;
