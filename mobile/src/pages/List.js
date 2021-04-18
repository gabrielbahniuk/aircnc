import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import { format, parseISO } from 'date-fns';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio(process.env.EXPO_API_URL, {
        query: { user_id }
      });
      socket.on('booking_response', booking => {
        Alert.alert(
          `Reservation ${booking.approved ? 'APPROVED.' : 'REJECTED.'}`,
          `\nCompany: ${booking.spot.company}\nDate: ${format(parseISO(booking.date), 'dd.MM.yyyy')}.\n`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});
