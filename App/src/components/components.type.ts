import {
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {ImageSource} from 'react-native-vector-icons/Icon';

import {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {ImageSource} from 'react-native-vector-icons/Icon';

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
  text?: string;
}

export interface HeaderType {
  title?: string;
  noBackButton?: boolean;
}

export interface LocationInputType {
  title?: string;
  distance?: number;
}

export interface HeadingTextType {
  title?: string;
}

export interface DonateType {
  backgroundImage?: ImageSourcePropType;
  title: string;
  icon?: ImageSourcePropType;
  button: ButtonType;
  isAvailable: boolean;
  buttonTitle: string;
  onPress?: () => void;
}

export type BookStatusType = {
  status?: 'preparing' | 'completed' | 'delivered';
};

export interface CardType {
  count?: number;
  backgroundImage: ImageSourcePropType;
  heartIcon?: ImageSourcePropType;
  shareIcon?: ImageSourcePropType;
  restaurantLogo?: ImageSourcePropType;
  starIcon?: ImageSourcePropType;
  title: string;
  time?: string;
  rate?: number;
  distance?: number;
  price?: number;
  discountPrice?: number;
  isNew?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: 'large' | 'medium';
  onPress?: () => void;
  onHeartPress?: () => void;
  onSharePress?: () => void;
}

export interface ICardLarge {
  count?: number;
  price?: number;
  time?: string;
  distance?: number;
  url?: string;
}
