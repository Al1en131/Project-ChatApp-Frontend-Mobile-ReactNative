import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const user1_id = '3';  // ID pengguna yang sedang login
  const user2_id = '1';  // ID penerima pesan

  // Fetch pesan saat komponen dimuat
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/messages/${user1_id}/${user2_id}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Gagal mengambil pesan', err);
    }
  };

  // Kirim pesan
  const sendMessage = async () => {
    if (message.trim()) { // Hindari mengirim pesan kosong
      try {
        await axios.post('http://10.0.2.2:5000/api/send', {
          sender_id: user1_id,
          receiver_id: user2_id,
          message,
        });
        setMessage('');  // Kosongkan input setelah mengirim
        fetchMessages();  // Ambil pesan terbaru setelah mengirim
      } catch (err) {
        console.error('Gagal mengirim pesan', err);
      }
    }
  };

  useEffect(() => {
    fetchMessages(); // Ambil pesan saat komponen dimuat
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender_id}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Ketik pesan"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Kirim" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
  },
});

export default ChatScreen;
