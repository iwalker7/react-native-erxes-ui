import { PermissionsAndroid } from 'react-native';
import type {
  NativeEventSubscription,
  EmitterSubscription,
} from 'react-native';
import moment from 'moment';
import { Colors } from 'react-native-erxes-ui';

export function addEventListener<
  T extends {
    addEventListener: (
      ...args: any
    ) => NativeEventSubscription | EmitterSubscription;
    removeEventListener: (...args: any) => void;
  }
>(Module: T, ...rest: Parameters<typeof Module.addEventListener>) {
  const [eventName, handler] = rest;

  let removed = false;

  const subscription = Module.addEventListener(eventName, handler) ?? {
    remove: () => {
      if (removed) {
        return;
      }

      Module.removeEventListener(eventName, handler);
      removed = true;
    },
  };

  return subscription;
}
export function addListener<
  T extends {
    addListener: (...args: any) => EmitterSubscription;
    removeEventListener: (...args: any) => void;
  }
>(Module: T, ...rest: Parameters<typeof Module.addListener>) {
  const [eventName, handler] = rest;

  let removed = false;

  const subscription = Module.addListener(eventName, handler) ?? {
    remove: () => {
      if (removed) {
        return;
      }

      Module.removeEventListener(eventName, handler);
      removed = true;
    },
  };

  return subscription;
}

//native
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
  conversationMessages: any[],
  position: number
) => {
  if (conversationMessages === undefined) return {};
  if (position > 0) {
    if (!conversationMessages[position - 1]?.customerId) {
      if (position + 1 < conversationMessages.length) {
        if (conversationMessages[position + 1]?.customerId) {
          if (conversationMessages[position + 1]?.botData) {
            return incomingSolo;
          }
          return incomingBottom;
        } else {
          return incomingSolo;
        }
      } else {
        return incomingSolo;
      }
    } else if (position + 1 < conversationMessages.length) {
      if (conversationMessages[position + 1]?.customerId) {
        if (conversationMessages[position - 1]?.botData) {
          if (conversationMessages[position + 1]?.botData) {
            return incomingSolo;
          }
          return incomingBottom;
        } else {
          if (conversationMessages[position + 1]?.botData) {
            return incomingTop;
          }
          return incomingMiddle;
        }
      } else if (conversationMessages[position - 1]?.botData) {
        return incomingSolo;
      } else {
        return incomingTop;
      }
    } else {
      if (conversationMessages[position - 1]?.botData) {
        return incomingSolo;
      }
      return incomingBottom;
    }
  } else if (position + 1 < conversationMessages.length) {
    if (conversationMessages[position + 1]?.customerId) {
      if (conversationMessages[position + 1]?.botData) {
        return incomingSolo;
      }
      return incomingTop;
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
const outcomingSolo = {
  borderBottomRightRadius: 20,
  borderTopRightRadius: 20,
  marginBottom: 10,
};

export const getUserBorder = (
  conversationMessages: any[],
  position: number
) => {
  if (conversationMessages === undefined) return outcomingSolo;
  if (position > 0) {
    if (!conversationMessages[position - 1]?.customerId) {
      if (
        conversationMessages[position]?.userId !==
        conversationMessages[position - 1]?.userId
      ) {
        if (position + 1 < conversationMessages.length) {
          if (!conversationMessages[position + 1]?.customerId) {
            if (
              conversationMessages[position]?.userId !==
              conversationMessages[position + 1]?.userId
            ) {
              return outcomingSolo;
            } else {
              return outcomingBottom;
            }
          } else {
            return outcomingSolo;
          }
        } else {
          return outcomingSolo;
        }
      } else {
        if (position + 1 < conversationMessages.length) {
          if (!conversationMessages[position + 1]?.customerId) {
            if (
              conversationMessages[position]?.userId !==
              conversationMessages[position + 1]?.userId
            ) {
              return outcomingTop;
            } else {
              return outcomingMiddle;
            }
          } else {
            return outcomingTop;
          }
        } else {
          return outcomingTop;
        }
      }
    } else if (position + 1 < conversationMessages.length) {
      if (!conversationMessages[position + 1]?.customerId) {
        if (
          conversationMessages[position]?.userId !==
          conversationMessages[position + 1]?.userId
        ) {
          return outcomingSolo;
        } else {
          return outcomingBottom;
        }
      } else {
        return outcomingSolo;
      }
    } else {
      return outcomingSolo;
    }
  } else if (position + 1 < conversationMessages.length) {
    if (!conversationMessages[position + 1]?.customerId) {
      if (
        conversationMessages[position]?.userId !==
        conversationMessages[position + 1]?.userId
      ) {
        return outcomingSolo;
      } else {
        return outcomingBottom;
      }
    } else {
      return outcomingSolo;
    }
  } else {
    return outcomingSolo;
  }
};

//user related
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

export const getAttachmentIconColor = (type: any) => {
  switch (type) {
    case 'doc':
      return Colors.blue400;
    case 'docx':
      return Colors.blue400;
    case 'ppt':
      return Colors.orange800;
    case 'pptx':
      return Colors.orange800;
    case 'xlsx':
      return Colors.green500;
    case 'xls':
      return Colors.green500;
    case 'pdf':
      return Colors.red900;
    default:
      return '#673FBD';
  }
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
export const getNameUser = (item: any) => {
  return (
    item?.userDetail?.details?.fullName ||
    item?.details?.fullName ||
    item?.username ||
    item?.email ||
    'Unknown'
  );
};

//file
export const getAttachmentUrl = (apiUrl: string, value: string) => {
  if (value && !value.includes('http')) {
    return `${apiUrl}/read-file?key=` + value;
  }
  return value;
};

export const readFile = (apiUrl: any, value: any) => {
  if (!value) {
    return null;
  }
  if (value.includes('http')) {
    return value;
  }
  return `${apiUrl}/read-file?key=${value}`;
};

//integration
export const isSupportedKindInbox = (kind: string) => {
  return (
    kind === 'messenger' ||
    kind === 'facebook-messenger' ||
    kind === 'messfacebook-postenger' ||
    kind === 'lead' ||
    kind === 'nylas-imap' ||
    kind === 'callpro'
  );
};

// array
export const shuffleArray = (arr: any[]) => arr.sort(() => 0.5 - Math.random());
export const removeDuplicates = (arr: any[]) => [...new Set(arr)];
export const isNotEmptyArray = (arr: any[]) =>
  Array.isArray(arr) && arr.length > 0;

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

//common
export const generateRandomKey = (len: number) => {
  var rdmString = '';
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random().toString(36).substr(2)
  );
  return rdmString.substr(0, len);
};

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isValidURL2 = (str: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

export const isEmptyString = (str: any) => {
  return (
    str === undefined ||
    str === 'undefined' ||
    str === null ||
    str === 'null' ||
    str.trim() === ''
  );
};
export const isDate = (checkDate: any) => {
  const date = moment(checkDate);
  return date.isValid() ? new Date(checkDate) : undefined;
};
export const dayDif = (
  date1: { getTime: () => number },
  date2: { getTime: () => number }
) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

export const fixedJson = (jsonStr: string) => {
  let fixedStr = jsonStr
    // Replace ":" with "@colon@" if it's between double-quotes
    .replace(/:\s*"([^"]*)"/g, function (_match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })

    // Replace ":" with "@colon@" if it's between single-quotes
    .replace(/:\s*'([^']*)'/g, function (_match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })

    // Add double-quotes around any tokens before the remaining ":"
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

    // Turn "@colon@" back into ":"
    .replace(/@colon@/g, ':');

  let lastIndexIll = fixedStr.lastIndexOf('",') + 1;
  let constlastIndexIll = lastIndexIll;
  while (lastIndexIll < fixedStr.length) {
    if (fixedStr.charAt(lastIndexIll) === '"') break;
    if (fixedStr.charAt(lastIndexIll) === '}') {
      fixedStr =
        fixedStr.slice(0, constlastIndexIll) +
        fixedStr.slice(constlastIndexIll + 1);
      break;
    }
    lastIndexIll++;
  }
  return fixedStr;
};
