import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigate }: { navigate: (screen: string) => void }) => {
      const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleRegister = async () => {
    // Clear any previous error messages
    setError('');

    // Validasi input (contoh validasi email dan password)
    if (!email || !password || !username) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/register', {
        username,
        email,
        password,
      });


      // Jika server mengirimkan response yang menunjukkan pendaftaran berhasil
      if (response.data.success) {
        navigate('Login'); // After successful registration, navigate to Login screen
      } else {
        setError(response.data.message || 'Registration failed, please try again.');
      }
    } catch (err) {
      console.error('Registration failed', err);
      setError('An error occurred, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Update username state
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Update email state
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Update password state
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
