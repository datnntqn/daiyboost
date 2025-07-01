import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FD',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    marginVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 400,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  shareIcon: {
    fontSize: 20,
    color: '#5DADE2',
  },
  quoteContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 24,
    color: '#2C5282',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '500',
    marginBottom: 40,
  },
  footer: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#BDC3C7',
  },
  favoriteIconActive: {
    color: '#E74C3C',
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  navButtonText: {
    color: '#2C5282',
    fontSize: 14,
    fontWeight: '500',
  },
  muteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  muteButtonText: {
    color: '#2C5282',
    fontSize: 12,
  },
  adBanner: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  adText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});

