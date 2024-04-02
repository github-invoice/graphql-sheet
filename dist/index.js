"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fieldManager_1 = require("./fieldManager");
const selector_example_1 = require("./template_example/selector_example");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Example available fields
        const availableFields = {
            name: "updateProjectV2ItemFieldValue",
            include: false,
            subFields: [
                { name: "clientMutationId", include: false },
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
                        { name: "name", include: false },
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
        const userFilteredFields = (0, fieldManager_1.filterField)(availableFields, userSelectedFields);
        // console.log(availableFields.subFields![1].subFields![0]);
        // console.log(availableFields.subFields![1].subFields![0].subFields);
        // console.log(userFilteredFields)
        // const mutationStringFiltered = generateMutationString(userFilteredFields!);
        // console.log(mutationStringFiltered)
        // Example mutation string
        const mutationString = (0, fieldManager_1.generateMutationString)(availableFields);
        //console.log(mutationString);
        // Example generic graphql selector
        let test = new selector_example_1.updateProjectV2ItemFieldValue();
        test.graphQLOutput.id = false;
        const gql = test.generateGraphQL();
        console.log(gql);
    });
}
main();
