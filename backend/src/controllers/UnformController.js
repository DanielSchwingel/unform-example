module.exports ={
    async index(request, response){
        response.json({
            name: 'Daniel Filipe Schwingel',
            email: 'daniel.schwingel@masterdata.com',
            password: 'umasenhaqualquer',
            address: {
                street: 'Rua Paraguai',
                number: '127',
                neighborhood: 'Nações',
                city: 'Concórdia',
                uf: 'SC'
            }
        })
    }
}