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
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
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
    }
})