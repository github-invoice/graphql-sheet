
interface FieldSelector {
    name: string;
    subFields?: FieldSelector[];
  }

  // TODO: handle union types
  function generateFieldsString(fields?: FieldSelector[]): string {
    if (!fields) return "";
    return fields.map(field => {
      if (field.subFields) {
        return `${field.name} {
          ${generateFieldsString(field.subFields)}
        }`;
      } else {
        return field.name;
      }
    }).join('\n\t');
  }

function filterFieldsForSelection(available: FieldSelector, userSelection: string[]): FieldSelector | null {
    // Direct match, return the field
    if (userSelection.includes(available.name)) {
      // If it has subFields, they need to be filtered as well
      if (available.subFields) {
        const filteredSubFields = available.subFields
          .map(subField => filterFieldsForSelection(subField, userSelection))
          .filter((subField): subField is FieldSelector => subField !== null);
        return { ...available, subFields: filteredSubFields };
      }
      // Return as is if no subFields
      return available;
    }

    // If this is a container field with subFields, check those
    if (available.subFields) {
      const filteredSubFields = available.subFields
        .map(subField => filterFieldsForSelection(subField, userSelection))
        .filter((subField): subField is FieldSelector => subField !== null);

      // Only return the container if it has any matching subFields
      if (filteredSubFields.length > 0) {
        return { ...available, subFields: filteredSubFields };
      }
    }

    // No match found
    return null;
  }

  function generateMutationString(selector: FieldSelector): string {
    let baseMutation = `mutation UpdateProjectV2ItemFieldValue($input: UpdateProjectV2ItemFieldValueInput!) {
    ${selector.name}(input: $input) {
      ${generateFieldsString(selector.subFields)}
    }
  }`;
    return baseMutation;
  }

  export { filterFieldsForSelection, generateMutationString, FieldSelector };