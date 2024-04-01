"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSelector = void 0;
class graphqlSelector {
    constructor() {
        this.type = "";
    }
    graphQLRequestAsString(obj) {
        return JSON.stringify(obj);
    }
}
exports.graphqlSelector = graphqlSelector;
