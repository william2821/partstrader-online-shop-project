import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ debug: false, path: process.env.DOTENV_CONFIG_PATH || '.env' });

export const PASSWORD = process.env.PASSWORD || '';
