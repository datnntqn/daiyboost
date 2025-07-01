import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F4FD', // Light blue background as base
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  overlay: {
    backgroundColor: 'transparent',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50', // Dark text for contrast
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 18,
    color: '#5D6D7E',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
  },
  sunContainer: {
    alignItems: 'center',
    marginVertical: 40,
    position: 'relative',
  },
  sunBase: {
    width: 120,
    height: 60,
    backgroundColor: '#FFB84D',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    position: 'relative',
  },
  sunRay: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: '#FFB84D',
  },
  sunRay1: {
    top: -30,
    left: 58,
  },
  sunRay2: {
    top: -25,
    left: 25,
    transform: [{ rotate: '-45deg' }],
  },
  sunRay3: {
    top: -25,
    right: 25,
    transform: [{ rotate: '45deg' }],
  },
  sunRay4: {
    top: -10,
    left: -15,
    transform: [{ rotate: '-90deg' }],
  },
  sunRay5: {
    top: -10,
    right: -15,
    transform: [{ rotate: '90deg' }],
  },
  sunRayBottom: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: '#FFB84D',
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
    marginTop: 50,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});


