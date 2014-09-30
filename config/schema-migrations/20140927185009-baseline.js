var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function (db, callback) {
  async.series([
    // create discussions table
    db.runSql.bind(db,
       'CREATE TABLE discussions ( ' +
           '"discussionId" bigserial NOT NULL, ' +
           '"remoteObjectName" character varying(255) NOT NULL, ' +
           '"remoteObjectId" bigint NOT NULL, ' +
           '"createdBy" character varying(128), ' +
           '"updatedBy" character varying(128), ' +
           '"createdAt" timestamp with time zone NOT NULL, ' +
           '"updatedAt" timestamp with time zone NOT NULL ' +
       ');'),
    db.runSql.bind(db, 'ALTER TABLE ONLY discussions ADD CONSTRAINT discussions_pkey PRIMARY KEY ("discussionId");'),

    // create messages table
    db.runSql.bind(db,
       'CREATE TABLE messages ( ' +
           '"messageId" bigserial NOT NULL, ' +
           'content text NOT NULL, ' +
           '"parentMessageId" bigint, ' +
           '"discussionId" bigint NOT NULL, ' +
           '"createdBy" character varying(128), ' +
           '"updatedBy" character varying(128), ' +
           '"createdAt" timestamp with time zone NOT NULL, ' +
           '"updatedAt" timestamp with time zone NOT NULL ' +
       ');'),
    db.runSql.bind(db, 'ALTER TABLE ONLY messages ADD CONSTRAINT messages_pkey PRIMARY KEY ("messageId");')
  ], callback);
};

exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'messages'),
    db.dropTable.bind(db, 'discussions')
  ], callback);
};
