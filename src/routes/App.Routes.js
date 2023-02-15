import React from 'react';
import { FontAwesome5, Fontisto, Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import CartInfo from '../pages/CartInfo';
import Categorias from '../pages/Categorias';
import Deliveries from '../pages/Deliveries';
import DeliveryInfo from '../pages/DeliveryInfo';
import Pedidos from '../pages/Pedidos';
import Perfil from '../pages/User';

import SideBar from '../components/SideBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 65 },
          fontWeight: 'bold',
          headerShown: false,
        }}

      >
        <Tab.Screen
          name='Home'
          component={ Categorias }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />
        <Tab.Screen
          name='Pedidos'
          component={ Pedidos }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />
        <Tab.Screen
          name='Perfil'
          component={ Perfil }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <FontAwesome5 name='user-cog' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />

      </Tab.Navigator>
    );
  }

  function DrawerNavigator() {

    const getHeaderTitle = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
      switch (routeName) {
        case "CartInfo": return "Cart";
        case "Categorias": return "Categorias";
        case "Deliveries": return "Deliveries";
        case "DeliveryInfo": return "Delivery";
        case "Pedidos": return "Pedidos";
        case "Perfil": return "Perfil";
      }
    };

    return (
      <Drawer.Navigator
        drawerContent={(props) => <SideBar {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: '#FFF',
            width: '70%',
            marginTop: 82,
            marginBotton: 5,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
          },
          drawerLabelStyle: {
            fontWeight: 'bold'
          },
          drawerItemStyle: {
            activeTintColor: '#FFF',
            activeBackgroundColor: '#FF0000',
            inactiveTintColor: '#5D5D5D',
            inactiveBackgroundColor: '#000',
            marginVertical: 5
          },
        }}
      >
        <Drawer.Screen
          name="Delivery Bairro"
          component={TabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#000',
              borderBottomWidth: 0,
            },
            tabBarIcon: {
              color: '#000'
            }
          })}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
      />

      <Stack.Screen
        name="Categorias"
        component={ Categorias }
        options={() => ({
          headerShown: true,
          headerTitle: 'Categorias',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="Deliveries"
        component={ Deliveries }
        options={() => ({
          headerShown: true,
          headerTitle: 'Deliveries por Categoria',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="DeliveryInfo"
        component={ DeliveryInfo }
        options={() => ({
          headerShown: true,
          headerTitle: 'Delivery (Cardápio)',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="Cart"
        component={ CartInfo }
        options={() => ({
          headerShown: true,
          headerTitle: 'Minhas Compras',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

    </Stack.Navigator>
  );
}
