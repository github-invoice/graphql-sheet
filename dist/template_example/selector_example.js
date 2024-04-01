"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectV2ItemFieldValue = void 0;
const union_gen_example_1 = require("./union_gen_example");
const generic_graphql_1 = require("../generic_graphql");
class updateProjectV2ItemFieldValue extends generic_graphql_1.graphqlSelector {
    constructor() {
        super(...arguments);
        this.graphQLObject = {
            id: true,
            name: true,
            projectDetails: {
                startDate: true,
                endDate: true
            },
            unionF: union_gen_example_1.unionF,
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
exports.updateProjectV2ItemFieldValue = updateProjectV2ItemFieldValue;
