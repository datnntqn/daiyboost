import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 16,
    color: '#5DADE2',
    textAlign: 'left',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'left',
    marginBottom: 30,
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchBar: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    fontSize: 16,
    color: '#BDC3C7',
  },
  listContainer: {
    paddingBottom: 100,
  },
  categoryItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  categoryIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
    flex: 1,
  },
  adBanner: {
    backgroundColor: '#E8F4FD',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  adText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
});


