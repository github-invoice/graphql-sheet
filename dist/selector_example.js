"use strict";
class graphqlSelector {
    constructor() {
        this.type = "";
    }
    graphQLRequestAsString(obj) {
        return JSON.stringify(obj);
    }
}
let unionF = {
    __on: {
        SoftwareProject: {
            repositoryUrl: true
        },
        MarketingProject: {
            budget: true
        }
    }
};
class updateProjectV2ItemFieldValue extends graphqlSelector {
    constructor() {
        super(...arguments);
        this.graphQLObject = {
            id: true,
            name: true,
            projectDetails: {
                startDate: true,
                endDate: true
            },
            unionF,
            __on: {
                SoftwareProject: {
                    repositoryUrl: true
                },
                MarketingProject: {
                    budget: true
                }
            }
        };
    }
    graphQLGenerator() {
        return this.graphQLRequestAsString(this.graphQLObject);
    }
}
let test = new updateProjectV2ItemFieldValue();
test.graphQLObject.id = false;
const gql = test.graphQLGenerator();
console.log(gql);
