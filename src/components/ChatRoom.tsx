import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

type ChatRoomPageProps = {
  route: any;
};

type Message = {
  sender_id: string;
  receiver_id: string;
  message: string;
  sent_at: string;
};

const ChatRoomPage: React.FC<ChatRoomPageProps> = ({ route }) => {
  const { userId, receiverId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chats/messages/${userId}/${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('/api/chats/send', { sender_id: userId, receiver_id: receiverId, message });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender_id: userId, receiver_id: receiverId, message, sent_at: new Date().toISOString() },
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat Room</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.sent_at}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 6,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default ChatRoomPage;
