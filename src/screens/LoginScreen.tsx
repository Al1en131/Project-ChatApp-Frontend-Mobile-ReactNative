import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigate }: { navigate: (screen: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);  // State untuk checkbox

  const handleLogin = async () => {
    if (!isChecked) {
      setError('Please agree to the terms and conditions.');
      return;
    }
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/login', {
        email,
        password,
      });

      if (response.data.token) {
        navigate('Chat');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/auth.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign In</Text>
          <View style={styles.border}></View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../assets/images/icon-message.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#616161"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../assets/images/icon-password.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#616161"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Checkbox for agreeing to terms */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxWrapper}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
        </View>

        <TouchableOpacity
          style={styles.btnlogin}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don’t have an Account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigate('Register')}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: '40%',
  },
  logo: {
    width: '100%',
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 65,
  },
  header: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  border: {
    borderBottomWidth: 3,
    borderBottomColor: '#FB9EC6',
    width: '25%',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB9EC6',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    width: 18,
    height: 18
  },
  btnlogin: {
    paddingVertical: 12,
    backgroundColor: '#FB9EC6',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    width: '100%',
  },
  signUpLink: {
    color: '#FB9EC6',
    fontWeight: 'bold',
  },
  // Styles for the checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FB9EC6',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#FB9EC6',
  },
  checkMark: {
    fontSize: 10,
    alignItems: "center",
    textAlign: "center",
    color: 'white',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#616161',
  },
});

export default LoginScreen;
