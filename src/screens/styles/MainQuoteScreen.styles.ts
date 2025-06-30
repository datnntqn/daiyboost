import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  quoteText: {
    fontSize: 28,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif', // Placeholder, will refine with actual font
  },
  nextButton: {
    backgroundColor: '#5DADE2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#333333',
  },
});


