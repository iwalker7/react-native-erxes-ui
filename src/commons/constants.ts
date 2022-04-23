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
export const INTEGRATION_KINDS = {
  MESSENGER: 'messenger',
  FACEBOOK_MESSENGER: 'facebook-messenger',
  FACEBOOK_POST: 'facebook-post',
  GMAIL: 'gmail',
  NYLAS_GMAIL: 'nylas-gmail',
  NYLAS_IMAP: 'nylas-imap',
  NYLAS_OUTLOOK: 'nylas-outlook',
  NYLAS_EXCHANGE: 'nylas-exchange',
  NYLAS_OFFICE365: 'nylas-office365',
  NYLAS_YAHOO: 'nylas-yahoo',
  FORMS: 'lead',
  CALLPRO: 'callpro',
  TWITTER_DM: 'twitter-dm',
  CHATFUEL: 'chatfuel',
  SMOOCH_TELEGRAM: 'smooch-telegram',
  SMOOCH_VIBER: 'smooch-viber',
  SMOOCH_LINE: 'smooch-line',
  SMOOCH_TWILIO: 'smooch-twilio',
  WHATSAPP: 'whatsapp',
  TELNYX: 'telnyx',
  WEBHOOK: 'webhook',
  ALL: [
    { text: 'Messenger', value: 'messenger' },
    { text: 'Forms', value: 'lead' },
    {
      text: 'Facebook Messenger',
      value: 'facebook-messenger',
    },
    { text: 'Facebook Post', value: 'facebook-post' },
    { text: 'Gmail', value: 'gmail' },
    { text: 'Webhook', value: 'webhook' },
    { text: 'Callpro', value: 'callpro' },
    { text: 'Chatfuel', value: 'chatfuel' },

    { text: 'WhatsApp by Smooch', value: 'whatsapp' },
    { text: 'Telegram by Smooch', value: 'smooch-telegram' },
    { text: 'Viber by Smooch', value: 'smooch-viber' },
    { text: 'Line by Smooch', value: 'smooch-line' },
    { text: 'SMS Twilio by Smooch', value: 'smooch-twilio' },

    { text: 'IMAP by Nylas', value: 'nylas-imap' },
    { text: 'Gmail by Nylas', value: 'nylas-gmail' },
    { text: 'Office 365 by Nylas', value: 'nylas-office365' },
    { text: 'Microsoft Exchange by Nylas', value: 'nylas-exchange' },
    { text: 'Outlook by Nylas', value: 'nylas-outlook' },
    { text: 'Yahoo by Nylas', value: 'nylas-yahoo' },

    { text: 'SMS by Telnyx', value: 'telnyx' },
  ],
};

export const MEASUREMENTS = [
  { label: 'Bag BG', value: 'BG' },
  { label: 'Barrel BA', value: 'BA' },
  { label: 'Bolt BT', value: 'BT' },
  { label: 'Box BOX', value: 'BOX' },
  { label: 'Bunch BH', value: 'BH' },
  { label: 'Bundle BE', value: 'BE' },
  { label: 'Butt BU', value: 'BU' },
  { label: 'Canister CI', value: 'CI' },
  { label: 'Carton CT', value: 'CT' },
  { label: 'Case CS', value: 'CS' },
  { label: 'Centimeter CM', value: 'CM' },
  { label: 'Container CON', value: 'CON' },
  { label: 'Crate CR', value: 'CR' },
  { label: 'Cylinder CY', value: 'CY' },
  { label: 'Dozen DOZ', value: 'DOZ' },
  { label: 'Each/Number EA', value: 'EA' },
  { label: 'Envelope EN', value: 'EN' },
  { label: 'Foot FT', value: 'FT' },
  { label: 'Kilogram KG', value: 'KG' },
  { label: 'Kilograms KGS', value: 'KGS' },
  { label: 'Liter L', value: 'L' },
  { label: 'Man hour H', value: 'H' },
  { label: 'Meter M', value: 'M' },
  { label: 'Package PK', value: 'PK' },
  { label: 'Packet PA', value: 'PA' },
  { label: 'Pair PAR', value: 'PAR' },
  { label: 'Pairs PRS', value: 'PRS' },
  { label: 'Palexport const PAL', value: 'PAL' },
  { label: 'Piece PC', value: 'PC' },
  { label: 'Pieces PCS', value: 'PCS' },
  { label: 'Pound LB', value: 'LB' },
  { label: 'Proof Liter PF', value: 'PF' },
  { label: 'Roll ROL', value: 'ROL' },
  { label: 'Set SET', value: 'SET' },
  { label: 'Square Meter SME', value: 'SME' },
  { label: 'Square Yard SYD', value: 'SYD' },
  { label: 'Tube TU', value: 'TU' },
  { label: 'Yard YD', value: 'YD' },
];

export const CURRENCIES = [
  { value: 'AED', label: 'United Arab Emirates Dirham' },
  { value: 'AFN', label: 'Afghan Afghani' },
  { value: 'ALL', label: 'Albanian Lek' },
  { value: 'AMD', label: 'Armenian Dram' },
  { value: 'ANG', label: 'Netherlands Antillean Guilder' },
  { value: 'AOA', label: 'Angolan Kwanza' },
  { value: 'ARS', label: 'Argentine Peso' },
  { value: 'AUD', label: 'Australian Dollar' },
  { value: 'AWG', label: 'Aruban Florin' },
  { value: 'AZN', label: 'Azerbaijani Manat' },
  { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark' },
  { value: 'BBD', label: 'Barbadian Dollar' },
  { value: 'BDT', label: 'Bangladeshi Taka' },
  { value: 'BGN', label: 'Bulgarian Lev' },
  { value: 'BHD', label: 'Bahraini Dinar' },
  { value: 'BIF', label: 'Burundian Franc' },
  { value: 'BMD', label: 'Bermudan Dollar' },
  { value: 'BND', label: 'Brunei Dollar' },
  { value: 'BOB', label: 'Bolivian Boliviano' },
  { value: 'BRL', label: 'Brazilian Real' },
  { value: 'BSD', label: 'Bahamian Dollar' },
  { value: 'BTC', label: 'Bitcoin' },
  { value: 'BTN', label: 'Bhutanese Ngultrum' },
  { value: 'BWP', label: 'Botswanan Pula' },
  { value: 'BYN', label: 'Belarusian Ruble' },
  { value: 'BZD', label: 'Belize Dollar' },
  { value: 'CAD', label: 'Canadian Dollar' },
  { value: 'CDF', label: 'Congolese Franc' },
  { value: 'CHF', label: 'Swiss Franc' },
  { value: 'CLF', label: 'Chilean Unit of Account (UF)' },
  { value: 'CLP', label: 'Chilean Peso' },
  { value: 'CNH', label: 'Chinese Yuan (Offshore)' },
  { value: 'CNY', label: 'Chinese Yuan' },
  { value: 'COP', label: 'Colombian Peso' },
  { value: 'CRC', label: 'Costa Rican Colón' },
  { value: 'CUC', label: 'Cuban Convertible Peso' },
  { value: 'CUP', label: 'Cuban Peso' },
  { value: 'CVE', label: 'Cape Verdean Escudo' },
  { value: 'CZK', label: 'Czech Republic Koruna' },
  { value: 'DJF', label: 'Djiboutian Franc' },
  { value: 'DKK', label: 'Danish Krone' },
  { value: 'DOP', label: 'Dominican Peso' },
  { value: 'DZD', label: 'Algerian Dinar' },
  { value: 'EGP', label: 'Egyptian Pound' },
  { value: 'ERN', label: 'Eritrean Nakfa' },
  { value: 'ETB', label: 'Ethiopian Birr' },
  { value: 'EUR', label: 'Euro' },
  { value: 'FJD', label: 'Fijian Dollar' },
  { value: 'FKP', label: 'Falkland Islands Pound' },
  { value: 'GBP', label: 'British Pound Sterling' },
  { value: 'GEL', label: 'Georgian Lari' },
  { value: 'GGP', label: 'Guernsey Pound' },
  { value: 'GHS', label: 'Ghanaian Cedi' },
  { value: 'GIP', label: 'Gibraltar Pound' },
  { value: 'GMD', label: 'Gambian Dalasi' },
  { value: 'GNF', label: 'Guinean Franc' },
  { value: 'GTQ', label: 'Guatemalan Quetzal' },
  { value: 'GYD', label: 'Guyanaese Dollar' },
  { value: 'HKD', label: 'Hong Kong Dollar' },
  { value: 'HNL', label: 'Honduran Lempira' },
  { value: 'HRK', label: 'Croatian Kuna' },
  { value: 'HTG', label: 'Haitian Gourde' },
  { value: 'HUF', label: 'Hungarian Forint' },
  { value: 'IDR', label: 'Indonesian Rupiah' },
  { value: 'ILS', label: 'Israeli New Sheqel' },
  { value: 'IMP', label: 'Manx pound' },
  { value: 'INR', label: 'Indian Rupee' },
  { value: 'IQD', label: 'Iraqi Dinar' },
  { value: 'IRR', label: 'Iranian Rial' },
  { value: 'ISK', label: 'Icelandic Króna' },
  { value: 'JEP', label: 'Jersey Pound' },
  { value: 'JMD', label: 'Jamaican Dollar' },
  { value: 'JOD', label: 'Jordanian Dinar' },
  { value: 'JPY', label: 'Japanese Yen' },
  { value: 'KES', label: 'Kenyan Shilling' },
  { value: 'KGS', label: 'Kyrgystani Som' },
  { value: 'KHR', label: 'Cambodian Riel' },
  { value: 'KMF', label: 'Comorian Franc' },
  { value: 'KPW', label: 'North Korean Won' },
  { value: 'KRW', label: 'South Korean Won' },
  { value: 'KWD', label: 'Kuwaiti Dinar' },
  { value: 'KYD', label: 'Cayman Islands Dollar' },
  { value: 'KZT', label: 'Kazakhstani Tenge' },
  { value: 'LAK', label: 'Laotian Kip' },
  { value: 'LBP', label: 'Lebanese Pound' },
  { value: 'LKR', label: 'Sri Lankan Rupee' },
  { value: 'LRD', label: 'Liberian Dollar' },
  { value: 'LSL', label: 'Lesotho Loti' },
  { value: 'LYD', label: 'Libyan Dinar' },
  { value: 'MAD', label: 'Moroccan Dirham' },
  { value: 'MDL', label: 'Moldovan Leu' },
  { value: 'MGA', label: 'Malagasy Ariary' },
  { value: 'MKD', label: 'Macedonian Denar' },
  { value: 'MMK', label: 'Myanma Kyat' },
  { value: 'MNT', label: 'Mongolian Tugrik' },
  { value: 'MOP', label: 'Macanese Pataca' },
  { value: 'MRO', label: 'Mauritanian Ouguiya (pre-2018)' },
  { value: 'MRU', label: 'Mauritanian Ouguiya' },
  { value: 'MUR', label: 'Mauritian Rupee' },
  { value: 'MVR', label: 'Maldivian Rufiyaa' },
  { value: 'MWK', label: 'Malawian Kwacha' },
  { value: 'MXN', label: 'Mexican Peso' },
  { value: 'MYR', label: 'Malaysian Ringgit' },
  { value: 'MZN', label: 'Mozambican Metical' },
  { value: 'NAD', label: 'Namibian Dollar' },
  { value: 'NGN', label: 'Nigerian Naira' },
  { value: 'NIO', label: 'Nicaraguan Córdoba' },
  { value: 'NOK', label: 'Norwegian Krone' },
  { value: 'NPR', label: 'Nepalese Rupee' },
  { value: 'NZD', label: 'New Zealand Dollar' },
  { value: 'OMR', label: 'Omani Rial' },
  { value: 'PAB', label: 'Panamanian Balboa' },
  { value: 'PEN', label: 'Peruvian Nuevo Sol' },
  { value: 'PGK', label: 'Papua New Guinean Kina' },
  { value: 'PHP', label: 'Philippine Peso' },
  { value: 'PKR', label: 'Pakistani Rupee' },
  { value: 'PLN', label: 'Polish Zloty' },
  { value: 'PYG', label: 'Paraguayan Guarani' },
  { value: 'QAR', label: 'Qatari Rial' },
  { value: 'RON', label: 'Romanian Leu' },
  { value: 'RSD', label: 'Serbian Dinar' },
  { value: 'RUB', label: 'Russian Ruble' },
  { value: 'RWF', label: 'Rwandan Franc' },
  { value: 'SAR', label: 'Saudi Riyal' },
  { value: 'SBD', label: 'Solomon Islands Dollar' },
  { value: 'SCR', label: 'Seychellois Rupee' },
  { value: 'SDG', label: 'Sudanese Pound' },
  { value: 'SEK', label: 'Swedish Krona' },
  { value: 'SGD', label: 'Singapore Dollar' },
  { value: 'SHP', label: 'Saint Helena Pound' },
  { value: 'SLL', label: 'Sierra Leonean Leone' },
  { value: 'SOS', label: 'Somali Shilling' },
  { value: 'SRD', label: 'Surinamese Dollar' },
  { value: 'SSP', label: 'South Sudanese Pound' },
  { value: 'STD', label: 'São Tomé and Príncipe Dobra (pre-2018)' },
  { value: 'STN', label: 'São Tomé and Príncipe Dobra' },
  { value: 'SVC', label: 'Salvadoran Colón' },
  { value: 'SYP', label: 'Syrian Pound' },
  { value: 'SZL', label: 'Swazi Lilangeni' },
  { value: 'THB', label: 'Thai Baht' },
  { value: 'TJS', label: 'Tajikistani Somoni' },
  { value: 'TMT', label: 'Turkmenistani Manat' },
  { value: 'TND', label: 'Tunisian Dinar' },
  { value: 'TOP', label: "Tongan Pa'anga" },
  { value: 'TRY', label: 'Turkish Lira' },
  { value: 'TTD', label: 'Trinidad and Tobago Dollar' },
  { value: 'TWD', label: 'New Taiwan Dollar' },
  { value: 'TZS', label: 'Tanzanian Shilling' },
  { value: 'UAH', label: 'Ukrainian Hryvnia' },
  { value: 'UGX', label: 'Ugandan Shilling' },
  { value: 'USD', label: 'United States Dollar' },
  { value: 'UYU', label: 'Uruguayan Peso' },
  { value: 'UZS', label: 'Uzbekistan Som' },
  { value: 'VEF', label: 'Venezuelan Bolívar Fuerte' },
  { value: 'VND', label: 'Vietnamese Dong' },
  { value: 'VUV', label: 'Vanuatu Vatu' },
  { value: 'WST', label: 'Samoan Tala' },
  { value: 'XAF', label: 'CFA Franc BEAC' },
  { value: 'XAG', label: 'Silver Ounce' },
  { value: 'XAU', label: 'Gold Ounce' },
  { value: 'XCD', label: 'East Caribbean Dollar' },
  { value: 'XDR', label: 'Special Drawing Rights' },
  { value: 'XOF', label: 'CFA Franc BCEAO' },
  { value: 'XPD', label: 'Palladium Ounce' },
  { value: 'XPF', label: 'CFP Franc' },
  { value: 'XPT', label: 'Platinum Ounce' },
  { value: 'YER', label: 'Yemeni Rial' },
  { value: 'ZAR', label: 'South African Rand' },
  { value: 'ZMW', label: 'Zambian Kwacha' },
  { value: 'ZWL', label: 'Zimbabwean Dollar' },
];

export const DEFAULT_COMPANY_INDUSTRY_TYPES = [
  '',
  'Aerospace & Defense',
  'Air Freight & Logistics',
  'Airlines',
  'Auto Components',
  'Automobiles',
  'Banks',
  'Beverages',
  'Biotechnology',
  'Building Products',
  'Capital Markets',
  'Chemicals',
  'Commercial Services & Supplies',
  'Communications Equipment',
  'export construction & Engineering',
  'export construction Materials',
  'Consumer Finance',
  'Containers & Packaging',
  'Distributors',
  'Diversified Consumer Services',
  'Diversified Financial Services',
  'Diversified Telecommunication Services',
  'Electric Utilities',
  'Electrical Equipment',
  'Electronic Equipment, Instruments & Components',
  'Energy Equipment & Services',
  'Entertainment',
  'Equity Real Estate Investment Trusts (REITs)',
  'Food & Staples Retailing',
  'Food Products',
  'Gas Utilities',
  'Health Care Equipment & Supplies',
  'Health Care Providers & Services',
  'Health Care Technology',
  'Hotels, Restaurants & Leisure',
  'Household Durables',
  'Household Products',
  'Independent Power and Renewable Electricity Producers',
  'Industrial Conglomerates',
  'Insurance',
  'Interactive Media & Services',
  'Internet & Direct Marketing Retail',
  'IT Services',
  'Leisure Products',
  'Life Sciences Tools & Services',
  'Machinery',
  'Marine',
  'Media',
  'Metals & Mining',
  'Mortgage Real Estate Investment Trusts (REITs)',
  'Multi-Utilities',
  'Multiline Retail',
  'Oil, Gas & Consumable Fuels',
  'Paper & Forest Products',
  'Personal Products',
  'Pharmaceuticals',
  'Professional Services',
  'Real Estate Management & Development',
  'Road & Rail',
  'Semiconductors & Semiconductor Equipment',
  'Software',
  'Specialty Retail',
  'Technology Hardware, Storage & Peripherals',
  'Textiles, Apparel & luxury goods',
  'Thrifts & Mortgage Finance',
  'Tobacco',
  'Trading Companies & Distributors',
  'Transportation Infrastructure',
  'Water Utilities',
  'Wireless Telecommunication Services',
  'Transportation',
  'Mining',
  'Finance',
  'Group company',
  'Government',
  'Utility',
  'Education',
  'Manufacturing',
  'Communication',
  'Retail',
  'Health',
  'export construction',
  'Management',
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
