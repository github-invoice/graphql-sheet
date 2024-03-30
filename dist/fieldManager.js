"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFieldsString = exports.generateMutationString = exports.filterFieldsForSelection = void 0;
function generateFieldsString(fields) {
    if (!fields)
        return "";
    return fields.map(field => {
        if (field.subFields) {
            return `${field.name} {
          ${generateFieldsString(field.subFields)}
        }`;
        }
        else {
            return field.name;
        }
    }).join('\n\t');
}
exports.generateFieldsString = generateFieldsString;
function filterFieldsForSelection(available, userSelection) {
    // Direct match, return the field
    if (userSelection.includes(available.name)) {
        // If it has subFields, they need to be filtered as well
        if (available.subFields) {
            const filteredSubFields = available.subFields
                .map(subField => filterFieldsForSelection(subField, userSelection))
                .filter((subField) => subField !== null);
            return Object.assign(Object.assign({}, available), { subFields: filteredSubFields });
        }
        // Return as is if no subFields
        return available;
    }
    // If this is a container field with subFields, check those
    if (available.subFields) {
        const filteredSubFields = available.subFields
            .map(subField => filterFieldsForSelection(subField, userSelection))
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
