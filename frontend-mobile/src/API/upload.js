import RNFetchBlob from 'rn-fetch-blob';
import * as axios from 'axios';
import {url} from './index';
import {showMessage, hideMessage} from 'react-native-flash-message';

const getFileExtension = (path) =>
  path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);

export const submitReport = async (
  path,
  lat,
  lon,
  title = 'default',
  type = 'general',
  description = 'no description provided',
) => {
  try {
    let fileExtension = getFileExtension(path);
    console.log('Uploading from ', path);
    const uploadData = [
      {
        name: 'mediaContent',
        filename: path,
        type: 'image/jpg', //+ fileExtension,
        data: RNFetchBlob.wrap(path),
      },
    ];
    uploadData.push({
      name: 'lat',
      data: lat.toString(),
    });
    uploadData.push({
      name: 'lon',
      data: lon.toString(),
    });
    uploadData.push({
      name: 'title',
      data: title,
    });
    uploadData.push({
      name: 'type',
      data: type,
    });
    uploadData.push({
      name: 'description',
      data: description,
    });
    let response = await RNFetchBlob.fetch(
      'PUT',
      url + '/feedback/create',
      {
        'Content-Type': 'multipart/form-data',
      },
      uploadData,
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log('error', e);
    return false;
  }
};

export const reportEmergency = async (lat, lon) => {
  try {
    await axios.put(url + '/feedback/emergency', {lat, lon});
    showMessage({
      message: 'Emergency called.',
      description: 'Emergency report submitted.',
      type: 'danger',
    });
  } catch (e) {
    console.log('error in emergency', e);
    return false;
  }
};

