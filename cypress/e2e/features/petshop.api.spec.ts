describe('API Tests for Baufest Challenge', () => {
    it('Create, Get & Delete Pet API Service works', () => {
        /**
         *  Agregar una mascota realizando un POST al path /v2/pet.
            Realizar un GET /v2/pet/{petId} para obtener una mascota existente.
            Modificar una mascota existente mediante PUT al path /v2/pet.
         */

        cy.getRandomPetName().then((randomPetName) => {
            const randomId = Math.floor(Math.random() * 1000);
            const reqBody = {
                "id": randomId,
                "category": {
                    "id": 1,
                    "name": "string"
                },
                "name": randomPetName,
                "photoUrls": ["string"],
                "tags": [{
                    "id": 1,
                    "name": "string"
                }],
                "status": "available"
            };

            cy.request({    //Create a new Pet
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                body: reqBody
            }).then((response) => {
                expect(response.status, "HTTP status code to be success").to.eq(200);
                const petData = response.body;
                expect(petData).to.have.keys('id', 'category', 'name', 'photoUrls', 'tags', 'status');
                expect(petData.name, "Pet name to be equal").to.eq(randomPetName);
                expect(petData.id).to.equal(randomId);

                cy.request({    //Get the created Pet
                    method: 'GET',
                    url: `https://petstore.swagger.io/v2/pet/${petData.id}`,
                }).then((response) => {
                    expect(response.status, "HTTP status code for success").to.eq(200);
                    expect(reqBody.id, "pet creation req body match with get pet response").eq(response.body.id);
                    expect(reqBody.name, "pet creation req body match with get pet response").eq(response.body.name);
                    expect(reqBody.tags, "pet creation req body match with get pet response").to.deep.eq(response.body.tags);
                    expect(reqBody.photoUrls, "pet creation req body match with get pet response").to.deep.eq(response.body.photoUrls);
                    expect(reqBody.category, "pet creation req body match with get pet response").to.deep.eq(response.body.category);
                    cy.request({    //Update pet
                        method: 'PUT',
                        url: 'https://petstore.swagger.io/v2/pet',
                        body: {
                            "id": Math.floor(Math.random() * 1000),
                            "name": randomPetName+"-updated",
                            "status": "disabled"
                          }
                    }).then((response) => {
                        expect(response.status, "HTTP status code to be success").to.eq(200);
                        expect(response.body.name, "Pet name to be modified").to.eq(randomPetName+"-updated");
                        expect(response.body.status, "Pet status to be disabled").to.eq("disabled");
                    })
                })
            })    
        })
    })
})