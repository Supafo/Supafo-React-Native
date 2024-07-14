import ShoppingCartVector from '../assets/images/shopping_cart.png';
import LocationVector from '../assets/images/location.png';
import LockVector from '../assets/images/lock.png';
import HeadphoneVector from '../assets/images/headphone.png';
import ShoppingHomeVector from '../assets/images/shopping_home.png';
import HelpVector from '../assets/images/help.png';
import ChevronBackVector from '../assets/images/chevron_back.png';
import BagIconVector from '../assets/images/bag_icon.png';
import moreIconVector from '../assets/images/more_icon.png';
import tickVector from '../assets/images/tick.png';
import StarkVector from '../assets/images/star.png';
import {LocationIcon, LocationOrange} from '../assets/images';
import {colors} from '../theme/colors';

export interface IOptions {
  title: string;
  icon?: any;
  id: number;
  tintColor: string | null;
}

export const mocks: IOptions[] = [
  {
    title: 'Geçmiş Siparişlerim',
    // icon: ShoppingCartVector,
    id: 1,
    tintColor: colors.greenColor,
  },
  {
    title: 'Hesap Bilgilerim',
    // icon: LockVector,
    id: 3,
    tintColor: colors.greenColor,
  },
  {
    title: 'Müşteri Hizmetleri',
    // icon: HeadphoneVector,
    id: 4,
    tintColor: colors.greenColor,
  },
  {
    title: 'Mağaza Girişi',
    // icon: ShoppingCartVector,
    id: 5,
    tintColor: colors.greenColor,
  },
  {
    title: 'Destek',
    // icon: HelpVector,
    id: 6,
    tintColor: colors.greenColor,
  },
];

export const icons = {
  cart: ShoppingCartVector,
  location: LocationVector,
  lock: LockVector,
  headphone: HeadphoneVector,
  shoppingHome: ShoppingHomeVector,
  help: HelpVector,
  chevronBack: ChevronBackVector,
  bagIcon: BagIconVector,
  moreIcon: moreIconVector,
  tick: tickVector,
  star: StarkVector,
};
