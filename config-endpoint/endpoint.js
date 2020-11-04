const serverL = 'localhost:2200'
const server = 'backecommerce.syswa.net'
const serverQa = '18.231.122.2:2200'
const portClient = '3389'
const endpointTarget = `https://${server}`
const imgEndpoint = `${endpointTarget}/static/users/`
const dataBase = 'ecommerce-aleo'
const endPoint =  { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    endpointTarget:endpointTarget, 
    server:server,
    dataBase:dataBase 
}

module.exports = endPoint