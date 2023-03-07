
export const handler = (web3, contract) => () => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World!' })
    }
}
