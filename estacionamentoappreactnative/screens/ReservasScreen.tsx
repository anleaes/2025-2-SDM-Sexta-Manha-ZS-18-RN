import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Reservas'>;

export type Reserva = {
  id: number;
  data_inicio: string;
  data_fim: string;
  aprovado: boolean;
  valor_total: number;
  veiculo: number; // id do veiculo
  vaga: number; // id da vaga
  pagamentos?: number[]; // ids dos pagamentos (opcional)
};

const ReservasScreen = ({ navigation }: Props) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/reservas/');
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error('fetchReservas error', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/reservas/${id}/`, {
        method: 'DELETE',
      });
      setReservas(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('delete reserva error', error);
    }
  };

  const renderItem = ({ item }: { item: Reserva }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Reserva #{item.id}</Text>
      <Text style={styles.description}>Início: {item.data_inicio}</Text>
      <Text style={styles.description}>Fim: {item.data_fim}</Text>
      <Text style={styles.description}>Valor total: R$ {item.valor_total}</Text>
      <Text style={styles.description}>Veículo ID: {item.veiculo}</Text>
      <Text style={styles.description}>Vaga ID: {item.vaga}</Text>
      <Text style={styles.description}>Pagamentos: {item.pagamentos ? item.pagamentos.length : 0}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditReserva', { reserva: item })}
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
      <Text style={styles.title}>Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateReserva')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14, elevation: 4 },
  row: { flexDirection: 'row', marginTop: 10, alignSelf: 'flex-end' },
});

export default ReservasScreen;
