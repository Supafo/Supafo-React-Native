import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import {useWindowDimensions} from 'react-native';
import { FlashList } from 'react-native-actions-sheet';
import responsiveScale from '../../../../../utils/responsiveScale';
import PhoneInput from '../../../../../components/PhoneInput';

const {scale, verticalScale, moderateScale} = responsiveScale;


const logoImages = {
  'Burger King': require('../../../../../assets/images/burger-king-logo.png'),
  "Mc Donald's": require('../../../../../assets/images/mc-dolands-logo.png'),
  'Little Caesars': require('../../../../../assets/images/littleceaser-logo.png'),
  "Arby's": require('../../../../../assets/images/arbys-logo.png'),
  'Popoyes': require('../../../../../assets/images/popoyes-logo.jpg'),
  'Maydonoz Döner': require('../../../../../assets/images/maydonoz-logo.png'),
  'Kardeşler Fırın': require('../../../../../assets/images/kardesler-fırın-logo.jpg'),
  'Simit Sarayı': require('../../../../../assets/images/simir-sarayı-logo.png'),
  'Simit Center': require('../../../../../assets/images/simit-center-logo.jpg'),
};
const CartItems = () => {

  const packageInfo = ['Vegan', 'Glutensiz',];

  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState();
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [logoSource, setLogoSource] = useState();
  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    if (!userId) {
      console.warn('User ID is not available yet');
      return;
    }
  
    try {
      const cartCollection = await firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .get();
      
      if (cartCollection.empty) {
        console.warn('No documents found in the collection.');
      }
  
      const documents: any = [];
      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });
  
      setItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const deleteItem = async (itemId: any) => {
    if (userId) {
      try {
        await firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .doc(itemId)
        .delete();
        await getDocuments();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  };

  const increaseQuantity = async (item: any) => {
    if (userId) {
      const newQuantity = item.quantity + 1;
      try {
        await firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .doc(item.id)
        .update({quantity: newQuantity});
        await getDocuments();
      
        {/*.then(() => {
          setItems(prevItems =>
            prevItems.map(prevItem =>
              prevItem.id === item.id
                ? {...prevItem, quantity: newQuantity}
                : prevItem,
            ),
          ); 
        }); */}
    }catch(error){
      console.error('Error increasing quantity:', error);
    }
  }
  };

  const decreaseQuantity = async (item: any) => {
    if (userId) {
      const newQuantity = item.quantity - 1;
      try {
        if (newQuantity === 0) {
          await deleteItem(item.id);  
        } else {
          await firestore()
            .collection(userId)
            .doc('cart')
            .collection('items')
            .doc(item.id)
            .update({quantity: newQuantity});
          await getDocuments();  
        }
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    }
  };

  const onRefresh = () => {
    setIsRefreshed(true);
    getDocuments();
    setTimeout(() => {
      setIsRefreshed(false);
    }, 1000);
  };

  useEffect(() => {
    getDocuments();
  }, [userId]);

  const contWidth = useWindowDimensions().width * 0.85;

  const rightButtons = [
    <TouchableOpacity
      style={styles.trashBtn}
      onPress={() => deleteItem(itemId)}>
      <Icon name={'trash-can-outline'} size={scale(20)} color={'white'} />
    </TouchableOpacity>,
  ];

  return (
    <View style={styles.main}>
      <FlashList
        data={items}
        style={{height: '67%'}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshed} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Swipeable
            onRightActionRelease={() => {
              setItemId(item.id);
            }}
            rightButtons={rightButtons}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.container, {width: contWidth}]}>
                <Image
                  source={logoImages[item.name]}
                  style = {styles.photoStyle}
                />
                <View style={styles.containerCardItems}>
                  <View style={{flexDirection:'row',}}>
                    <View style={{justifyContent:'flex-start'}}> 
                      <Text style={styles.nameText}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
                     <Text style={styles.detailText}>
                        Detaya Git 
                      </Text>
                      
                      <Icon style={styles.rightArrow} name={'arrow-right'} size={scale(11)} color={'#66AE7B'} />

                    </View>
                   
                   
                  </View>
                 
                  <Text style={styles.supriseText}>
                    Sürpriz Paket
                  </Text>
                  <View style={styles.packageInfoContainer}>
                     {packageInfo.map((item, index) => (
                    <Text key={index} style={styles.packageInfoText}>
                        {item}
                    </Text>
                    ))}
                  </View>
                  
                  <View style={styles.label}>
                    <View style={styles.quantityWrapper}>
                      <TouchableOpacity
                        style={styles.decreaseBtn}
                        onPress={() => decreaseQuantity(item)}>
                        <Icon name={'minus'} size={scale(12)} color={'white'} />
                      </TouchableOpacity>
                      <Text
                        style={styles.quantityText}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={styles.increaseBtn}
                        onPress={() => increaseQuantity(item)}>
                        <Icon name={'plus'} size={scale(12)} color={'white'} />
                      </TouchableOpacity>
                    </View>
                    <View>
                    <View
                      style={styles.containerPrevPrice}>
                      <Text
                        style={styles.prevPriceIcon}>
                        ₺
                      </Text>
                      <View style={styles.line}>
                        
                      </View>
                      <Text
                        style={styles.prevPriceText}>
                        {(item.price * item.quantity).toFixed(1)}
                      </Text>
                    </View>
                    <View
                      style={styles.containerCurrentPrice}>
                      <Text
                        style={styles.currentPriceIcon}>
                        ₺
                      </Text>
                      <Text
                        style={styles.currentPriceText}>
                        {(item.discountPrice * item.quantity).toFixed(1)}
                      </Text>
                    </View>
                    </View>
                   
                  </View>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  main: {
    margin: moderateScale(10),
    flex:1,
  },
  container: {
    margin: moderateScale(10),
    borderColor: '#66AE7B',
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(20),
    paddingTop: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '88%',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    top: moderateScale(3),
    gap: moderateScale(3.5)
  },
  trashBtn: {
    backgroundColor: '#FF9200',
    width: scale(60),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginEnd: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  increaseBtn: {
    padding: moderateScale(2),
    backgroundColor: '#66AE7B',
    borderRadius: moderateScale(100),
    marginLeft: moderateScale(8),
  },
  decreaseBtn: {
    padding: moderateScale(2),
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(100),
    marginVertical: verticalScale(6),
  },
  trashimg: {
    width: '100%',
    height: verticalScale(30),
    borderWidth:2,
    borderColor:'black'
  },
  photoStyle:{
    width: scale(63.5),
    height: verticalScale(52.5),
    borderRadius: moderateScale(999),
    marginBottom: moderateScale(10),

  },
  containerCardItems:{
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(2.5),
  },
  nameText:{
    fontSize: moderateScale(14),
    color: '#333333',
    padding: moderateScale(2),
  },
  detailText: {
    color:'#66AE7B',
    bottom: moderateScale(7.5),
    marginStart: moderateScale(62.5),
    fontSize:moderateScale(11)
  },
  rightArrow:{
    bottom: moderateScale(5),
    marginStart:moderateScale(5)
  },
  supriseText: {
    fontSize: moderateScale(10),
    padding: moderateScale(2),
    color: '#333333',
    opacity:0.7,
    bottom:moderateScale(2.5)
  },
  packageInfoContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(0),
    display: 'flex',
    gap: scale(5),
  },
  packageInfoText:{
    backgroundColor: '#66AE7B', 
    paddingHorizontal: moderateScale(3.5),
    paddingVertical: moderateScale(1),
    marginHorizontal: 0,
    borderRadius: moderateScale(20),
    color: 'white',
    fontSize: moderateScale(9),
  },
  quantityText:{
    fontSize: moderateScale(13),
    color: '#333333',
    marginLeft: moderateScale(8),
  },
  containerPrevPrice:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    bottom: moderateScale(-3),
  },
  prevPriceIcon:{
    fontSize: moderateScale(13),
    color: '#000000',
    opacity: 0.4,
    fontWeight: '500',
    bottom: moderateScale(3),
  },
  line:{
    position:'absolute',
    transform: [{ rotate: '166.81deg' }],
    width:moderateScale(34),
    borderWidth: scale(1),
    backgroundColor:'#4CAF50',
    opacity: 0.8,
    borderColor: '#4CAF50',
    borderRadius: moderateScale(20),
    left:moderateScale(8),
    bottom:moderateScale(10)
  },
  prevPriceText:{
    fontSize: moderateScale(13),
    color: '#333333',
    opacity:0.5,
    fontWeight: '500',
    marginLeft: moderateScale(2),
    bottom: moderateScale(3),  
  },
  containerCurrentPrice:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScale(7.5),
    bottom: moderateScale(5),
    marginEnd: moderateScale(5.5),
  },
  currentPriceIcon:{
    fontSize: moderateScale(17),
    color: '#000000',
    fontWeight: '500',
  },
  currentPriceText:{
    fontSize: moderateScale(18),
    color: '#333333',
    fontWeight: '500',
    marginLeft: moderateScale(2),
  },
  

});
