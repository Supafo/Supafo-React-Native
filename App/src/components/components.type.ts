import {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface ButtonType extends TouchableOpacityProps {
  rounded?: boolean;
  image?: ImageSourcePropType;
  variant?: 'light' | 'dark';
}

export interface InputType extends TextInputProps {
  rounded?: boolean;
  heading?: string;
  icon?: ImageSourcePropType;
  isPassword?: boolean;
}

export interface PhoneInputType extends TextInputProps {
  rounded?: boolean;
  heading?: string;
  icon?: ImageSourcePropType;
  onChangeNumber: (text: string) => {} | void;
}

export interface ScreenType extends ViewProps {
  header?: React.JSX.Element | React.JSX.Element[];
  children?: React.JSX.Element | React.JSX.Element[];
  scrollview?: boolean;
}

export interface DividerType {
  text: string;
}

export interface HeaderType {
  title: string;
  noBackButton?: boolean;
}

export interface ISettingOption {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export interface IOrderHistoryComp {
  datetime?: string;
  price?: number;
  orderStatus?: string;
  name?: string;
  more?: string;
  bagIcon?: any;
  rate?: string;
  again?: string;
  onPress?: () => void;
  moreIcon?: any;
  tick?: any;
  star?: any;
}
