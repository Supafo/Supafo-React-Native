import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../../theme/colors';
import {RouteProp, useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../../../navigation/routes';
import firestore from '@react-native-firebase/firestore';

type RatingProp = RouteProp<RootStackParamList, 'RATINGS'>;

type Props = {
  route: RatingProp;
};

const Rating = ({route}: Props) => {
  const [star, setStar] = useState(0);
  const [input, setInput] = useState('');

  const navigation = useNavigation();
  const item = route.params.item;

  const postComment = async () => {
    try {
      await firestore()
        .collection('homeItems')
        .doc('homeList')
        .collection('items')
        .doc(item.id)
        .collection('reviews')
        .add({
          rating: star,
          comment: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      navigation.navigate(routes.CONGRATS, {item: item});
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Değerlendirmeler ve Yorumlar" />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Puan verin ve yorum yazın</Text>
        <Text style={styles.txt}>
          Diğer kullanıcılara yardımcı olmak için deneyimizi paylaşın
        </Text>
      </View>
      <View style={{margin: 20}}>
        <Stars
          half={false}
          default={0}
          update={(val: number) => {
            setStar(val);
          }}
          spacing={20}
          starSize={40}
          count={5}
          fullStar={
            <FontAwesome name="star" size={40} color={colors.openOrange} />
          }
          emptyStar={<FontAwesome name="star-o" size={40} color={'#333333'} />}
        />
      </View>
      <View style={styles.labelWrapper}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#000000',
            paddingStart: 10,
          }}>
          Yorum Ekle
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={txt => setInput(txt)}
          placeholder="Kişisel deneyiminizi paylaşın"
          numberOfLines={5}
          multiline
        />
        <Text
          style={{
            textAlign: 'right',
            paddingEnd: 10,
            color: '#000000',
            paddingTop: 10,
          }}>
          {input.length}/500
        </Text>
      </View>
      <TouchableOpacity
        disabled={input.length == 0 ? true : false}
        style={[
          styles.btn,
          {
            opacity: input.length > 0 ? 1 : 0.6,
          },
        ]}
        onPress={postComment}>
        <Text style={styles.btnTxt}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  titleWrapper: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    padding: 5,
  },
  txt: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
    width: '65%',
  },
  labelWrapper: {
    margin: 20,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderColor: colors.greenColor,
    borderWidth: 1,
    height: '40%',
    borderRadius: 15,
    paddingStart: 15,
    marginTop: 20,
    color: '#000000',
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  btnTxt: {
    padding: 10,
    fontSize: 18,
    width: '90%',
    borderRadius: 20,
    backgroundColor: colors.greenColor,
    color: 'white',
    textAlign: 'center',
  },
});
