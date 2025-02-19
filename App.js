import { useState, useRef, useEffect } from "react";
import { Pressable, StyleSheet, Text, FlatList, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopUp from "./components/PopUp";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notlar, setNotlar] = useState([]);

  const noteAnimations = useRef({});

  const startModalVisible = () => {
    setModalVisible(true);
  };

  const endModal = () => {
    setModalVisible(false);
  };

  const addNot = (baslik, not) => {
    const currentDate = new Date();
  
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('tr-TR', { month: 'long' }); 
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${day} ${month} ${hours}:${minutes}`; 
  
    endModal();
    const newId = Math.random().toString();
  
    noteAnimations.current[newId] = {
      slideAnim: new Animated.Value(50),
      fadeAnim: new Animated.Value(0),
    };
  
    setNotlar((currentNots) => [
      ...currentNots,
      { baslik: baslik, not: not, tarih: formattedDate, id: newId },
    ]);
  };
  

  const deleteNot = (id) => {
    setNotlar((currentNots) => currentNots.filter((not) => not.id !== id));
    delete noteAnimations.current[id];
  };

  const toggleDeleteButton = (id) => {
    if (!noteAnimations.current[id]) {
      noteAnimations.current[id] = {
        slideAnim: new Animated.Value(50), 
        fadeAnim: new Animated.Value(0),   
      };
    }

    const { slideAnim, fadeAnim } = noteAnimations.current[id];

    if (slideAnim._value === 50) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={startModalVisible}
        style={({ pressed }) => [
          styles.buton,
          {
            backgroundColor: pressed ? "lightgrey" : "#4CC9FE",
          },
        ]}
      >
        <Text style={styles.butonText}>Not Ekle</Text>
      </Pressable>
      <PopUp visible={modalVisible} notEkle={addNot} onCancel={endModal} />
      <View style={styles.listStyle}>
        <FlatList
          data={notlar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { slideAnim, fadeAnim } = noteAnimations.current[item.id] || {
              slideAnim: new Animated.Value(50), 
              fadeAnim: new Animated.Value(0),
            };

            return (
              <Pressable
                onPress={() => toggleDeleteButton(item.id)} 
                style={styles.itemContainer}
              >
                <View>
                  <Text style={styles.itemBaslik}>
                    {item.baslik} <Text style={styles.tarih}>{item.tarih}</Text>
                  </Text>
                  <Text style={{ fontSize: 16 }}>{item.not}</Text>
                </View>

                {noteAnimations.current[item.id] && (
                  <Animated.View
                    style={[
                      styles.delele,
                      { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
                    ]}
                  >
                    <Pressable onPress={() => deleteNot(item.id)}>
                      <Text style={styles.deleteBtn}>Sil</Text>
                    </Pressable>
                  </Animated.View>
                )}
              </Pressable>
            );
          }}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#384B70",
    alignItems: "center",
  },
  buton: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  butonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  listStyle: {
    width: "90%",
  },
  itemContainer: {
    flex: 1,
    width: "40%",
    height: 150,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "space-between",
  },
  itemBaslik: {
    fontSize: 20,
    fontWeight: "600",
  },
  tarih: {
    fontSize: 12,
    color: "#999",
    marginLeft: 5,
  },
  delele: {
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: "red",
    height: 30,
    color: "white",
    width: "100%",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    paddingTop: 5,
  },
});
