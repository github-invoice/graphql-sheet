import { unionF } from "./union_gen_example";
import { graphqlSelector } from "../generic_graphql";

export class updateProjectV2ItemFieldValue extends graphqlSelector{

    graphQLOutput = {
        id: true,
        name: true,
        projectDetails: {
            startDate: true,
            endDate: true
        },
        __on: {
            SoftwareProject: {
                repositoryUrl: true,
                ppp:{
                    id: true,
                    name: true
                }
            },
            MarketingProject: {
                budget: true
            }
        }
    };

    generateGraphQL(){
        this.type = "mutation";
        return this.generateGraphQLQuery(this.graphQLOutput);
    }
}