import React, { useState, type FC } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { atom, useAtom, useAtomValue } from "jotai";

import { Nav } from "~/components/Nav";

export const regionAtom = atom({
  latitude: 22,
  longitude: 123,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922,
});

export const pageAtom = atom({
  page: "src",
});
export const srcAtom = atom({
  latitude: 0,
  longitude: 0,
});
export const destAtom = atom({
  latitude: 0,
  longitude: 0,
});
// const CatImage: number = require("../cat.png");

type TravelItem = {
  id: string;
  time: string;
  src: string;
  dest: string;
  money: number;
  capacity: number;
  occupy: number;
  img: string;
  star: number;
};

type StarIconProps = {
  isActive: boolean;
};

const StarIcon: FC<StarIconProps> = (props) => {
  const { isActive } = props;
  const c = isActive ? "#FEC20C" : "#CCCCCC";
  return (
    <AntDesign name="star" size={16} backgroundColor="#FFFFFF" color={c} />
  );
};

type Props = {
  travel: TravelItem;
};

const Travel: FC<Props> = (props) => {
  const { travel } = props;
  return (
    <View className="h-40 flex-row">
      <View className="h-full w-32 items-center justify-center">
        <View>
          <Image
            className="h-20 w-20 rounded-full"
            source={{ uri: travel.img }}
          />
        </View>
        <View className="mt-1 flex-row">
          {new Array(5).fill(null).map((_, i) => (
            <StarIcon isActive={i < Math.round(travel.star)} />
          ))}
        </View>
      </View>

      <View className="my-3 w-12 items-center justify-around">
        <EvilIcons
          name="clock"
          size={28}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
        <SimpleLineIcons
          name="target"
          size={22}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
        <SimpleLineIcons
          name="location-pin"
          size={22}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
        <Ionicons
          name="wallet-outline"
          size={22}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
      </View>
      <View className="my-3 w-5/12 justify-around">
        <Text className="text-sm">{travel.time}</Text>
        <Text className="text-sm">{travel.src}</Text>
        <Text className="text-sm">{travel.dest}</Text>
        <Text className="text-sm">$ {travel.money}</Text>
      </View>
      <View className="ml-2 mt-28">
        <Text className="text-sm font-bold text-green-600">
          {travel.occupy}/{travel.capacity}
        </Text>
      </View>
    </View>
  );
};

const TRAVELS: TravelItem[] = [
  {
    id: "1",
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    capacity: 4,
    occupy: 3,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    star: 4,
  },
  {
    id: "2",
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    capacity: 5,
    occupy: 2,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    star: 4.5,
  },
  {
    id: "3",
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    capacity: 5,
    occupy: 2,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    star: 4.4,
  },
  {
    id: "4",
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    capacity: 5,
    occupy: 2,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    star: 5,
  },
  {
    id: "5",
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    capacity: 5,
    occupy: 2,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    star: 5,
  },
];

const MILLIS_PER_DAY = 1000 * 86400;

const SearchPage = () => {
  const [date, setDate] = useState(new Date(Date.now() + MILLIS_PER_DAY));
  const [, setPage] = useAtom(pageAtom);
  const [, setSrc] = useAtom(srcAtom);
  const [, setDest] = useAtom(destAtom);
  const src = useAtomValue(srcAtom);
  const dest = useAtomValue(destAtom);
  const router = useRouter();

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate == null) return;
    setDate(selectedDate);
  };

  const renderItem = ({ item }: { item: TravelItem }) => (
    <Travel travel={item} />
  );

  return (
    <View className="flex-1 bg-white">
      <View className="h-1/4 flex-row items-center bg-amber-400 pb-2 pt-12 shadow-sm shadow-gray-400">
        <View className="ml-6 mr-2 mt-7 h-full">
          <Link href="/home">
            <FontAwesome
              name="angle-left"
              size={32}
              backgroundColor="#FBBF24"
              color="#000000"
            />
          </Link>
        </View>
        <View className="ml-4 mr-4 mt-3 h-full items-center justify-around">
          <EvilIcons
            name="clock"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
          />
          <MaterialCommunityIcon
            name="target"
            size={26}
            backgroundColor="#FBBF24"
            color="#000000"
          />
          <MaterialIcons
            name="location-pin"
            size={28}
            backgroundColor="#FBBF24"
            color="#000000"
          />
        </View>
        <View className="mt-2 h-full items-center justify-around">
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <DateTimePicker
              testID="dateTimePicker"
              mode="datetime"
              value={date}
              onChange={onChange}
              display="default"
            />
          </View>
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <Text
              className="ml-3 text-sm"
              onPress={() => {
                setPage({ page: "src" });
                router.push("/set-location");
              }}
            >
              {src.latitude === 0 && src.longitude === 0
                ? "Press here to select location"
                : `緯度: ${src.latitude.toFixed(
                    4,
                  )}${"   "}經度: ${src?.longitude.toFixed(4)}`}
            </Text>
          </View>
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <Text
              className="ml-3 text-sm"
              onPress={() => {
                setPage({ page: "dest" });
                router.push("/set-location");
              }}
            >
              {dest.latitude === 0 && dest.longitude === 0
                ? "Press here to select location"
                : `緯度: ${dest.latitude.toFixed(
                    4,
                  )}${"   "}經度: ${dest?.longitude.toFixed(4)}`}
            </Text>
          </View>
        </View>
        <View className="ml-3 mr-2 mt-48 h-full">
          <MaterialIcons
            name="swap-vert"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
            onPress={() => {
              setSrc({
                latitude: dest.latitude,
                longitude: dest.longitude,
              });
              setDest({
                latitude: src.latitude,
                longitude: src.longitude,
              });
            }}
          />
        </View>
      </View>
      <SafeAreaView className="mt-2 flex-1">
        <FlatList
          data={TRAVELS}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </SafeAreaView>
      <Nav />
    </View>
  );
};

export default SearchPage;