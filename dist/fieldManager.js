"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterField = exports.generateMutationString = exports.filterFieldsForSelection = void 0;
// TODO: handle union types
function generateFieldsString(fields) {
    if (!fields)
        return "";
    return fields
        .map((field) => {
        if (field.subFields) {
            return `${field.name} {
          ${generateFieldsString(field.subFields)}
        }`;
        }
        else {
            return field.name;
        }
    })
        .join("\n\t");
}
function filterSelection(available, userSelection, index) {
    var _a;
    (_a = available.subFields) === null || _a === void 0 ? void 0 : _a.forEach((subField) => {
        if (subField && subField.name === userSelection[index] && index < userSelection.length) {
            if (index === userSelection.length - 1) {
                subField.include = true;
            }
            filterSelection(subField, userSelection, index + 1);
        }
    });
}
function filterField(available, userSelection) {
    for (let i = 0; i < userSelection.length; i++) {
        let listSelector = [];
        if (userSelection[i].includes('.')) {
            listSelector = userSelection[i].split('.');
        }
        else {
            listSelector.push(userSelection[i]);
        }
        filterSelection(available, listSelector, 0);
    }
}
exports.filterField = filterField;
// TODO: handle object attribut
function filterFieldsForSelection(available, userSelection) {
    // Direct match, return the field
    if (userSelection.includes(available.name)) {
        // If it has subFields, they need to be filtered as well
        if (available.subFields) {
            const filteredSubFields = available.subFields
                .map((subField) => filterFieldsForSelection(subField, userSelection))
                .filter((subField) => subField !== null);
            return Object.assign(Object.assign({}, available), { subFields: filteredSubFields });
        }
        // Return as is if no subFields
        return available;
    }
    // If this is a container field with subFields, check those
    if (available.subFields) {
        const filteredSubFields = available.subFields
            .map((subField) => filterFieldsForSelection(subField, userSelection))
            .filter((subField) => subField !== null);
        // Only return the container if it has any matching subFields
        if (filteredSubFields.length > 0) {
            return Object.assign(Object.assign({}, available), { subFields: filteredSubFields });
        }
    }
    // No match found
    return null;
}
exports.filterFieldsForSelection = filterFieldsForSelection;
function generateMutationString(selector) {
    let baseMutation = `mutation UpdateProjectV2ItemFieldValue($input: UpdateProjectV2ItemFieldValueInput!) {
    ${selector.name}(input: $input) {
      ${generateFieldsString(selector.subFields)}
    }
  }`;
    return baseMutation;
}
exports.generateMutationString = generateMutationString;
