import React from 'react';
import { View, Image, Text } from 'react-native';
const Items: React.FC = () => {
  const testList = [
    { iconUrl: require('@/assets/images/test/1.png'), name: '工具箱' },
    { iconUrl: require('@/assets/images/test/2.png'), name: '航海指南' },
    { iconUrl: require('@/assets/images/test/3.png'), name: '星际任务' },
    { iconUrl: require('@/assets/images/test/4.png'), name: '知识宇宙' },
    { iconUrl: require('@/assets/images/test/5.png'), name: '创意工坊' },
    { iconUrl: require('@/assets/images/test/6.png'), name: '心灵花园' },
    { iconUrl: require('@/assets/images/test/7.png'), name: '星际任务' },
    { iconUrl: require('@/assets/images/test/8.png'), name: '创意工坊' },
    { iconUrl: require('@/assets/images/test/9.png'), name: '心灵花园' },
    { iconUrl: require('@/assets/images/test/10.png'), name: '创意工坊' },
  ];
  return (
    <>
      {testList.map((item, index) => (
        <View key={index} style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Image source={item.iconUrl} style={{ width: 30, height: 30 }} />
          <Text style={{ fontSize: 12, color: '#333', marginTop: 8 }}>
            {item.name}
          </Text>
        </View>
      ))}
    </>
  )
}