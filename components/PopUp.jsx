import {
	Modal,
	StyleSheet,
	Text,
	View,
	TextInput,
	Pressable,
	Keyboard,
	TouchableWithoutFeedback,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  
  const PopUp = ({ visible, notEkle, onCancel }) => {
	const [enterBaslik, setEnterBaslik] = useState("");
	const [enterNot, setEnterNot] = useState("");
	const [keyboardVisible, setKeyboardVisible] = useState(false);
  
	useEffect(() => {
	  const keyboardDidShowListener = Keyboard.addListener(
		'keyboardDidShow',
		() => setKeyboardVisible(true)
	  );
	  const keyboardDidHideListener = Keyboard.addListener(
		'keyboardDidHide',
		() => setKeyboardVisible(false)
	  );
  
	  return () => {
		keyboardDidHideListener.remove();
		keyboardDidShowListener.remove();
	  };
	}, []);
  
	const addNot = () => {
	  if (enterBaslik !== "" || enterNot !== "") {
		notEkle(enterBaslik, enterNot);
		setEnterBaslik('');
		setEnterNot('');
	  }
	};
  
	const notInputHandler = (enteredText) => {
	  setEnterNot(enteredText);
	};
  

	const closePopUp = () => {
		if (enterBaslik === '' && enterNot === '') {
		  onCancel();
		}
	  };

	return (
	  <Modal animationType="slide" visible={visible} transparent={true}>
		<TouchableWithoutFeedback onPress={closePopUp}>
		<View style={keyboardVisible ? styles.containerNoCenter : styles.container}>
		  <View style={styles.popupContent}>
			<View style={styles.inputStyle}>
			  <TextInput
				style={styles.baslikInput}
				placeholderTextColor={"white"}
				placeholder="Baslik giriniz"
				value={enterBaslik}
				onChangeText={(text) => setEnterBaslik(text)}
			  />
			  <TextInput
				style={styles.notInput}
				placeholderTextColor={"white"}
				placeholder="Not Giriniz"
				value={enterNot}
				onChangeText={notInputHandler}
				multiline={true}
				numberOfLines={4}
				textAlignVertical="top"
			  />
			</View>
			<View style={styles.buttonView}>
			  <Pressable
				onPress={()=>{setEnterBaslik('');
					setEnterNot('');
					onCancel()}}
				style={({ pressed }) => [
				  styles.button,
				  {
					backgroundColor: pressed ? "lightgrey" : "#FF4545",
				  },
				]}
			  >
				<Text style={styles.buttonText}> Iptal </Text>
			  </Pressable>
			  <Pressable
				onPress={addNot}
				style={({ pressed }) => [
				  styles.button,
				  {
					backgroundColor: pressed ? "lightgrey" : "#FBD288",
				  },
				]}
			  >
				<Text style={styles.buttonText}> Kaydet </Text>
			  </Pressable>
			</View>
		  </View>
		</View>
		</TouchableWithoutFeedback>
	  </Modal>
	);
  };
  
  export default PopUp;
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	containerNoCenter: {
	  flex: 1,
	  alignItems: "center", 
	  justifyContent: "flex-start",
	  backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	popupContent: {
	  width: "90%",
	  alignItems: "center",
	  backgroundColor: "#686D76",
	  borderRadius: 20,
	  padding: 15,
	  marginTop:30
	},
	inputStyle: {
	  width: "90%",
	  justifyContent: "center",
	},
	baslikInput: {
	  height: 40,
	  borderBottomWidth: 1,
	  borderColor:'#1E2A5E',
	  fontSize: 23,
	  fontWeight: "bold",
	  marginBottom: 5,
	  color: 'white',
	},
	notInput: {
	  fontSize: 17,
	  padding: 15,
	  borderWidth: 1,
	  borderColor:'#1E2A5E',
	  borderRadius: 20,
	  color: 'white',
	  height: 150,
	},
	buttonView: {
		marginTop:10,
	  width: "100%",
	  flexDirection: "row",
	  justifyContent: "space-between",
	},
	button: {
	  width: "25%",
	  height: 40,
	  borderRadius: 15,
	  alignItems: "center",
	  justifyContent: "center",
	},
	buttonText: {
	  color: "white",
	  fontSize: 25,
	  fontWeight: "bold",
	},
  });
  