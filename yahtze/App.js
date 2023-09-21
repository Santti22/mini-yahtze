import { Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';

export default function App() {
  return (
    <View>
        <Header />
        <Gameboard />
        <Footer />
    </View>
  );
}
