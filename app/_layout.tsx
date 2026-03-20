import '../global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { makeServer } from '../mocks/server';
import Toast from 'react-native-toast-message';

import { toastConfig } from '../components/ui/ToastConfig';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen name="store/[id]" />
        <Stack.Screen name="product/[id]" />

        <Stack.Screen
          name="company/form-company"
          options={{
            presentation: 'modal',
            title: 'Configuração de Empresa',
            headerShown: true, // Mostra header só no modal
            headerStyle: { backgroundColor: '#f8fafc' },
            headerShadowVisible: false, // Remove linha no iOS
            headerTintColor: '#0f172a', // Cor do titulo (slate-900)
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="store/form-store"
          options={{
            presentation: 'modal',
            title: 'Configuração de Loja',
            headerShown: true,
            headerStyle: { backgroundColor: '#f8fafc' },
            headerShadowVisible: false,
            headerTintColor: '#0f172a',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="product/form-product"
          options={{
            presentation: 'modal',
            title: 'Configuração de Produto',
            headerShown: true,
            headerStyle: { backgroundColor: '#f8fafc' },
            headerShadowVisible: false,
            headerTintColor: '#0f172a',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>

      <Toast config={toastConfig} position="bottom" bottomOffset={110} visibilityTime={3500} />
    </GluestackUIProvider>
  );
}
