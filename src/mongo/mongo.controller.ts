import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';
import { State_Enum } from '../enum/index.enum';

@Controller('mongo')
export class MongoController {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  @Get()
  async checkDb() {
    const readyState = this.connection.readyState; // 0 = disconnected, 1 = connected...
    const stateLabel = State_Enum.Connected ?? State_Enum.Unknown;

    console.log(
      'process.env.MONGODB_CONNECTION_STRING',
      process.env.MONGODB_CONNECTION_STRING,
    );
    // If not connected, return quickly
    if (readyState !== ConnectionStates.connected) {
      return {
        ok: false,
        mongodb: {
          readyState,
          stateLabel,
        },
        message: 'MongoDB not connected',
      };
    }

    // If connected, try a lightweight ping
    try {
      // connection.db can be undefined while connecting; we already checked readyState === 1 though
      const admin = this.connection.db?.admin() || '';
      if (admin) {
        const ping = await admin.ping(); // { ok: 1 }
        return {
          ok: true,
          mongodb: {
            readyState,
            stateLabel,
            ping,
          },
        };
      }
    } catch (error) {
      return {
        ok: false,
        mongodb: {
          readyState,
          stateLabel,
        },
        error: (error as Error).message,
      };
    }
  }
}
