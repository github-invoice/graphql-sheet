export class graphqlSelector{
    type: string = "";
    graphQLRequestAsString(obj:any):string {
        return JSON.stringify(obj);
    }
}
