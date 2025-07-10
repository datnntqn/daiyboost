import { StyleSheet, Platform } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

export const createStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    content: {
      padding: 20,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    timeSection: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    timeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    sectionDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    timeText: {
      fontSize: 17,
      color: colors.primary,
      fontWeight: '600',
    },
    switch: {
      transform: [{ scale: 0.8 }],
    },
    disabledText: {
      opacity: 0.5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
    },
    modalCancelText: {
      fontSize: 17,
      color: colors.textSecondary,
    },
    modalDoneText: {
      fontSize: 17,
      color: colors.primary,
      fontWeight: '600',
    },
    dateTimePicker: {
      height: 200,
    },
    testSection: {
      marginTop: 24,
      alignItems: 'center',
    },
    testButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 10,
      minWidth: 200,
      alignItems: 'center',
    },
    testButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    testDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
  });
}; 