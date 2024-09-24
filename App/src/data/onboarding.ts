import {
  Onboarding1Image,
  Onboarding2Image,
  Onboarding3Image,
  Onboarding4Image,
} from '../assets/images';

interface IRestaurant {
  count?: number;
  price?: number;
  time?: string;
  distance?: number;
  url: string;
}

export const ONBOARING_DATA = [
  {
    id: 1,
    image: Onboarding1Image,
    text: 'Kolayca üye olup Supafo’nun bir parçası olmaya hazır mısın? En uygun ürünleri takip ederek çevredeki sürprizleri kazan!'
  },
  {
    id: 2,
    image: Onboarding2Image,
    text: 'Siparişlerim kısmında yer alan sana özel QR kod ile restorana gidebilir,',
  },
  {
    id: 3,
    image: Onboarding3Image,
    text: 'Seçmiş olduğun süpriz paketini QR kodun ile kolayca teslim alabilirsin. Afiyet olsun :)'
  },
  {
    id: 4,
    image: Onboarding4Image,
    text: 'Hem israfı önleyip hem de sipariş verdiğin ürünlerin teslimini almaya giderek çevre dostu yaşam tarzını kazandığın için seni tebrik ediyoruz.',
  },
];

export const restaurants: IRestaurant[] = [
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 5,
    price: 119.9,
    time: '06:00-07:00',
    distance: 2.9,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 4,
    price: 119.9,
    time: '11:00-12:00',
    distance: 4,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 3,
    price: 119.9,
    time: '13:00-14:00',
    distance: 4.9,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 2,
    price: 119.9,
    time: '15:00-16:00',
    distance: 3,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 6,
    price: 119.9,
    time: '09:00-10:00',
    distance: 1.9,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 3,
    price: 119.9,
    time: '13:00-14:00',
    distance: 4.9,
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/39df/c800/539e29a031d15c70072bc8a085217e5a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Md5yS~YBAy9YBaDH8w3qyCDyet6LJb2tbnQLX7qqUMDZwF74iCPcBd47Rd-KVoDYAAWmGaWYYa7yeaT6lVjuiGT~UuL6hn8BoDd1ljPxIQzgTSge8KEnn0I31zmUorIL0FjIU1Y0BtOxzh5h~ctGhZeC2zWJ2mtQTDO6OkJ6xIFe8hLU4XyDj4hMTc-RCUTEacsTaq5VqdZo93ueguMIznLN2pQCuaQ3wf8WVbKsAgPYiHQvPUyj4NQBL5KwS2PAYhxHCBm4jDwJUnnN1y7CQIpU~LZkATZjtxZPAAukwMd9l43CnlSoEZDB9SJHhzKAVQbS2g1DkPSg~oDSiI6FGA__',
    count: 3,
    price: 119.9,
    time: '13:00-14:00',
    distance: 4.9,
  },
];
