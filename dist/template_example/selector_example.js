"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectV2ItemFieldValue = void 0;
const generic_graphql_1 = require("../generic_graphql");
class updateProjectV2ItemFieldValue extends generic_graphql_1.graphqlSelector {
    constructor() {
        super(...arguments);
        this.graphQLOutput = {
            id: true,
            name: true,
            projectDetails: {
                startDate: true,
                endDate: true
            },
            __on: {
                SoftwareProject: {
                    repositoryUrl: true,
                    ppp: {
                        id: true,
                        name: true
                    }
                },
                MarketingProject: {
                    budget: true
                }
            }
        };
    }
    generateGraphQL() {
        this.type = "mutation";
        return this.generateGraphQLQuery(this.graphQLOutput);
    }
}
exports.updateProjectV2ItemFieldValue = updateProjectV2ItemFieldValue;
