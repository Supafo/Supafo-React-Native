import {
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  StyleProp,
  ViewStyle,
  ImageStyle
} from 'react-native';

export interface ButtonType extends TouchableOpacityProps {
  rounded?: boolean;
  image?: ImageSourcePropType;
  variant?: 'light' | 'dark';
}
export interface IAdressInfoComp {
  leftIcon: React.ReactNode;
  name: string;
  title: string;
}

export interface InputType extends TextInputProps {
  rounded?: boolean;
  heading?: string;
  icon?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  isPassword?: boolean;
  fontSize?: number;
  isSearchBar?: Boolean;
  user?: Boolean;
  width?: number;
}

export interface PhoneInputType extends TextInputProps {
  rounded?: boolean;
  fontSize?: number;
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
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
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
  status?: 'preparing' | 'completed' | 'delivered' | 'null';
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
  quantity: number;
  favoriteScreen: boolean;
}

export interface ICardLarge {
  count?: number;
  price?: number;
  time?: string;
  distance?: number;
  url?: string;
  favoriteScreen: boolean;
  discountPrice: string;
}

export interface ICardList {
  name: string;
  time: string;
  rate: number;
  distance: number;
  discountPrice: number;
  price: number;
  lastProduct: string;
  isNew: boolean;
  isFavorite: boolean;
  quantity: number;
}

export interface MemoizedMarkerType {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}
