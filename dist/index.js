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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const availableFields = {
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
        const userFilteredFields = (0, fieldManager_1.filterFieldsForSelection)(availableFields, userSelectedFields);
        // const userFilteredFieldsStr = generateFieldsString(userFilteredFields!.subFields);
        const mutationStringFiltered = (0, fieldManager_1.generateMutationString)(userFilteredFields);
        console.log(mutationStringFiltered);
        // Example mutation string
        const mutationString = (0, fieldManager_1.generateMutationString)(availableFields);
        console.log(mutationString);
    });
}
main();
