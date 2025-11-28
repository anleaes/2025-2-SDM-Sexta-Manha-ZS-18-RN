import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Reserva } from './ReservasScreen';

type Props = DrawerScreenProps<DrawerParamList, 'EditReserva'>;

// Tipos ajustados para o diagrama de estacionamento
type Pagamento = {
  id: number;
  valor: number;
  metodo_pagamento: string;
  status: string;  // Ajustado para "status" (do diagrama)
  data_pagamento: string;
};

type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;  // Adicionado do diagrama
};

type Veiculo = {  // Nova entidade do diagrama
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  cliente: number;  // ID do cliente associado
};

type Vaga = {  // Substitui "Hospedagem"
  id: number;
  numero: number;
  tipo_vaga: string;
  localizacao: string;
  status: boolean;  // true = ocupada, false = livre
  estacionamento: number;  // ID do estacionamento
};

type Tarifa = {  // Nova entidade do diagrama
  id: number;
  valor_hora: number;
  valor_diaria: number;
  valor_mensal: number;
  hora_entrada: string;  // Time
};

type ModoPagamento = {  // Assumido como entidade simples (pode ser enum)
  id: number;
  nome: string;  // Ex.: "Cartão", "PIX"
};

const EditReservaScreen = ({ route, navigation }: Props) => {
  const { reserva } = route.params as { reserva: Reserva };

  // Campos ajustados para Reserva no diagrama
  const [dataInicio, setDataInicio] = useState(reserva.data_inicio);  // Substitui data_checkin
  const [dataFim, setDataFim] = useState(reserva.data_fim);  // Substitui data_checkout
  const [aprovado, setAprovado] = useState(reserva.aprovado);  // Novo campo (String, ex.: "Sim" ou "Não")
  const [valorTotal, setValorTotal] = useState(String(reserva.valor_total));

  const [cliente, setCliente] = useState<number | null>(reserva.cliente);
  const [veiculo, setVeiculo] = useState<number | null>(reserva.veiculo);  // Novo: ID do veículo
  const [vaga, setVaga] = useState<number | null>(reserva.vaga);  // Substitui hospedagem
  const [tarifa, setTarifa] = useState<number | null>(reserva.tarifa);  // Novo: ID da tarifa
  const [modoPagamento, setModoPagamento] = useState<number | null>(reserva.modopagamentos);  // Novo: ID do modo de pagamento
  const [pagamentosSelecionados, setPagamentosSelecionados] = useState<number[]>(
    reserva.pagamento || []  // Mantém para PagamentoReserva
  );

  // Estados para listas (ajustados)
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);  // Novo
  const [vagas, setVagas] = useState<Vaga[]>([]);  // Substitui hospedagens
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);  // Novo
  const [modosPagamento, setPagamento] = useState<Pagamento[]>([]);  // Novo

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [pagRes, cliRes, veiRes, vagRes, tarRes, modRes] = await Promise.all([
      fetch('http://localhost:8000/pagamentos/'),
      fetch('http://localhost:8000/clientes/'),
      fetch('http://localhost:8000/veiculos/'),  // Novo fetch
      fetch('http://localhost:8000/vagas/'),  // Substitui hospedagens
      fetch('http://localhost:8000/tarifas/'),  // Novo fetch
      fetch('http://localhost:8000/pagamentos/'),  // Novo fetch (assumido)
    ]);

    const pagamentosData = await pagRes.json();
    const clientesData = await cliRes.json();
    const veiculosData = await veiRes.json();
    const vagasData = await vagRes.json();
    const tarifasData = await tarRes.json();
    const modosPagamentoData = await modRes.json();

    setPagamentos(pagamentosData);
    setClientes(clientesData);
    setVeiculos(veiculosData);
    setVagas(vagasData);
    setTarifas(tarifasData);
    setModosPagamento(modosPagamentoData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Ajusta estados iniciais com base na reserva
    setDataInicio(reserva.data_inicio);
    setDataFim(reserva.data_fim);
    setAprovado(reserva.aprovado);
    setValorTotal(String(reserva.valor_total));
    setCliente(reserva.cliente);
    setVeiculo(reserva.veiculo);
    setVaga(reserva.vaga);
    setTarifa(reserva.tarifa);
    setPagamentosSelecionados(reserva.pagamento || []);
  }, [reserva]);

  const togglePagamento = (id: number) => {
    setPagamentosSelecionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:8000/reservas/${reserva.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data_inicio: dataInicio,
        data_fim: dataFim,
        aprovado,
        valor_total: Number(valorTotal),
        cliente,
        veiculo,
        vaga,
        tarifa,
        modopagamento: modoPagamento,
        pagamento: pagamentosSelecionados,  // Para PagamentoReserva
      }),
    });
    navigation.navigate('Reservas');
    setSaving(false);
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
      <TextInput
        value={dataInicio}
        onChangeText={setDataInicio}
        style={styles.input}
      />

      <Text style={styles.label}>Data de Fim (AAAA-MM-DD HH:MM)</Text>
      <TextInput
        value={dataFim}
        onChangeText={setDataFim}
        style={styles.input}
      />

      <Text style={styles.label}>Aprovado</Text>
      <TextInput
        value={aprovado}
        onChangeText={setAprovado}
        style={styles.input}
      />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput
        value={valorTotal}
        onChangeText={setValorTotal}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cliente</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={cliente}
          onValueChange={itemValue => setCliente(itemValue)}
        >
          {clientes.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={c.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Veículo</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={veiculo}
          onValueChange={itemValue => setVeiculo(itemValue)}
        >
          {veiculos.map(v => (
            <Picker.Item key={v.id} label={`${v.marca} ${v.modelo} - ${v.placa}`} value={v.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Vaga</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={vaga}
          onValueChange={itemValue => setVaga(itemValue)}
        >
          {vagas.map(v => (
            <Picker.Item key={v.id} label={`Vaga ${v.numero} - ${v.tipo_vaga}`} value={v.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tarifa</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tarifa}
          onValueChange={itemValue => setTarifa(itemValue)}
        >
          {tarifas.map(t => (
            <Picker.Item key={t.id} label={`R$ ${t.valor_hora}/hora`} value={t.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Modo de Pagamento</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={modoPagamento}
          onValueChange={itemValue => setModoPagamento(itemValue)}
        >
          {modosPagamento.map(m => (
            <Picker.Item key={m.id} label={m.nome} value={m.id} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
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
    overflow: 'hidden',
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
