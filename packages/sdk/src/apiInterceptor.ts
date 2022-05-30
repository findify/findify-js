import { Request } from './api';

export const requestInterceptor = (request: Request) => {
    return checkRequest(request);
}

const checkRequest = (request: Request) => {
    if (request?.body) {
        request.body = checkBody(request.body);
    }

    return request;
}

const checkBody = (body) => {
    if (body?.search) {
        body.search = checkSearh(body.search);
    }

    return body;
}

const checkSearh = (search: any) => {
    if (search?.from) {
        search.from = search.from < 1 ? 0 : search.from;
    }

    return search;
}