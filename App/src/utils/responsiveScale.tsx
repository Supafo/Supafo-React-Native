import {Dimensions} from 'react-native'; 
const {width, height} = Dimensions.get('window');
//Base is considered as 5'' screen device
const baseWidth = 350;
const baseHeight = 680;
const scale = size => (width / baseWidth) * size;
const verticalScale = size => (height / baseHeight) * size;
const moderateScale = (size, factor = 0.3) => size + (scale(size) - size) * factor;
export default {scale, verticalScale, moderateScale};

// Instructions to use:
// 1. Scale is typically used for linear scaling meaning will return  straightforward adjusted scaled value. If you want to preserve the aspect ratio of a shape use this.For eg: Can be used for Images
// 2. Vertical Scale is used for vertical scaling typically used for height. If you want to scale your vertical dimensions but don't care about the aspect ratio then use this.
// 3. Moderate Scale is the best one to use for font sizes, margins, paddings etc. This has a scale factor that you can vary if is not adjusted according to design