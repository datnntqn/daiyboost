import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6D3', // Warm beige background like in the mockup
  },
  overlay: {
    backgroundColor: 'transparent',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50', // Dark blue-gray for better contrast
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 18,
    color: '#5D6D7E',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  sunContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  sunEmoji: {
    fontSize: 60,
    color: '#F39C12',
  },
  sunIcon: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  tapText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});


