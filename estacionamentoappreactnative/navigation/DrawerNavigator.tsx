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
import EditFuncionarioScreen from '@/screens/EditFuncionariosScreen';

import TarifaScreen, { Tarifa } from '@/screens/TarifasScreen';
import CreateTarifaScreen from '@/screens/CreateTarifasScreen';
import EditTarifaScreen from '@/screens/EditTarifasScreen';

import VeiculosScreen, { Veiculo } from '@/screens/VeiculosScreen';
import CreateVeiculoScreen from '@/screens/CreateVeiculosScreen';
import EditVeiculoScreen from '@/screens/EditVeiculosScreen';

import VagasScreen, { Vaga } from '@/screens/VagasScreen';
import CreateVagaScreen from '@/screens/CreateVagasScreen';
import EditVagaScreen from '@/screens/EditVagasScreen';

import EstacionamentosScreen, { Estacionamento } from '@/screens/EstacionamentosScreen';
import CreateEstacionamentoScreen from '@/screens/CreateEstacionamentosScreen';
import EditEstacionamentoScreen from '@/screens/EditEstacionamentoScreen';

import PagamentosScreen, { Pagamento } from '@/screens/PagamentosScreen';
import CreatePagamentoScreen from '@/screens/CreatePagamentosScreen';
import EditPagamentoScreen from '@/screens/EditPagamentosScreen';
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

    Veiculos: undefined;
    CreateVeiculo: undefined;
    EditVeiculo: { veiculo: Veiculo };

    Vagas: undefined;
    CreateVaga: undefined;
    EditVaga: { vaga: Vaga };

    Estacionamentos: undefined;
    CreateEstacionamento: undefined;
    EditEstacionamento: { estacionamento: Estacionamento };

    Pagamentos: undefined;
    CreatePagamento: undefined;
    EditPagamento: { pagamento: Pagamento };

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


    />
    <Drawer.Screen
        name="Veiculos"
        component={VeiculosScreen}
        options={{
    drawerIcon: ({ color, size }) =>
        <Ionicons name="car-outline" size={size} color={color} />,
        title: 'Veículos',
    }}
    />
    <Drawer.Screen
        name="CreateVeiculo"
        component={CreateVeiculoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Veículo' }}
    />
    <Drawer.Screen
        name="EditVeiculo"
        component={EditVeiculoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Veículo' }}

    />
    <Drawer.Screen
        name="Vagas"
        component={VagasScreen}
        options={{
    drawerIcon: ({ color, size }) => (
        <Ionicons name="grid-outline" size={size} color={color} />
    ),
    title: 'Vagas',
  }}
    />
    <Drawer.Screen
        name="CreateVaga"
        component={CreateVagaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova Vaga' }}
        
    />
    <Drawer.Screen
        name="EditVaga"
        component={EditVagaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Vaga' }}


    />    
    <Drawer.Screen
        name="Estacionamentos"
        component={EstacionamentosScreen}
        options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="business-outline" size={size} color={color} />
    ),
    title: 'Estacionamentos',
  }}
    />
    <Drawer.Screen
        name="CreateEstacionamento"
        component={CreateEstacionamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Estacionamento' }} 
    />
    <Drawer.Screen
        name="EditEstacionamento"
        component={EditEstacionamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Estacionamento' }}

    />    
    <Drawer.Screen
        name="Pagamentos"
        component={PagamentosScreen}
        options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="card-outline" size={size} color={color} />
    ),
    title: 'Pagamentos',
  }}
    />
    <Drawer.Screen
        name="CreatePagamento"
        component={CreatePagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Pagamento' }}
    />
    <Drawer.Screen
        name="EditPagamento"
        component={EditPagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Pagamento' }}
  
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;