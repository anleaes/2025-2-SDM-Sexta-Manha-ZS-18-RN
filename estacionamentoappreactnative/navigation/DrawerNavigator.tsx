import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';

//import classes aqui!!!

import ClientesScreen, { Cliente } from '@/screens/ClientesScreen';
import CreateClienteScreen from '@/screens/CreateClientesScreen';
import EditClienteScreen from '@/screens/EditClientesScreen';

import FuncionariosScreen from '@/screens/FuncionariosScreen';
import { Funcionario } from '@/screens/FuncionariosScreen';
import CreateFuncionarioScreen from '@/screens/CreateFuncionariosScreen';
import EditFuncionarioScreen from '@/screens/EditFuncionarioScreen';

import TarifaScreen, { Tarifa } from '@/screens/TarifaScreen';
import CreateTarifaScreen from '@/screens/CreateTarifaScreen';
import EditTarifaScreen from '@/screens/EditTarifaScreen';
//import classes aqui!!!

export type DrawerParamList = {
  Home: undefined;
  //chamar outras telas aqui!!!
  
  Clientes: undefined;
  CreateCliente: undefined;
  EditCliente: { cliente: Cliente };

  Funcionarios: undefined;
  CreateFuncionario: undefined;
  EditFuncionario: { funcionario: Funcionario };

  Tarifas: undefined;
  CreateTarifa: undefined;
  EditTarifa: { tarifa: Tarifa };


  //chamar outras telas aqui!!!
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
    <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
            title: 'Início',
        }}

        //adicionar drawer.screens aqui!!!

    />
    <Drawer.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color}  />,
            title: 'Clientes',
        }}
    />
    <Drawer.Screen
        name="CreateCliente"
        component={CreateClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo cliente' }}
    />
    <Drawer.Screen
        name="EditCliente"
        component={EditClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar cliente' }}
    /> 
    

    <Drawer.Screen
       name="Funcionarios"
       component={FuncionariosScreen}
       options={{
        drawerIcon: ({ color, size }) => (
        <Ionicons name="people-outline" size={size} color={color} />
    ),
    title: 'Funcionários',
  }}
    />
    <Drawer.Screen
        name="CreateFuncionario"
        component={CreateFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Funcionário' }}
    />
    <Drawer.Screen
        name="EditFuncionario"
        component={EditFuncionarioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Funcionário' }}
  

    />
    <Drawer.Screen
        name="Tarifas"
        component={TarifaScreen}
        options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="cash-outline" size={size} color={color} />
    ),
    title: 'Tarifas',
  }}
    />
    <Drawer.Screen
        name="CreateTarifa"
        component={CreateTarifaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova Tarifa' }}
    />
    <Drawer.Screen
        name="EditTarifa"
        component={EditTarifaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Tarifa' }}
        
        //adicionar drawer.screens aqui!!!
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;