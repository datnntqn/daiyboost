import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Switch,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createStyles } from './styles/SettingsScreen.styles';
import { colors } from '../theme/colors';

type SettingsScreenProps = {
  navigation: any;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { toggleTheme, isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const renderSettingItem = (
    icon: any,
    text: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode,
    isPremium?: boolean,
    isLast?: boolean
  ) => (
    <TouchableOpacity 
      style={[
        styles.settingItem,
        isLast && styles.lastSettingItem
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Image 
          source={icon}
          style={[
            styles.icon,
            isPremium && styles.premiumIcon
          ]}
        />
        <Text style={styles.settingText}>{text}</Text>
      </View>
      {rightComponent || (onPress && (
        <Image 
          source={require('../../assets/icons/chevron.png')}
          style={styles.chevronIcon}
        />
      ))}
    </TouchableOpacity>
  );

  const renderSection = (title?: string, children?: React.ReactNode) => (
    <View style={styles.section}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.sectionBackground}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../assets/icons/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        {renderSection(undefined, 
          <>
            {renderSettingItem(
              require('../../assets/icons/notification.png'),
              'Notifications',
              () => navigation.navigate('NotificationSettings')
            )}

            {renderSettingItem(
              isDarkMode ? require('../../assets/icons/moon.png') : require('../../assets/icons/sun.png'),
              'Dark Mode',
              undefined,
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ 
                  false: Platform.select({ ios: '#e9e9ea', android: '#767577' }), 
                  true: Platform.select({ ios: colors.gold, android: colors.gold }) 
                }}
                thumbColor={Platform.select({
                  ios: '#FFFFFF',
                  android: isDarkMode ? colors.gold : '#f4f3f4'
                })}
                ios_backgroundColor="#e9e9ea"
              />,
              false,
              true
            )}
          </>
        )}

        {renderSection('Premium Features',
          <>
            {renderSettingItem(
              require('../../assets/icons/star.png'),
              'Go Ad-Free',
              () => console.log('Go Ad-Free pressed'),
              undefined,
              true
            )}

            {renderSettingItem(
              require('../../assets/icons/unlock.png'),
              'Unlock All Features',
              () => console.log('Unlock All Features pressed'),
              undefined,
              true,
              true
            )}
          </>
        )}

        <View style={styles.adSpace}>
          <Text style={styles.adText}>Advertisement</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;


