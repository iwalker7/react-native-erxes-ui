import ScreenUtils from '../utils/screenUtils';

const isIOS = ScreenUtils.isIOS;

const BorderRadius = {
  br0: isIOS ? 0 : 0,
  br10: isIOS ? 3 : 2,
  br20: 6,
  br30: isIOS ? 9 : 8,
  br40: 12,
  br50: isIOS ? 15 : 16,
  br60: 20,
  br100: 999,
};
export default BorderRadius;
