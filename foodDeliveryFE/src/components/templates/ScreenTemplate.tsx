import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/theme';

export interface ScreenTemplateProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  padded?: boolean;
}

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  scrollEnabled = true,
  padded = true,
}) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.container,
        padded && styles.padded,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {children}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {scrollEnabled ? (
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: SPACING.xl,
  },
});
