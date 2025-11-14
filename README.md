# IndicatorScrollView

一个带有滚动指示器的 React Native 横向 `ScrollView` 组件。

## 安装

```bash
npm install react-native-indicator-scrollview
```

## 使用示例

```tsx
import { IndicatorScrollView } from 'react-native-indicator-scrollview';
import { View, Text } from 'react-native';

export default function Demo() {
  return (
    <IndicatorScrollView trackWidth={40} thumbWidth={12}>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} style={{ padding: 16 }}>
            <Text>{`Item ${index + 1}`}</Text>
          </View>
        ))}
      </View>
    </IndicatorScrollView>
  );
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `trackWidth` | `number` | `20` | 指示器轨道宽度（水平长度） |
| `trackHeight` | `number` | `4` | 指示器轨道高度 |
| `trackColor` | `string` | `#e2e2e2ff` | 指示器轨道颜色 |
| `thumbWidth` | `number` | `8` | 指示器滑块宽度 |
| `thumbColor` | `string` | `#f35c10ff` | 指示器滑块颜色 |
| `showIndicator` | `boolean` | `true` | 是否显示指示器 |
| `style` | `StyleProp<ViewStyle>` | - | 外层容器样式 |
| `scrollMarginVertical` | `number` | `10` | 滚动区域的上下外边距 |


## 许可证

ISC © zhenryx

