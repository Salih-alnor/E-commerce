import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import successIcon from "../../assets/images/icons/success.png";
import unSuccessIcon from "../../assets/images/icons/unsuccess.png";

const NotificationModal = ({ showModal, message, status }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(showModal);
    }, 10);
  });

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            style={{
              width: 60,
              height: 60,
              marginBottom: 10,
            }}
            source={status === "success" ? successIcon : unSuccessIcon}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)", // شفافية للخلفية
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    height: 200,
    backgroundColor: "#DDDD",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
});
