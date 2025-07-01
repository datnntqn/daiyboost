import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 16,
    color: '#5DADE2',
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
  quoteItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  quoteText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    flex: 1,
    marginRight: 15,
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#BDC3C7',
  },
  favoriteIconActive: {
    color: '#E74C3C',
  },
});


