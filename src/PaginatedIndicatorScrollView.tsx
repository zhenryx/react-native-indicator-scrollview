import React, { useRef } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Dimensions,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';

const { width: screenwidth } = Dimensions.get('screen');
const menuWarpWidth = screenwidth / 5.5;
const menusExpendWidth = screenwidth / 5;
const menuItemHeight = 60;

export interface MenuItem {
  id: number;
  name: string;
  icon: any;
  href: string;
}

export interface PaginatedIndicatorScrollViewProps {
  data: MenuItem[]; // 菜单数据数组
  onItemPress?: (item: MenuItem) => void; // 点击回调
  firstPageCount?: number; // 第一页显示的数量，默认5
  containerStyle?: ViewStyle; // 容器样式
  pageStyle?: ViewStyle; // 页面样式
  itemStyle?: ViewStyle; // item样式
  menuIconStyle?: ImageStyle; // 菜单图标样式
  menuTextStyle?: TextStyle; // 菜单文字样式
  indicatorStyle?: ViewStyle; // 指示器容器样式
  trackStyle?: ViewStyle; // 指示器轨道样式
  trackLeftStyle?: ViewStyle; // 左侧指示器轨道样式
  trackRightStyle?: ViewStyle; // 右侧指示器轨道样式
  thumbStyle?: ViewStyle; // 指示器滑块样式
  thumbLeftStyle?: ViewStyle; // 左侧指示器滑块样式
  thumbRightStyle?: ViewStyle; // 右侧指示器滑块样式
  activeColor?: string; // 激活颜色
  inactiveColor?: string; // 非激活颜色
}

const MenuItemComponent: React.FC<{
  item: MenuItem;
  width: number;
  onPress?: (item: MenuItem) => void;
  itemStyle?: ViewStyle;
  menuIconStyle?: ImageStyle;
  menuTextStyle?: TextStyle;
}> = ({ item, width, onPress, itemStyle, menuIconStyle, menuTextStyle }) => {
  const handlePress = () => {
    onPress?.(item);
  };

  return (
    <Pressable style={[styles.menu, { width }, itemStyle]} onPress={handlePress}>
      <Image source={item.icon} style={[styles.menuIcon, menuIconStyle]} />
      <Text style={[styles.menuText, menuTextStyle]}>{item.name}</Text>
    </Pressable>
  );
};

export function PaginatedIndicatorScrollView({
  data,
  onItemPress,
  firstPageCount = 5,
  containerStyle,
  pageStyle,
  itemStyle,
  menuIconStyle,
  menuTextStyle,
  indicatorStyle,
  trackStyle,
  trackLeftStyle,
  trackRightStyle,
  thumbStyle,
  thumbLeftStyle,
  thumbRightStyle,
  activeColor = '#ce0707ff',
  inactiveColor = '#e2e2e2ff',
}: PaginatedIndicatorScrollViewProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const height = scrollX.interpolate({
    inputRange: [0, screenwidth],
    // 第一页的高度为菜单项高度，第二页的高度为菜单项高度加上2然后乘以第二页的菜单项数量，减去1是因为第一页已经占用了1个菜单项
    outputRange: [menuItemHeight, menuItemHeight * (Math.ceil(data.length / firstPageCount-1))],
  });
  // 过渡距离为屏幕宽度减去菜单项宽度的一半
  const transitionDistance = screenwidth - (screenwidth / 5.5 / 2);
  const indicator_1 = scrollX.interpolate({
    inputRange: [0, transitionDistance],
    outputRange: [activeColor, inactiveColor],
    extrapolate: 'clamp',
  });

  const indicator_2 = scrollX.interpolate({
    inputRange: [0, transitionDistance],
    outputRange: [inactiveColor, activeColor],
    extrapolate: 'clamp',
  });
  const firstPageData = data.slice(0, firstPageCount);
  const secondPageData = data.slice(firstPageCount);

  const firstPageWidth = screenwidth - (screenwidth / 5.5 / 2);
  const secondPageWidth = screenwidth;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        scrollEnabled={data.length > firstPageCount}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.mytools, { width: firstPageWidth }, pageStyle]}>
          {firstPageData.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              width={menuWarpWidth}
              onPress={onItemPress}
              itemStyle={itemStyle}
              menuIconStyle={menuIconStyle}
              menuTextStyle={menuTextStyle}
            />
          ))}
        </View>
        <Animated.View
          style={[
            styles.mytools,
            styles.expend,
            { width: secondPageWidth, height },
            pageStyle,
          ]}
        >
          {secondPageData.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              width={menusExpendWidth}
              onPress={onItemPress}
              itemStyle={itemStyle}
              menuIconStyle={menuIconStyle}
              menuTextStyle={menuTextStyle}
            />
          ))}
        </Animated.View>
      </ScrollView>
      <View style={[styles.indicator, indicatorStyle]}>
        <View style={[styles.track, styles.trackLeft, trackStyle, trackLeftStyle]}>
          <Animated.View
            style={[
              styles.thumb,
              styles.thumbLeft,
              thumbStyle,
              thumbLeftStyle,
              { backgroundColor: indicator_1 },
            ]}
          />
        </View>
        {
        data.length > firstPageCount && (
          <View style={[styles.track, styles.trackRight, trackStyle, trackRightStyle]}>
          <Animated.View
            style={[
              styles.thumb,
              styles.thumbRight,
              thumbStyle,
              thumbRightStyle,
              { backgroundColor: indicator_2 },
            ]}
          />
        </View>
        )
       }
      </View>
    </View>
  );
}
PaginatedIndicatorScrollView.displayName = 'PaginatedIndicatorScrollView';
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mytools: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  expend: {
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  menu: {
    height: menuItemHeight,
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#11181C',
  },
  indicator: {
    flexDirection: 'row',
    gap: 3,
    alignSelf: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#e2e2e2ff',
    borderRadius: 10,
    alignSelf: 'center',
  },
  trackLeft: {
    width: 8,
  },
  trackRight: {
    width: 13,
  },
  thumb: {
    height: 4,
    borderRadius: 10,
  },
  thumbLeft: {
    width: 8,
  },
  thumbRight: {
    width: 13,
  },
});

