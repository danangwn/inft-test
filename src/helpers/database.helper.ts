import { DbConfig } from './../interfaces/database.dto';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { connections } from '../main';

/**
 * Custom TypeOrmModuleOptions
 * @param type mysql / mssql / oracle
 * @param sid only for oracle, sid = database name
 */
export const getTypeOrmModuleOptions = (type: string, sid: string) => {
  type = type.toLowerCase();

  let config: TypeOrmModuleOptions = {
    type: 'mysql',
    charset: 'utf8mb4',
    timezone: 'Z',
  };

  switch (type) {
    case 'postgres': config = { type: 'postgres' }; break;
    case 'mssql': config = { type: 'mssql', options: {useUTC: true} }; break;
    case 'oracle': config = { type: 'oracle', sid: sid }; break;
  }

  return config;
};

 /**
  * Custom ConnectionOptions
  * @param type mysql / mssql / oracle
  * @param sid only for oracle, sid = database name
  */
export const getConnectionOptions = (type: string, sid: string) => {
  type = type.toLowerCase();

  let config: ConnectionOptions = {
    type: 'mysql',
    charset: 'utf8mb4',
    timezone: 'Z',
  };

  switch (type) {
    case 'postgres': config = { type: 'postgres' }; break;
    case 'mssql': config = { type: 'mssql', options: {useUTC: true} }; break;
    case 'oracle': config = { type: 'oracle', sid: sid }; break;
  }

  return config;
};

export const changeUpperEntities = (connection: Connection) => {
  for (let i = 0; i < connection.entityMetadatas.length; i++) {
    connection.entityMetadatas[i].tableMetadataArgs.name = connection.entityMetadatas[i].tableMetadataArgs.name ? connection.entityMetadatas[i].tableMetadataArgs.name.toUpperCase() : connection.entityMetadatas[i].tableMetadataArgs.name;
    connection.entityMetadatas[i].givenTableName = connection.entityMetadatas[i].givenTableName ? connection.entityMetadatas[i].givenTableName.toUpperCase() : connection.entityMetadatas[i].givenTableName;
    connection.entityMetadatas[i].tableNameWithoutPrefix = connection.entityMetadatas[i].tableNameWithoutPrefix ? connection.entityMetadatas[i].tableNameWithoutPrefix.toUpperCase() : connection.entityMetadatas[i].tableNameWithoutPrefix;
    connection.entityMetadatas[i].tableName = connection.entityMetadatas[i].tableName ? connection.entityMetadatas[i].tableName.toUpperCase() : connection.entityMetadatas[i].tableName;
    connection.entityMetadatas[i].tablePath = connection.entityMetadatas[i].tablePath ? connection.entityMetadatas[i].tablePath.toUpperCase() : connection.entityMetadatas[i].tablePath;

    for (let j = 0; j < connection.entityMetadatas[i].ownColumns.length; j++) {
      connection.entityMetadatas[i].ownColumns[j].givenDatabaseName = connection.entityMetadatas[i].ownColumns[j].givenDatabaseName ? connection.entityMetadatas[i].ownColumns[j].givenDatabaseName.toUpperCase() : connection.entityMetadatas[i].ownColumns[j].givenDatabaseName;
      connection.entityMetadatas[i].ownColumns[j].databaseName = connection.entityMetadatas[i].ownColumns[j].databaseName ? connection.entityMetadatas[i].ownColumns[j].databaseName.toUpperCase() : connection.entityMetadatas[i].ownColumns[j].databaseName;
      connection.entityMetadatas[i].ownColumns[j].databasePath = connection.entityMetadatas[i].ownColumns[j].databasePath ? connection.entityMetadatas[i].ownColumns[j].databasePath.toUpperCase() : connection.entityMetadatas[i].ownColumns[j].databasePath;
      connection.entityMetadatas[i].ownColumns[j].databaseNameWithoutPrefixes = connection.entityMetadatas[i].ownColumns[j].databaseNameWithoutPrefixes ? connection.entityMetadatas[i].ownColumns[j].databaseNameWithoutPrefixes.toUpperCase() : connection.entityMetadatas[i].ownColumns[j].databaseNameWithoutPrefixes;
    }
  }

  return connection;
};

export const connectDatabase = async (config: DbConfig): Promise<Connection> => {
  let newConnection = await createConnection({
    ...getConnectionOptions(config.type, config.database),
    name: config.name,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    logging: false,
    entities: [join(__dirname, '../models/**/*{.ts,.js}')],
  });

  if (config.type.toLowerCase() === 'oracle') {
    newConnection = changeUpperEntities(newConnection);
    await newConnection.query(`ALTER SESSION SET TIME_ZONE='UTC'`);
  }

  connections.set(newConnection.name, newConnection); // set to global variable
  return newConnection;
};
