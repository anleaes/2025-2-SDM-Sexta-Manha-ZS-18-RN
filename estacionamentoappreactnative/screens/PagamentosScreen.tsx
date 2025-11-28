import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Pagamentos'>;

export type Pagamento = {
  id: number;
  valor: number;
  metodo_pagamento: string;
  aprovado: string;
  data_pagamento: string;
};

const PagamentosScreen = ({ navigation }: Props) => {

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPagamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/pagamentos/');
    const data = await response.json();
    setPagamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPagamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/pagamentos/${id}/`, {
      method: 'DELETE',
    });
    setPagamentos(prev => prev.filter(p => p.id !== id));
  };

  const renderItem = ({ item }: { item: Pagamento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Método: {item.metodo_pagamento}</Text>
      <Text style={styles.description}>Valor: R$ {item.valor}</Text>
      <Text style={styles.description}>Status: {item.aprovado}</Text>
      <Text style={styles.description}>Data: {item.data_pagamento}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPagamento', { pagamento: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamentos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={pagamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePagamento')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  card: { backgroundColor: '#eef2ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600' },
  description: { fontSize: 14, color: '#555', marginTop: 4 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', padding: 14, borderRadius: 28 },
  row: { flexDirection: 'row', marginTop: 10, alignSelf: 'flex-end' }
});

export default PagamentosScreen;
