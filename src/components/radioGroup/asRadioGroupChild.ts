// import React, { Component } from 'react';
// import hoistStatics from 'hoist-non-react-statics';
// import RadioGroupContext from './RadioGroupContext';

// interface RadioGroupChildProps {
//   value?: string | number | boolean;
//   selected?: boolean;
// }

// type PropTypes = RadioGroupChildProps;

// export default function asRadioGroupChild(
//   WrappedComponent: React.ComponentType<any>
// ) {
//   class RadioGroupChild extends Component<PropTypes> {
//     static displayName: string | undefined;

//     render() {
//       const { value: buttonValue, selected } = this.props;
//       return (
//         <RadioGroupContext.Consumer>
//           {({ value, onValueChange }) => (
//             <WrappedComponent
//               {...this.props}
//               selectedValue={value}
//               selected={
//                 buttonValue !== undefined ? value === buttonValue : selected
//               }
//               onValueChange={onValueChange}
//             />
//           )}
//         </RadioGroupContext.Consumer>
//       );
//     }
//   }

//   hoistStatics(RadioGroupChild, WrappedComponent);
//   RadioGroupChild.displayName = WrappedComponent.displayName;

//   return RadioGroupChild as any;
// }
