import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    marginRight: 20,
    padding: 5,
  },
  backIcon: {
    fontSize: 20,
    color: '#2C3E50',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 5,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  settingText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
    flex: 1,
  },
  chevron: {
    fontSize: 16,
    color: '#BDC3C7',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 3,
  },
  themeOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 17,
    minWidth: 60,
    alignItems: 'center',
  },
  themeOptionSelected: {
    backgroundColor: '#5DADE2',
  },
  themeOptionText: {
    color: '#7F8C8D',
    fontSize: 14,
    fontWeight: '500',
  },
  themeOptionTextSelected: {
    color: '#FFFFFF',
  },
  adSpace: {
    marginTop: 40,
    backgroundColor: '#E8F4FD',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  adText: {
    color: '#7F8C8D',
    fontSize: 16,
  },
});


