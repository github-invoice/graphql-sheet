import { FieldSelector, generateMutationString, filterFieldsForSelection } from "./fieldManager";

async function main(){

    const availableFields: FieldSelector = {
        name: "updateProjectV2ItemFieldValue",
        subFields: [
          { name: "clientMutationId" },
          {
            name: "projectV2Item",
            subFields: [
              { name: "id" },
              { name: "name" },
              // Add other potential fields here
              { name: "status" },
              { name: "createdAt" },
              // Assume more fields can be selected
            ],
          },
        ],
    };

    // Example user selection filter
    const userSelectedFields = ['clientMutationId', 'id', 'name', 'status'];
    const userFilteredFields = filterFieldsForSelection(availableFields, userSelectedFields);
    const mutationStringFiltered = generateMutationString(userFilteredFields!);
    console.log(mutationStringFiltered)

    // Example mutation string
    const mutationString = generateMutationString(availableFields);
    console.log(mutationString);
}

main();