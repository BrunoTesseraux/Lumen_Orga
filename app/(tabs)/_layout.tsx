import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useAuth } from '@/lib/AuthContext';

const _Layout = () => {
    const {session} = useAuth();
    //@ts-ignore
    return !session ? <Redirect href="/signin" /> : <Tabs screenOptions={{headerShown: false}}/>
};

export default _Layout;