import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Estacionamentos'>;

export type Estacionamento = {
  id: number;
  nome: string;
  endereco: string;
  capacidade_total: number;
  vagas_ocupadas: number;
  funcionario: number;
};

const EstacionamentosScreen = ({ navigation }: Props) => {

  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEstacionamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/estacionamentos/');
    const data = await response.json();
    setEstacionamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEstacionamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/estacionamentos/${id}/`, {
      method: 'DELETE',
    });
    setEstacionamentos((prev) => prev.filter((e) => e.id !== id));
  };

  const renderItem = ({ item }: { item: Estacionamento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.description}>Endereço: {item.endereco}</Text>
      <Text style={styles.description}>Capacidade Total: {item.capacidade_total}</Text>
      <Text style={styles.description}>Vagas Ocupadas: {item.vagas_ocupadas}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditEstacionamento', { estacionamento: item })}
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
      <Text style={styles.title}>Estacionamentos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={estacionamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEstacionamento')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginBottom: 16 },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  description: { marginTop: 4, color: '#555' },
  row: { flexDirection: 'row', marginTop: 8, justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: {
    position: 'absolute', bottom: 20, right: 20,
    backgroundColor: '#0D47A1', padding: 16, borderRadius: 30
  },
});

export default EstacionamentosScreen;
