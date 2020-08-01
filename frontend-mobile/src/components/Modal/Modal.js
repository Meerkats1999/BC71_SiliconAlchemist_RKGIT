import React from 'react';
import {StyleSheet, Modal, View} from 'react-native';

export default (props) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.onRequestClose()}>
        {props.children}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
