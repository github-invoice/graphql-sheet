interface FieldSelector {
  name: string;
  include: boolean;
  subFields?: FieldSelector[];
}

// TODO: handle union types
function generateFieldsString(fields?: FieldSelector[]): string {
  if (!fields) return "";
  return fields
    .map((field) => {
      if (field.subFields) {
        return `${field.name} {
          ${generateFieldsString(field.subFields)}
        }`;
      } else {
        return field.name;
      }
    })
    .join("\n\t");
}

function filterSelection(
  available: FieldSelector,
  userSelection: string[],
  index: number
){
  available.subFields?.forEach((subField) => {
    if(subField && subField.name === userSelection[index] && index < userSelection.length){
      if(index === userSelection.length-1){
        subField.include = true;
      }
      filterSelection(subField, userSelection, index + 1);
    }
  });
}

function filterField(
  available: FieldSelector,
  userSelection: string[]
){
  for (let i = 0; i < userSelection.length; i++){
    let listSelector: string[] = [];
    if(userSelection[i].includes('.')){
      listSelector = userSelection[i].split('.');
    }else{
      listSelector.push(userSelection[i]);
    }
    filterSelection(available, listSelector, 0);
  }
}

// TODO: handle object attribut
function filterFieldsForSelection(
  available: FieldSelector,
  userSelection: string[]
): FieldSelector | null {
  // Direct match, return the field
  if (userSelection.includes(available.name)) {
    // If it has subFields, they need to be filtered as well
    if (available.subFields) {
      const filteredSubFields = available.subFields
        .map((subField) => filterFieldsForSelection(subField, userSelection))
        .filter((subField): subField is FieldSelector => subField !== null);
      return { ...available, subFields: filteredSubFields };
    }
    // Return as is if no subFields
    return available;
  }
  // If this is a container field with subFields, check those
  if (available.subFields) {
    const filteredSubFields = available.subFields
      .map((subField) => filterFieldsForSelection(subField, userSelection))
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

export { filterFieldsForSelection, generateMutationString, filterField, FieldSelector };
