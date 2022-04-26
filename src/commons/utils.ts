/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Platform, PermissionsAndroid } from 'react-native';

export const coreBaseUrl = 'api.office.erxes.io';

export const getAttachmentUrl = (baseUrl: string, value: string) => {
  if (value && !value.includes('http')) {
    return `https://${baseUrl}/read-file?key=` + value;
  }
  return value;
};

export const ios = Platform.OS === 'ios';

export const isIphoneWithNotch = () => {
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

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const getNameUser = (item: any) => {
  return (
    item?.userDetail?.details?.fullName ||
    item?.details?.fullName ||
    item?.username ||
    item?.email ||
    'Unknown'
  );
};

export const androidCameraPermission = async (callback: () => void) => {
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

export const range = (start: number, stop: number) => {
  return Array.from(Array(stop), (_, i) => start + i);
};

// Return the list of values that are the intersection of two arrays
export const intersection = (array1: any, array2: any) => {
  return array1.filter((n: any) => array2.includes(n));
};

// Computes the union of the passed-in arrays: the list of unique items
export const union = (array1: any, array2: any) => {
  return array1.concat(array2.filter((n: any) => !array1.includes(n)));
};

// Similar to without, but returns the values from array that are not present in the other arrays.
export const difference = (array1: any, array2: any) => {
  return array1.filter((n: any) => !array2.includes(n));
};

export const isEmpty = (str: string) => {
  return (
    str === undefined ||
    str === 'undefined' ||
    str === null ||
    str === 'null' ||
    str.trim() === ''
  );
};

export const getModifableArray = (array: any) => {
  return JSON.parse(JSON.stringify(array));
};

export function getIconName(key?: string) {
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

export const getNameChip = (item: any, isUser: boolean, isItem: boolean) => {
  return (
    item.details?.fullName ||
    item.username ||
    item.email ||
    item.name ||
    item.primaryName ||
    (isUser ? renderFullName(item) : isItem ? item : 'Unknown')
  );
};

export const renderFullName = (item: any) => {
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

export const renderUserFullName = (data: any) => {
  const { details } = data;

  if (details && details.fullName) {
    return details.fullName;
  }

  if (data.email || data.username) {
    return data.email || data.username;
  }

  return 'Unknown';
};

export const regexRemoveTags = /(<([^>]+)>)/gi;

export const incomingBottom = { borderTopLeftRadius: 0, marginBottom: 10 };
export const incomingMiddle = {
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
};
export const incomingTop = { borderBottomLeftRadius: 0 };
export const incomingSolo = {
  borderBottomLeftRadius: 20,
  borderTopLeftRadius: 20,
  marginBottom: 10,
};

export const getCustomerBorder = (
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

export const outcomingBottom = { borderTopRightRadius: 0, marginBottom: 10 };
export const outcomingMiddle = {
  borderBottomRightRadius: 0,
  borderTopRightRadius: 0,
};
export const outcomingTop = { borderBottomRightRadius: 0 };
export const outcomingSolo = {
  borderBottomRightRadius: 20,
  borderTopRightRadius: 20,
  marginBottom: 10,
};

export const getUserBorder = (
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

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
