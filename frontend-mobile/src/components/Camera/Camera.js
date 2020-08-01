import React, {PureComponent} from 'react';
import {StyleSheet, Modal, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

class Camera extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => this.props.onRequestClose()}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={styles.captureWrapper}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}></TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.props.setPreview(data.uri);
      this.props.onRequestClose();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    height: 50,
    width: 50,
  },
  captureWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 50,
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 5,
  },
});

export default Camera;
