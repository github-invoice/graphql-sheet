import { FieldSelector, generateMutationString, filterFieldsForSelection, filterField} from "./fieldManager";
import { updateProjectV2ItemFieldValue } from "./template_example/selector_example";

async function main(){

    // Example available fields
    const availableFields: FieldSelector = {
        name: "updateProjectV2ItemFieldValue",
        include: false,
        subFields: [
          { name: "clientMutationId", include: false},
          {
            name: "projectV2Item",
            include: false,
            subFields: [
              {
                name: "id",
                include: false,
                subFields: [
                  { name: "id", include: false },
                  { name: "name", include: false },
                  // Add other potential fields here
                  { name: "status", include: false },
                  { name: "createdAt", include: false },
                  // Assume more fields can be selected
                ],
              },
              { name: "name" , include: false},
              // Add other potential fields here
              { name: "status", include: false },
              { name: "createdAt", include: false },
              // Assume more fields can be selected
            ],
          },
        ],
    };

    // Example user selection filter
    const userSelectedFields = ['projectV2Item.id', 'projectV2Item.id.status'];
    // const userFilteredFields = filterFieldsForSelection(availableFields, userSelectedFields);
    const userFilteredFields = filterField(availableFields, userSelectedFields);
    // console.log(availableFields.subFields![1].subFields![0]);
    // console.log(availableFields.subFields![1].subFields![0].subFields);
    // console.log(userFilteredFields)
    // const mutationStringFiltered = generateMutationString(userFilteredFields!);
    // console.log(mutationStringFiltered)

    // Example mutation string
    const mutationString = generateMutationString(availableFields);
    //console.log(mutationString);



    // Example generic graphql selector
    let test = new updateProjectV2ItemFieldValue();
    test.graphQLOutput.id = false;
    const gql = test.generateGraphQL();
    console.log(gql);



}

main();