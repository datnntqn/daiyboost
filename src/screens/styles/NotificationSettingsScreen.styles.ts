import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 40,
    textAlign: 'left',
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
  settingText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 18,
    color: '#5DADE2',
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
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


