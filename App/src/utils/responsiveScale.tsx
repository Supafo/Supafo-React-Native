import {Dimensions, PixelRatio, Platform} from 'react-native'; 
const {width, height} = Dimensions.get('window');
const pixelDensity = PixelRatio.get();

//Base is considered as 5'' screen device
const isIOS = Platform.OS === 'ios';
const baseWidth = isIOS ? (width < 360 ? 360 : (width < 600 ? 375 : 400)) : (width < 360 ? 360 : (width < 600 ? 370 : 410));
const baseHeight = isIOS ? (height < 640 ? 640 : (height < 800 ? 720 : 800)) : (height < 640 ? 640 : (height < 800 ? 730 : 820));
const basePixelDensity = 2; // Standart yoğunluk 2x (mdpi)

const scale = size => (width / baseWidth) * size;

const verticalScale = size => (height / baseHeight) * size;

const moderateScale = (size, factor = 0.5) => {
    const scalingFactor = (width / baseWidth) * (pixelDensity / basePixelDensity);
    return size + (scale(size) - size) * factor * scalingFactor;}
export default {scale, verticalScale, moderateScale};

//Lastest patch = This utils only using  for margin, padding, fontSize .!!!!!!!!
// Instructions to use:
// 1. Scale is typically used for linear scaling meaning will return  straightforward adjusted scaled value. If you want to preserve the aspect ratio of a shape use this.For eg: Can be used for Images
// 2. Vertical Scale is used for vertical scaling typically used for height. If you want to scale your vertical dimensions but don't care about the aspect ratio then use this.
// 3. Moderate Scale is the best one to use for font sizes, margins, paddings etc. This has a scale factor that you can vary if is not adjusted according to design