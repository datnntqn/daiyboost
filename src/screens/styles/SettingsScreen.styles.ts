import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#333333',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 3,
  },
  themeOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  themeOptionSelected: {
    backgroundColor: '#5DADE2',
  },
  themeOptionText: {
    color: '#333333',
    fontSize: 16,
  },
  themeOptionTextSelected: {
    color: '#FFFFFF',
  },
  adSpace: {
    marginTop: 'auto',
    backgroundColor: '#CCCCCC',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  adText: {
    color: '#666666',
    fontSize: 16,
  },
});


