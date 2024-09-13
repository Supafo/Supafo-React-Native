import {
  HelpScreenFirstItem,
  HelpScreenSecondItem,
  HelpScreenThirdItem,
} from '../../../assets/images';
import routes from '../../../navigation/routes';

export const helpScreenData = [
  {
    id: 1,
    title: 'Siparişlerim',
    icon: HelpScreenFirstItem,
    navigation: routes.MY_ORDERS,
    isNav: true,
    description:
      'Siparişlerin, uygulamada gösterilen belirtilen zaman dilimi içerisinde teslim alınması gerekir. Bu zaman dilimi içerisinde geldiyseniz ve mağazanız kapalıysa lütfen bizimle iletişime geçin',
    headerTitle: 'Siparişlerim',
  },
  {
    id: 2,
    title: 'Supafo Nasıl Çalışıyor?',
    icon: HelpScreenSecondItem,
    navigation: routes.ORDER_HELP_DETAIL,
    isNav: true,
    description: 'burası siparişlerim sayfası',
    headerTitle: 'Supafo Nasıl Çalışıyor?',
  },
  {
    id: 3,
    title: "Supafo'ya Katıl",
    icon: HelpScreenThirdItem,
    navigation: routes.JOIN_SUPAFO,
    isNav: true,
  },
];
