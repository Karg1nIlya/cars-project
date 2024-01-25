export const showAlert = (type: string, textAlert: string, errorFlag: boolean) => {
    return {
        type,
        payload: {
            textAlert: textAlert,
            errorFlag: errorFlag
        }
    }
}

export const hideAlert = (type: string) => {
    return {
        type
    }
}
