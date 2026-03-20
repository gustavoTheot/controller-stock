// components/ui/ToastConfig.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react-native';

import { Text } from './text';
import Toast from 'react-native-toast-message';

interface CustomBaseProps {
  icon: React.ReactNode;
  color: string;
  title?: string;
  message?: string;
}

const BaseToast = ({ icon, color, title, message }: CustomBaseProps) => (
  <View className="w-[95%] flex-row items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
    <View className={`absolute bottom-3 left-0 top-3 w-1 rounded-full ${color}`} />

    <View
      className={`ml-1 h-10 w-10 items-center justify-center rounded-xl ${color.replace('bg-', 'bg-').replace('600', '100')}`}
    >
      {icon}
    </View>

    <View className="flex-1 px-3.5">
      <Text className="text-base font-bold leading-tight text-slate-950">{title}</Text>
      {message && (
        <Text className="mt-0.5 text-sm font-medium leading-snug text-slate-600">{message}</Text>
      )}
    </View>

    <TouchableOpacity onPress={() => Toast.hide()} className="-mr-1 p-1">
      <X size={18} color="#94a3b8" />
    </TouchableOpacity>
  </View>
);

export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      icon={<CheckCircle2 size={22} color="#10b981" />}
      color="bg-emerald-600"
      title={props.text1}
      message={props.text2}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      icon={<AlertTriangle size={22} color="#ef4444" />}
      color="bg-red-600"
      title={props.text1}
      message={props.text2}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      icon={<Info size={22} color="#3b82f6" />}
      color="bg-blue-600"
      title={props.text1}
      message={props.text2}
    />
  ),
};
