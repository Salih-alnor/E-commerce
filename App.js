import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native" ;
import StackNav from './components/navigators/StackNav';


export default function App() {
  return (
   <NavigationContainer>
    <StackNav />
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
