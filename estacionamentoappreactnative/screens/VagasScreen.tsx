import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Vagas'>;

export type Vaga = {
  id: number;
  numero: number;
  tipo_vaga: string;
  localizacao: string;
  status: boolean;
};

const VagasScreen = ({ navigation }: Props) => {

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVagas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/vagas/');
    const data = await response.json();
    setVagas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVagas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/vagas/${id}/`, {
      method: 'DELETE',
    });
    setVagas(prev => prev.filter(v => v.id !== id));
  };

  const renderItem = ({ item }: { item: Vaga }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Vaga {item.numero}</Text>
      <Text style={styles.description}>Tipo: {item.tipo_vaga}</Text>
      <Text style={styles.description}>Localização: {item.localizacao}</Text>
      <Text style={styles.description}>Status: {item.status ? "Ocupada" : "Livre"}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditVaga', { vaga: item })}
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
      <Text style={styles.title}>Vagas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={vagas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateVaga')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default VagasScreen;
