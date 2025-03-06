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
    setVisible(showModal)

  }, [showModal]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            style={{
              width: 45,
              height: 45,
             
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 60
  },
  modalContainer: {
    minWidth: "80%",
    height: 60,
    backgroundColor: "#DDD",
    borderRadius: 40,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    fontSize: 18,
    color: "#333",
    marginLeft: 20,
    fontWeight: "500",
    // marginBottom: 20,
  },
});
