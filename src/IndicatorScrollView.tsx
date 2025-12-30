import React, { useRef, useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, Animated, ViewStyle, LayoutChangeEvent, StyleProp } from 'react-native';
export interface IndicatorScrollViewProps {
  children: React.ReactNode;
  trackWidth?: number;//指示器轨道总长度
  trackHeight?: number;
  trackColor?: string;
  thumbWidth?: number;//指示器初始长度
  thumbColor?: string;
  showIndicator?: boolean;
  style?: StyleProp<ViewStyle>;
  scrollMarginVertical?: number;
}
export const IndicatorScrollView: React.FC<IndicatorScrollViewProps> = ({
  children,
  trackWidth = 20,
  trackHeight = 4,
  trackColor = '#e2e2e2ff',
  thumbWidth = 8,
  thumbColor = '#f35c10ff',
  showIndicator = true,
  style,
  scrollMarginVertical = 10,
}) => {
  const trackStyle = useMemo<ViewStyle>(
    () => ({
      width: trackWidth,
      height: trackHeight,
      backgroundColor: trackColor,
      borderRadius: trackHeight / 2,
      overflow: "hidden",
      alignSelf: "center",
    }),
    [trackWidth, trackHeight, trackColor]
  );
  const thumbStyle = useMemo<ViewStyle>(
    () => ({
      width: thumbWidth,
      height: trackHeight,
      borderRadius: trackHeight / 2,
      backgroundColor: thumbColor,
    }),
    [thumbWidth, trackHeight, thumbColor]
  );
  const maxThumbMove = useMemo(() => Math.max(trackWidth - thumbWidth, 0), [trackWidth, thumbWidth]);
  const scrollX = useRef(new Animated.Value(0)).current
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const handleContentSizeChange = useCallback((width: number) => {
    setContentWidth(width);
  }, []);
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  }, []);
  const translateXValue = useMemo(
    () =>
      scrollX.interpolate({
        inputRange: [0, Math.max(contentWidth - layoutWidth, 1)],
        outputRange: [0, maxThumbMove],
        extrapolate: 'clamp',
      }),
    [scrollX, contentWidth, layoutWidth, maxThumbMove]
  );
  if (!children) return null;
  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView horizontal
        style={{ marginVertical: scrollMarginVertical }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={contentWidth > layoutWidth}
        onLayout={handleLayout}
        onContentSizeChange={(width:number) => handleContentSizeChange(width)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      >
        {children}
      </Animated.ScrollView>
      {showIndicator && contentWidth > layoutWidth && (
        <View style={trackStyle}>
          <Animated.View style={[thumbStyle, { transform: [{ translateX: translateXValue }] }]} />
        </View>
      )}
    </View>
  )
}
IndicatorScrollView.displayName = 'IndicatorScrollView';
const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});
