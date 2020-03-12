import * as Config from 'config';
import { Response } from '../Models/Response';
import { Notification } from '../Models/Notification';
import {Delete, Get} from './ClientBase'

const token = 'eyJraWQiOiJhRVdsTldhNnpHQWJRak5xbFBEbHJCeFBkaDJnMGRWSXJaQnp4cEIxVXRRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNjQ5YzMxNi0zYmE0LTRhYzctYmIyZS1iMzUyYjM3ZmVjMTciLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Imh0dHBzOlwvXC9ub3RpZmljYXRpb24udGhvdWQuY29cL2ZldGNoOm5vdGlmaWNhdGlvbiBodHRwczpcL1wvbm90aWZpY2F0aW9uLnRob3VkLmNvXC9nZXQ6bm90aWZpY2F0aW9uIGh0dHBzOlwvXC9ub3RpZmljYXRpb24udGhvdWQuY29cL2RlbGV0ZTpub3RpZmljYXRpb24iLCJhdXRoX3RpbWUiOjE1ODQwMTI5NzMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9uQzBSeElnNk8iLCJleHAiOjE1ODQwMTY1NzMsImlhdCI6MTU4NDAxMjk3MywidmVyc2lvbiI6MiwianRpIjoiMzE1MzUxN2UtMTAxNy00OTBhLWI2NTktMjcxMDhiZjMzNzY5IiwiY2xpZW50X2lkIjoiM2o2N2FiMm03cnNkbXVrcm9vbDBoZTA1dGgiLCJ1c2VybmFtZSI6InVzZXIwIn0.UK7Wam0gAyfhqQqI6uMeoD1xZu0M_igwCMQ6Nme0hZhRIvH-knI9Ku3mAcBn82txS7V0N_MoF9rdIDg3eycKA2wgRM768TTXcEPao4DpuYZ2KA5eEh8V86eY7g1wfck8IRxBp-nywCaTbUZnESreQbgnA8Mf2VoJhepNkXeN8YTIe4Fcr3fsusJRbDa5LQy9fsYs61nerXsoIzEVrKrLXYHX6Un3lFWkenidxEREB2OrRp55S4akjdgmUYjazPhhV-GtgIwNaIGt9yXaa5OT8rQ1Z8k5VJyCHVBODzOazqFmMWh3q0VeL4wTItD68qw72mRoGt0WmlbDj59vWJm99Q';

export async function FetchNotifications(): Promise<Notification[]> {
    try {
        const response = await Get<Response<Notification[]>>(
            `https://notification.thoud.co/api/v1/user/notification`,//Config.get('Notification.BaseUrl'), //
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        );

        if (response && response.data) {
            return response.data;
        }

    } catch (error) {
        console.log(`Error encountered while fetching notifications: ${error}`); // TODO setup logger
    }
    return [];
}

export async function DeleteNotification(id:string): Promise<void> {
    try {
        await Delete<Response<boolean>>(
            `https://notification.thoud.co/api/v1/user/notification/${id}`,//Config.get('Notification.BaseUrl'), //
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        );
    } catch (error) {
        console.log(`Error encountered while fetching notifications: ${error}`); // TODO setup logger
    }
}
