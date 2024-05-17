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

export interface IOptions {
  title: string;
  icon?: any;
  id: number;
}

export const mocks: IOptions[] = [
  {
    title: 'Geçmiş Siparişlerim',
    icon: ShoppingCartVector,
    id: 1,
  },
  {
    title: 'Adres Bilgilerim',
    icon: LocationOrange,
    id: 2,
  },
  {
    title: 'Hesap Bilgilerim',
    icon: LockVector,
    id: 3,
  },
  {
    title: 'Müşteri Hizmetleri',
    icon: HeadphoneVector,
    id: 4,
  },
  {
    title: 'Mağaza Girişi',
    icon: ShoppingCartVector,
    id: 5,
  },
  {
    title: 'Destek',
    icon: HelpVector,
    id: 6,
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
