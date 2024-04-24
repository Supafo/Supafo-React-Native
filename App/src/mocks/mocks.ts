import ShoppingCartVector from '../assets/images/shopping_cart.png';
import LocationVector from '../assets/images/location.png';
import LockVector from '../assets/images/lock.png';
import HeadphoneVector from '../assets/images/headphone.png';
import ShoppingHomeVector from '../assets/images/shopping_home.png';
import HelpVector from '../assets/images/help.png';
import ChevronBackVector from '../assets/images/chevron_back.png';
import BagIconVector from '../assets/images/bag_icon.png';
import moreIconVector from '../assets/images/more_icon.png';

export interface IOptions {
  title: string;
  icon?: any;
}

export const mocks: IOptions[] = [
  {
    title: 'Geçmiş Siparişlerim',
    icon: ShoppingCartVector,
  },
  {
    title: 'Adres Bilgilerim',
    icon: LocationVector,
  },
  {
    title: 'Hesap Bilgilerim',
    icon: LockVector,
  },
  {
    title: 'Müşteri Hizmetleri',
    icon: HeadphoneVector,
  },
  {
    title: 'Mağaza Girişi',
    icon: ShoppingCartVector,
  },
  {
    title: 'Destek',
    icon: HelpVector,
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
};
