import React from "react";
import { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TextInput } from "react-native";

const DATA = [
  {
    id: "1",
    name: "Esther Howard",
    message: "Perfect, see you later",
    time: "15.29",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    unread: 0,
  },
  {
    id: "2",
    name: "Bessie Cooper",
    message: "Don't forget abt tonight babe",
    time: "12.27",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    unread: 0,
  },
  {
    id: "3",
    name: "Sarah Lee",
    message: "How about dinner tonight?",
    time: "11.45",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    unread: 1,
  },
  {
    id: "4",
    name: "Emily Davis",
    message: "Don't forget to pick up the package.",
    time: "09.30",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    unread: 0,
  },
  {
    id: "5",
    name: "Olivia Brown",
    message: "Let's catch up soon!",
    time: "07.00",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    unread: 1,
  },
  {
    id: "6",
    name: "Sophia Turner",
    message: "What time is the meeting?",
    time: "16.00",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    unread: 0,
  },
  {
    id: "7",
    name: "Ava Johnson",
    message: "Looking forward to our movie night!",
    time: "18.25",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    unread: 0,
  },
  {
    id: "8",
    name: "Mia Clark",
    message: "Don't forget to grab my keys.",
    time: "13.50",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    unread: 2,
  },
  {
    id: "9",
    name: "Chloe Martinez",
    message: "Can you send me the project files?",
    time: "10.15",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    unread: 0,
  },
  {
    id: "10",
    name: "Isabella White",
    message: "Let's hang out this weekend!",
    time: "07.55",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    unread: 0,
  },
];




const ChatItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.time}>{item.time}</Text>
      {item.unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.unread}</Text>
        </View>
      )}
    </View>
  </View>
);

export default function App() {
    const [searchText, setSearchText] = useState('');

      const filteredData = DATA.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.message.toLowerCase().includes(searchText.toLowerCase())
      );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/home.png')}
          style={styles.logo}
        />

        <View style={styles.headerContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headerUser}>Hey, Alif</Text>
              <Text style={styles.headerDescription}>Let’s chat and catch up with friends.</Text>
            </View>
            <Image source={require('../assets/images/logo2.png')} />
          </View>
{/* Search Bar */}
          <View style={styles.searchContainer}>
          <Image source={require('../assets/images/icon-search.png')} style={styles.icon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
               placeholderTextColor="#D45588"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabchat}>
        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Chats</Text>
          <Text style={styles.tab}>Friends</Text>
          <Text style={styles.tab}>Calls</Text>
        </View>

        {/* Chat List */}
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FB9EC6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: "30%",
    position: "relative", // Menambahkan position relative agar zIndex berfungsi
  },
  logo: {
    width: "100%",
    height: "100%",
    position: "absolute", // Membuat logo berada di belakang ikon
    zIndex: 1, // Memberikan zIndex lebih rendah agar berada di bawah ikon
  },
  headerContainer: {
    position: 'relative',
    zIndex: 2,
    padding: 20,
    flex: 1,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: "50%",
  },
  headerUser: {
    color: "#D45588",
    fontSize: 40,
    marginBottom: 4,
    fontWeight: "700",
  },
  headerDescription: {
    color: "#D45588",
    fontSize: 18,
    fontWeight: "400",
  },
logo2: {
    width: 60, // Ukuran logo kedua
    height: 60, // Ukuran logo kedua
    borderRadius: 35, // Membuat logo berbentuk lingkaran
    marginRight: 5, // Memberikan jarak di sebelah kanan logo
    resizeMode: 'contain', // Agar logo tetap terjaga proporsinya
},
textContainer: {
    marginBottom: 10},
avatarContainer: {
  flexDirection: 'row',  // Menyusun elemen dalam baris
  justifyContent: 'flex-start',  // Menyusun elemen dimulai dari kiri
  alignItems: 'center',  // Menjaga elemen tetap rata tengah secara vertikal
  overflow: 'hidden',  // Menghindari elemen yang meluap
},

avatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 10,
},
searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D45588",
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#D45588"
  },
  tabchat: {
    backgroundColor: "#FFEBF2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "70%",
    padding: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  tab: {
    fontSize: 16,
    color: "#E874A1",
  },
  activeTab: {
    color: "#D45588",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#D45588",
    paddingBottom: 5,
  },
  itemContainer: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#D45588",
    borderRadius: 20,
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D45588",
  },
  message: {
    fontSize: 14,
    color: "#E66D96",
  },
  infoContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  badge: {
    backgroundColor: "#D45588",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    paddingTop: 30,
    borderWidth: 1,
    backgroundColor: "#FFEBF2",
    borderColor: "#D45588",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
