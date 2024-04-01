import { unionF } from "./union_gen_example";
import { graphqlSelector } from "../generic_graphql";

export class updateProjectV2ItemFieldValue extends graphqlSelector{

    graphQLObject = {
        id: true,
        name: true,
        projectDetails: {
            startDate: true,
            endDate: true
        },
        unionF,
        __on: { // Handling union types
            SoftwareProject: {
                repositoryUrl: true
            },
            MarketingProject: {
                budget: true
            }
        }
    };
    graphQLGenerator(){
        return this.graphQLRequestAsString(this.graphQLObject);
    }
}