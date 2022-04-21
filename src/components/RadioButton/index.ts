import RadioButtonComponent from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import { default as Button } from './RadioButton';
import RadioButtonItem from './RadioButtonItem';

const RadioButton = Object.assign(
  // @component ./RadioButton.tsx
  RadioButtonComponent,
  {
    // @component ./RadioButtonGroup.tsx
    Group: RadioButtonGroup,
    // @component ./RadioButtonAndroid.tsx
    Button: Button,
    // @component ./RadioButtonItem.tsx
    Item: RadioButtonItem,
  }
);

export default RadioButton;
