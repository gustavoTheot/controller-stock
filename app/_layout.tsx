import '../global.css'; 
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { makeServer } from '../mocks/server';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        <Stack.Screen name="store/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="store/new-store" options={{ presentation: 'modal', title: 'Nova Loja' }} />
        
        
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        
        <Stack.Screen name="new-company" options={{ presentation: 'modal', title: 'Nova Empresa' }} />
      </Stack>
    </GluestackUIProvider>
  );
}