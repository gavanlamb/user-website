import axios, { AxiosRequestConfig } from 'axios';

async function Http<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await axios(config);
    return response.data;
}

export async function Get<T>(url: string, headers: any): Promise<T> {
    const config: AxiosRequestConfig = {
        headers,
        method: 'GET',
        url,
    };

    return Http<T>(config);
}

export async function Delete<T>(url: string, headers: any): Promise<T> {
    const config: AxiosRequestConfig = {
        headers,
        method: 'DELETE',
        url,
    };

    return Http<T>(config);
}

export async function Post<T>(url: string, body: any, headers: any): Promise<T> {
    const config: AxiosRequestConfig = {
        data: body,
        headers,
        method: 'POST',
        url,
    };

    return Http<T>(config);
}