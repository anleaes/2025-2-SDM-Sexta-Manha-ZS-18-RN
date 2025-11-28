import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
//import classes aqui!!!

import ClientesScreen, { Cliente } from '@/screens/ClientesScreen';
//import CreateClienteScreen from '@/screens/CreateClienteScreen';
//import EditClienteScreen from '@/screens/EditClienteScreen';

//import classes aqui!!!

export type DrawerParamList = {
  Home: undefined;
  //chamar outras telas aqui!!!
  
  Clientes: undefined;
  CreateCliente: undefined;
  EditCliente: { cliente: Cliente };

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
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;