import AppNavigator from './src/routes';
import { useFonts,Alef_400Regular,Alef_700Bold } from '@expo-google-fonts/alef';
export default function App() {
  let [fontsLoaded] = useFonts({
    Alef_400Regular,
    Alef_700Bold,
  });
  return <AppNavigator/>
}


