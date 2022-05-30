import { Request } from './api';

export const requestInterceptor = (request: Request) => {
    return { ...request, ...checkRequest(request) };
}

const checkRequest = (request: Request) => {
    let requestChanges: any = {};

    if (request.body) {
        requestChanges.body = { ...request.body, ...checkBody(request.body) };
    }

    return requestChanges;
}

const checkBody = (body) => {
    let bodyChanges: any = {};

    if (body?.search) {
        bodyChanges.search = { ...body.search, ...checkSearchParam(body.search) }
    }

    return bodyChanges;
}

const checkSearchParam = (search: any) => {
    let changes: any = {};

    if (search.from) {
        changes.from = search.from < 1 ? 0 : search.from;
    }

    return changes;
}