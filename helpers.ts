import { Config } from './models'
import { IConfig } from './interfaces'
import { Client } from 'whatsapp-web.js';

export async function getGroupChatId (groupChatName: string, whatsappClient: Client): Promise<string | undefined> {
    const chats = await whatsappClient.getChatsByLabelId(groupChatName);
}

export async function getGroupChatName (): Promise<string | undefined>{
    try {
        const config = await Config.findOne();
        // console.log(config);
        return config?.chatname;
    } catch (error) {
        throw error;
    }
}