import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/logo.png';

export default function Book({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');


  const id = navigation.getParam('spotId');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert('Request sent!');
    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  function handleChangePicker(evt, selectedDate) {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const showModePicker = (currentMode) => {
    setShowPicker(true);
    setPickerMode(currentMode);
  };

  const showDatepicker = () => {
    showModePicker('date');
  };

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
        <View style={styles.bookContainer}>
          <Text style={styles.label}>Select a date</Text>
          <Icon name="calendar" size={35} color="#bbb" onPress={showDatepicker}/>
        </View>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={pickerMode}
            is24Hour={true}
            display="default"
            onChange={handleChangePicker}
          />
        )
      }

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book for {format(date, 'dd.MM.yyyy')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  bookContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  label: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
