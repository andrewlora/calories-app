import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PostImage = {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title?: string;
  url?: string;
};

export type RootStackParamList = {
  Home: undefined;
  Detail: PostImage;
  AddFood: undefined;
};

export type PostImageNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export type AddFoodModalProps = {
  visible: boolean;
  onClose: (shouldUpdate?: boolean) => void;
};

export type FormItemProps = {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export type Food = {
  calories: string;
  name: string;
  portion: string;
  date?: string;
};

export type TodayCaloriesProps = {
  total: number | string | undefined;
  consumed: number | string | undefined;
  remaining: number | string | undefined;
  percentage: number | undefined;
};

export type TodayFoodsProps = {
  foods: Food[];
};
