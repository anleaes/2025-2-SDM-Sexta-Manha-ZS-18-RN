import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Tarifas'>;

export type Tarifa = {
  id: number;
  valor_hora: number;
  valor_diaria: number;
  valor_mensal: number;
  hora_entrada: string;
};

const TarifaScreen = ({ navigation }: Props) => {
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTarifas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/tarifas/');
    const data = await response.json();
    setTarifas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTarifas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/tarifas/${id}/`, {
      method: 'DELETE',
    });
    setTarifas(prev => prev.filter(t => t.id !== id));
  };

  const renderItem = ({ item }: { item: Tarifa }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Tarifa #{item.id}</Text>
      <Text style={styles.description}>Valor Hora: R$ {item.valor_hora}</Text>
      <Text style={styles.description}>Valor Diária: R$ {item.valor_diaria}</Text>
      <Text style={styles.description}>Valor Mensal: R$ {item.valor_mensal}</Text>
      <Text style={styles.description}>Hora Entrada: {item.hora_entrada}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditTarifa', { tarifa: item })}
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
      <Text style={styles.title}>Tarifas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={tarifas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTarifa')}
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
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    alignSelf: 'flex-end',
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
    right: 22,
    bottom: 22,
    backgroundColor: '#0D47A1',
    padding: 14,
    borderRadius: 30,
  },
});

export default TarifaScreen;
