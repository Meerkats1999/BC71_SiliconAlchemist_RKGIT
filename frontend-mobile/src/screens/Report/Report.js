import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import Camera from '../../components/Camera/Camera';
import PreviewModal from '../../components/Modal/Modal';

const height = Dimensions.get('window').height;

export default () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [preview, setPreview] = useState('');

  return (
    <View style={styles.container}>
      <View style={{paddingLeft: '4%'}}>
        <Text style={styles.header}>Report</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <Ionicons name="ios-warning-outline" size={height / 50} color="red" />
          <Text
            style={{
              color: 'white',
              paddingBottom: '5%',
              paddingTop: '5%',
              paddingLeft: '2%',
            }}>
            Report occurrence of incidents or disturbance on the roads.
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{color: 'white'}}>
            - Please attach a picture of the disturbance or incidents.
          </Text>
          <Text style={{color: 'white'}}>
            - Your contribution will help in improvement of our services.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => setModalVisible(true)}>
          <Ionicons name={'camera'} size={height / 25} color={'white'} />
          <Text style={{color: 'white'}}>Capture </Text>
        </TouchableOpacity>
        {preview.length > 0 && (
          <TouchableOpacity
            style={styles.preview}
            onPress={() => setPreviewVisible(true)}>
            <Text style={{color: '#89f263'}}>Preview</Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: 'white',
            alignSelf: 'flex-start',
            fontSize: 20,
            paddingTop: '10%',
          }}>
          Title
        </Text>
        <TextInput style={styles.title} />
        <Text
          style={{
            color: 'white',
            alignSelf: 'flex-start',
            fontSize: 20,
            paddingTop: '3%',
            paddingBottom: '2%',
          }}>
          Select occurrence type
        </Text>
        <DropDownPicker
          items={[
            {
              label: 'Potholes',
              value: 'pothole',
            },
            {
              label: 'Containment Zone',
              value: 'containment_zone',
            },
            {
              label: 'Construction',
              value: 'construction',
            },
            {
              label: 'Accident',
              value: 'accident',
            },
          ]}
          // defaultValue={this.state.country}
          containerStyle={{height: 40}}
          style={styles.dropDown}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            color: 'white',
          }}
          dropDownStyle={{
            backgroundColor: '#262626',
            color: 'white',
            borderColor: 'black',
          }}
          conta
          // onChangeItem={(item) =>
          //   this.setState({
          //     country: item.value,
          //   })
          // }
        />
        <Text
          style={{
            color: 'white',
            alignSelf: 'flex-start',
            fontSize: 20,
            paddingTop: '3%',
          }}>
          Description
        </Text>
        <TextInput
          style={{
            ...styles.title,
            height: height / 10,
            fontSize: 20,
          }}
          multiline={true}
          textAlignVertical="top"
        />
      </ScrollView>
      <Camera
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        setPreview={(baseUri) => setPreview(baseUri)}
      />
      <PreviewModal
        visible={previewVisible}
        onRequestClose={() => setPreviewVisible(false)}>
        {preview.length > 0 && (
          <Image
            source={{uri: preview}}
            style={{height: '100%', width: '100%'}}
          />
        )}
      </PreviewModal>
      <TouchableOpacity style={styles.submitButton}>
        <Ionicons name="ios-warning-outline" size={height / 30} color="red" />
        <Text style={{fontSize: 25, color: 'red'}}>Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '2%',
    paddingRight: '1%',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Roboto',
    letterSpacing: 3,
  },
  main: {
    backgroundColor: '#141414',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 10,
    paddingTop: '5%',
    paddingLeft: '3%',
    paddingRight: '3%',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  cameraButton: {
    height: height / 10,
    width: '80%',
    marginTop: '10%',
    backgroundColor: '#262626',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    height: height / 20,
    backgroundColor: '#262626',
    marginTop: '2%',
    borderRadius: 5,
    fontSize: 15,
    alignItems: 'flex-start',
    color: 'white',
  },
  dropDown: {
    height: height / 20,
    width: '100%',
    backgroundColor: '#262626',
    borderColor: '#262626',
    color: 'white',
  },
  preview: {
    height: height / 29,
    width: '80%',
    backgroundColor: '#262626',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#7dba66',
    borderWidth: 1,
  },
  submitButton: {
    height: height / 20,
    width: '50%',
    backgroundColor: '#141414',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    borderRadius: 40,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10%',
    justifyContent: 'space-evenly',
    borderColor: 'red',
  },
});
