import http from './http';

export const dic = async (code) => {
    return await http.get('/sys/getDict',{ params: { type_code: code }});
}