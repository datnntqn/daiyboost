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
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: -50,
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(93, 173, 226, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  settingsButton: {
    backgroundColor: 'rgba(93, 173, 226, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
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
  soundButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#333333',
  },
});


