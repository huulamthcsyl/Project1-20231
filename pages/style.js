import { StyleSheet } from "react-native"

export const DefaultStyle = StyleSheet.create({
  titleText: {
    fontSize: 40,
    color: "#4834D4",
    fontWeight: "600",
    marginBottom: 30,
    textAlign: 'center'
  },
  box: {
    width: "100%",
    paddingHorizontal: 40,
    marginTop: "30%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 30,
    borderRadius: 5,
    height: 50,
    fontSize: 20
  },
  secondaryText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: '300',
    color: '#535353',
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#4834D4",
    marginBottom: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "600"
  },
  linkText: {
    color: "#4834D4",
    fontSize: 20,
    fontWeight: '600'
  },
  text: {
    fontSize: 20
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    marginBottom: 20
  },
  titleHeader: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '600'
  },
  header: {
    width: '100%',
    backgroundColor: '#4834D4',
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  }, 
  floatingButton: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#4834D4',                                    
    position: 'absolute',                                          
    bottom: '5%',                                                    
    right: 20, 
    alignItems: "center",
    justifyContent: "center",
  },
  floatingIcon: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain'
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  card: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "#FCFCFC",
    paddingLeft: 10,
    paddingTop: 10
  },
  classTitle: {
    color: '#4834D4',
    fontWeight: '600'
  }
})