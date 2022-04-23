/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Platform, PermissionsAndroid } from 'react-native';

export const coreBaseUrl = 'api.office.erxes.io';

const getAttachmentUrl = (baseUrl: string, value: string) => {
  if (value && !value.includes('http')) {
    return `https://${baseUrl}/read-file?key=` + value;
  }
  return value;
};

const ios = Platform.OS === 'ios';

const isIphoneWithNotch = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const getNameUser = (item: any) => {
  return (
    item?.userDetail?.details?.fullName ||
    item?.details?.fullName ||
    item?.username ||
    item?.email ||
    'Unknown'
  );
};

const androidCameraPermission = async (callback: () => void) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
      callback();
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const range = (start: number, stop: number) => {
  return Array.from(Array(stop), (_, i) => start + i);
};

// Return the list of values that are the intersection of two arrays
const intersection = (array1: any, array2: any) => {
  return array1.filter((n: any) => array2.includes(n));
};

// Computes the union of the passed-in arrays: the list of unique items
const union = (array1: any, array2: any) => {
  return array1.concat(array2.filter((n: any) => !array1.includes(n)));
};

// Similar to without, but returns the values from array that are not present in the other arrays.
const difference = (array1: any, array2: any) => {
  return array1.filter((n: any) => !array2.includes(n));
};

const isEmpty = (str: string) => {
  return (
    str === undefined ||
    str === 'undefined' ||
    str === null ||
    str === 'null' ||
    str.trim() === ''
  );
};

const getModifableArray = (array: any) => {
  return JSON.parse(JSON.stringify(array));
};

function getIconName(key?: string) {
  switch (key) {
    case 'docx':
      return 'doc';
    case 'pptx':
      return 'ppt';
    case 'xlsx':
      return 'xls';
    case 'mp4':
    case 'zip':
      return 'zip';
    case 'csv':
      return 'csv';
    case 'doc':
      return 'doc';
    case 'ppt':
      return 'ppt';
    case 'psd':
      return 'psd';
    case 'avi':
      return 'avi';
    case 'txt':
      return 'txt';
    case 'rar':
      return 'rar';
    case 'mp3':
      return 'mp3';
    case 'pdf':
      return 'pdf';
    case 'png':
      return 'png';
    case 'xls':
      return 'xls';
    default:
      return 'file-2';
  }
}

const getNameChip = (item: any, isUser: boolean, isItem: boolean) => {
  return (
    item.details?.fullName ||
    item.username ||
    item.email ||
    item.name ||
    item.primaryName ||
    (isUser ? renderFullName(item) : isItem ? item : 'Unknown')
  );
};

const renderFullName = (item: any) => {
  let fullName = '';
  if (item.firstName || item.lastName) {
    if (item.firstName) {
      fullName += item.firstName + ' ';
    }
    if (item.lastName) {
      fullName += item.lastName;
    }
    return fullName;
  }
  if (item.primaryEmail) {
    return item.primaryEmail;
  }
  if (item.visitorContactInfo?.email) {
    return item.visitorContactInfo.email;
  }
  return 'Unknown';
};

const renderUserFullName = (data: any) => {
  const { details } = data;

  if (details && details.fullName) {
    return details.fullName;
  }

  if (data.email || data.username) {
    return data.email || data.username;
  }

  return 'Unknown';
};

const regexRemoveTags = /(<([^>]+)>)/gi;

const incomingBottom = { borderTopLeftRadius: 0, marginBottom: 10 };
const incomingMiddle = {
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
};
const incomingTop = { borderBottomLeftRadius: 0 };
const incomingSolo = {
  borderBottomLeftRadius: 20,
  borderTopLeftRadius: 20,
  marginBottom: 10,
};

const getCustomerBorder = (
  conversationMessages: string | any[] | undefined,
  position: number
) => {
  if (conversationMessages === undefined) {
    return {};
  }
  if (position > 0) {
    if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position - 1]?.createdUser?._id
    ) {
      if (
        conversationMessages[position]?.createdUser?._id ===
        conversationMessages[position + 1]?.createdUser?._id
      ) {
        return incomingMiddle;
      } else {
        return incomingTop;
      }
    } else if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position + 1]?.createdUser?._id
    ) {
      return incomingBottom;
    } else {
      return incomingSolo;
    }
  } else if (position + 1 < conversationMessages.length) {
    if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position + 1]?.createdUser?._id
    ) {
      return incomingBottom;
    } else {
      return incomingSolo;
    }
  } else {
    return incomingSolo;
  }
};

const outcomingBottom = { borderTopRightRadius: 0, marginBottom: 10 };
const outcomingMiddle = {
  borderBottomRightRadius: 0,
  borderTopRightRadius: 0,
};
const outcomingTop = { borderBottomRightRadius: 0 };
const outcomingSolo = {
  borderBottomRightRadius: 20,
  borderTopRightRadius: 20,
  marginBottom: 10,
};

const getUserBorder = (
  conversationMessages: string | any[] | undefined,
  position: number
) => {
  if (conversationMessages === undefined) {
    return {};
  }
  if (position > 0) {
    if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position - 1]?.createdUser?._id
    ) {
      if (
        conversationMessages[position]?.createdUser?._id ===
        conversationMessages[position + 1]?.createdUser?._id
      ) {
        return outcomingMiddle;
      } else {
        return outcomingTop;
      }
    } else if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position + 1]?.createdUser?._id
    ) {
      return outcomingBottom;
    } else {
      return outcomingSolo;
    }
  } else if (position + 1 < conversationMessages.length) {
    if (
      conversationMessages[position]?.createdUser?._id ===
      conversationMessages[position + 1]?.createdUser?._id
    ) {
      return outcomingBottom;
    } else {
      return outcomingSolo;
    }
  } else {
    return outcomingSolo;
  }
};

const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {
  isEmpty,
  range,
  intersection,
  union,
  difference,
  androidCameraPermission,
  deviceHeight,
  deviceWidth,
  isIphoneWithNotch,
  getNameUser,
  getModifableArray,
  getIconName,
  getNameChip,
  renderFullName,
  renderUserFullName,
  incomingBottom,
  incomingMiddle,
  incomingSolo,
  incomingTop,
  outcomingBottom,
  outcomingMiddle,
  outcomingSolo,
  outcomingTop,
  getCustomerBorder,
  getUserBorder,
  regexRemoveTags,
  numberWithCommas,
  getAttachmentUrl,
  ios,
};
