import { JwtHandler } from "../jwt-handler/JwtHandler";

export const Api = {
    baseUrl: "http://localhost:3000",

    readAllUrl: () => Api.baseUrl + "/product",

    readByIdUrl: id => Api.baseUrl + "/product/" + id,
    
    createProductUrl: () => Api.baseUrl + "/product",

    updateUrl: id => Api.baseUrl + "/product/" + id,

    deleteUrl: id => Api.baseUrl + "/product/" + id,
    
    loginUrl: id => Api.baseUrl + "/login",
    
    readAllCategoriesUrl: id => Api.baseUrl + "/category",

    authHeader: () => ({
        Authorization: "Bearer " + JwtHandler.getJwt(),
    }),

    buildApiGetRequest: (url, auth) =>
        fetch(url, {
            method: "GET",
            headers: auth ? new Headers(Api.authHeader()) : undefined
        }),

    buildApiPostRequest: (url, body, auth) =>
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                ...(auth ? Api.authHeader() : {}),
            }),
            body: JSON.stringify(body),
        }),

    // PATCH
    buildApiPatchRequest: (url, body, auth) =>
        fetch(url, {
            method: "PATCH",
            headers: new Headers({
                "Content-type": "application/json",
                ...(auth ? Api.authHeader() : {}),

            }),
            body: JSON.stringify(body),
        }),

        // DELETE
    buildApiDeleteRequest: (url, auth) =>
        fetch(url, {
            method: "DELETE",
            headers: auth ? new Headers(Api.authHeader()) : undefined

    }),
};