"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSelector = void 0;
class graphqlSelector {
    constructor() {
        this.type = "";
    }
    generateGraphQLQuery(obj, prefix = '\n') {
        let query = '';
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                let value = obj[key];
                if (typeof value === 'boolean') {
                    query += `${prefix}${key} `;
                }
                else if (key === '__on') {
                    for (const typeName in value) {
                        if (Object.prototype.hasOwnProperty.call(value, typeName)) {
                            const typeFields = value[typeName];
                            query += `${prefix}... on ${typeName} { `;
                            query += this.generateGraphQLQuery(typeFields, `${prefix}\t`);
                            query += `\n${prefix}} `;
                        }
                    }
                }
                else if (typeof value === 'object') {
                    query += `${prefix}${key} { `;
                    query += this.generateGraphQLQuery(value, `${prefix}\t`);
                    query += `\n${prefix}} `;
                }
            }
        }
        return query;
    }
}
exports.graphqlSelector = graphqlSelector;
