import { Config } from './models'
import { IConfig } from './interfaces'

// export async function getGroupChatId (groupChatName: string): Promise<IConfig | null> {
    
// }

export async function getGroupChatName (): Promise<any>{
    try {
        const config = await Config.findOne();
        console.log(config);
    } catch (error) {
        throw error;
    }

    
}