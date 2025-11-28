import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <ThemedView style={styles.container}>
    <Image
      source={require('../assets/images/gato.png')}
      style={styles.catImage}
      resizeMode="cover"
    />
    <ThemedText type="title" style={styles.title}>
      Bem-vindo ao App de Estacionamento de Veículos!
    </ThemedText>
    <ThemedText type="subtitle" style={styles.subtitle}>
      Navegue pelo menu para gerenciar clientes, funcionarios, veículos, vagas e mais.
    </ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // fundo branco
  },
  catImage: {
    width: 200,
    height: 220,
    marginBottom: 20,
    borderRadius: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333', // texto cinza chumbo
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
    color: '#333333', // texto cinza chumbo
  },
});

export default HomeScreen;