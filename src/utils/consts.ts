// export const DbConnectionStr: string = "mongodb://admin:Aa1234@ds243344.mlab.com:43344/synagogue-donations";

export const DBConfig = {
  user: 'admin',
  pass: '1234abcd',
  url: 'ds235417.mlab.com',
  port: 35417,
  databaseName: 'praypay'
};
export const CollectionsNames = {
  COUNTER: 'counter',
  DEBT: 'debt',
  MEMBER: 'member',
  PAYMENT: 'payment',
  ROLE: 'role',
  SYNAGOGUE: 'synagogue',
  USER: 'user'
};

export enum DBConnectionStatusEnum {
  'disconnected' = 0,
  'connected' = 1,
  'connecting' = 2,
  'disconnecting' = 3,
};
