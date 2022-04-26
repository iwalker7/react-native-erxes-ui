import {
  Platform,
  Dimensions,
  NativeModules,
  I18nManager,
  AccessibilityInfo,
  AccessibilityChangeEvent,
} from 'react-native';

export enum orientations {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export const PERPAGE = 10;
export const PERPAGE20 = 20;

export const DURATION_SHORT = 1500;
export const DURATION_MEDIUM = 2500;
export const DURATION_LONG = 5000;
export const DURATION_INFINITY = Number.NEGATIVE_INFINITY;

export const REMINDER_MINUTES = [
  { _id: '0', name: 'At Time of Due Date' },
  { _id: '5', name: '5 Minutes Before' },
  { _id: '10', name: '10 Minutes Before' },
  { _id: '15', name: '15 Minutes Before' },
  { _id: '60', name: '1 Hour Before' },
  { _id: '120', name: '2 Hour Before' },
  { _id: '1440', name: '1 Day Before' },
  { _id: '2880', name: '2 Day Before' },
];

const isAndroid: boolean = Platform.OS === 'android';
const isIOS: boolean = Platform.OS === 'ios';

let isTablet: boolean;
let statusBarHeight: number;
let screenHeight: number = Dimensions.get('screen').height;
let screenWidth: number = Dimensions.get('screen').width;
let windowHeight: number = Dimensions.get('window').height;
let windowWidth: number = Dimensions.get('window').width;

isTablet = getAspectRatio() < 1.6 && Math.max(screenWidth, screenHeight) >= 900;

function setStatusBarHeight() {
  const { StatusBarManager } = NativeModules;
  statusBarHeight = StatusBarManager?.HEIGHT || 0;
}

function getAspectRatio() {
  return screenWidth < screenHeight
    ? screenHeight / screenWidth
    : screenWidth / screenHeight;
}

function getOrientation(height: number, width: number) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}

export function updateConstants(dimensions: any) {
  screenHeight = dimensions.screen.height;
  screenWidth = dimensions.screen.width;
  windowWidth = dimensions.window.width;
  windowHeight = dimensions.window.height;

  setStatusBarHeight();
}

const accessibility = {
  isScreenReaderEnabled: false,
};

function handleScreenReaderChanged(
  isScreenReaderEnabled: AccessibilityChangeEvent
) {
  accessibility.isScreenReaderEnabled = isScreenReaderEnabled as boolean;
}

AccessibilityInfo.addEventListener(
  'screenReaderChanged',
  handleScreenReaderChanged
);

function setAccessibility() {
  AccessibilityInfo.isScreenReaderEnabled().then((isScreenReaderEnabled) => {
    accessibility.isScreenReaderEnabled = isScreenReaderEnabled;
  });
}

setAccessibility();

const constants = {
  /* Platform */
  orientations,
  isAndroid,
  isIOS,
  getAndroidVersion: () => {
    return isAndroid ? parseInt(Platform.Version as string, 10) : undefined;
  },
  /* Navigation */
  get statusBarHeight() {
    return statusBarHeight;
  },
  /* Layout */
  isRTL: I18nManager.isRTL,
  get orientation() {
    return getOrientation(windowHeight, windowWidth);
  },
  get isLandscape() {
    return getOrientation(windowHeight, windowWidth) === orientations.LANDSCAPE;
  },
  get screenWidth() {
    return screenWidth;
  },
  get screenHeight() {
    return screenHeight;
  },
  get windowWidth() {
    return windowWidth;
  },
  get windowHeight() {
    return windowHeight;
  },
  get isSmallScreen() {
    return screenWidth <= 340;
  },
  get isShortScreen() {
    return screenHeight <= 600;
  },
  get screenAspectRatio() {
    return getAspectRatio();
  },
  get isTablet() {
    return isTablet;
  },
  set isTablet(value: boolean) {
    isTablet = value;
  },
  get isWideScreen() {
    return isTablet || this.isLandscape;
  },
  getSafeAreaInsets: () => {
    const orientation = getOrientation(screenHeight, screenWidth);
    return orientation === orientations.LANDSCAPE
      ? { left: 44, right: 44, bottom: 24, top: 0 }
      : { left: 0, right: 0, bottom: 34, top: 44 };
  },
  /* Devices */
  get isIphoneX() {
    return (
      isIOS &&
      //@ts-ignore
      !Platform.isPad &&
      //@ts-ignore
      !Platform.isTVOS &&
      (screenHeight >= 812 || screenWidth >= 812)
    );
  },
  /* Orientation */
  addDimensionsEventListener: (callback: any) => {
    return Dimensions.addEventListener('change', callback);
  },
  /* Dimensions */
  removeDimensionsEventListener: (callback: any) => {
    if (callback.remove) {
      callback.remove();
    } else {
      Dimensions.removeEventListener('change', callback);
    }
  },
  /* Accessibility */
  get accessibility() {
    return accessibility;
  },
  /* Keyboard */
  backspaceKey: 'Backspace',
  enterKey: 'Enter',
};

setStatusBarHeight();
Dimensions.addEventListener('change', updateConstants);

export default constants;
