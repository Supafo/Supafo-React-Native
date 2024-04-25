import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

export interface OnboardingScreenComponentType {
  swiperRef: any;
  setSwipeIndex: (index: number) => {} | void;
  navigation: NavigationProp<RootStackParamList>;
  isLastIndex: boolean;
  isStartIndex: boolean;
}
