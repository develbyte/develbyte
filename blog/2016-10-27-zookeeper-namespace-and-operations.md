---
slug: zookeeper-namespace-and-operations
title: Zookeeper Namespace And Operations
authors: [narendra]
tags: [distributed-systems, architecture, database]
date: 2016-10-27
---

# Zookeeper Namespace And Operations

## Zookeper data Model:

ZooKeeper has a hierarchal name space(as shown below), much like a distributed file system. The only difference is that each node in the namespace can have data associated with it as well as children. It is like having a file system that allows a file to also be a directory.

![zookeeper-data-model](/img/zookeeper-data-model.png)

<!-- truncate -->

The root node contains four more nodes, and three of those nodes have nodes under them. The leaf nodes are the data.

## Znode:

Every node in a ZooKeeper tree is referred to as a znode.Znodes maintain a stat structure that includes version numbers for data changes, acl changes. The stat structure also has timestamps. The version number, together with the timestamp, allows ZooKeeper to validate the cache and to coordinate updates. Each time a znode's data changes, the version number increases.

Znodes may or may not contain data. If a znode contains any data, the data is stored as a  byte  array.  The  exact  format  of  the  byte  array  is  specific  to  each  application,  and ZooKeeper does not directly provide support to parse it. The absence of data often conveys important information about a znode. For Example :- in a typical master-worker application the absence of a master znode means that no master is currently elected.

### The ZooKeeper API exposes the following operations:

- `create /path data` - Creates a znode named with /path  and containing data
- `delete /path` - Deletes the znode  /path
- `exists /path` - Checks whether /path exists
- `setData /path data` - Sets the data of znode /path to  data
- `getData /path` - Returns the data in /path
- `getChildren /path` - Returns the list of children under /path

One important note is that ZooKeeper does not allow partial writes or reads of the znode data. When setting the data of a znode or reading it, the content of the znode is replaced or read entirely.

## Different Modes of Znode:

Znodes can be created with four different modes: persistent, ephemeral, presistent_sequential and ephemeral_sequential

### Persistent and ephemeral znodes

A znode can be either persistent or ephemeral. A persistent znode /path can be deleted only through a call to delete. An ephemeral znode, in contrast, is deleted if the client that created it crashes or simply closes its connection to ZooKeeper.

Persistent znodes are useful when the znode stores some data on behalf of an application and this data needs to be preserved even after its creator is no longer part of the system.

Ephemeral znodes convey information about some aspect of the application that must exist only while the session of its creator is valid.

### Sequential znodes:

A sequential znode is assigned a unique, monotonically increasing integer. This sequence number is appended to the path used to create the znode. For example, if a client creates a sequential znode with the path /tasks/ task-, ZooKeeper assigns a sequence number, say 1, and appends it to the path. The path of the znode becomes /tasks/task-1. Sequential znodes provide an easy way to create znodes with unique names. They also provide a way to easily see the creation order of znodes.

## Version:

Each znode has a version number associated with it that is incremented every time its data changes. A couple of operations in the API can be executed conditionally: setData and delete. Both calls take a version as an input parameter, and the operation succeeds only if the version passed by the client matches the current version on the server. The use of versions is important when multiple ZooKeeper clients might be trying to perform operations over the same znode.

## Watch:

A watch is a one-shot operation, which means that it triggers one notification for any changes to znodes. Registering to receive a notification for a given znode consists of setting a watch. To receive multiple notifications over time, the client must set a new watch upon receiving each notification.

## Data Access:

The data stored at each znode in a namespace is read and written atomically. Reads get all the data bytes associated with a znode and a write replaces all the data. Each node has an Access Control List (ACL) that restricts who can do what.

ZooKeeper was not designed to be a general database or large object store. Instead, it manages coordination data. This data can come in the form of configuration, status information, rendezvous, etc.

## Semantics of Watches :

We can set watches with the three calls that read the state of ZooKeeper: `exists`, `getData`, and `getChildren`.The following list details the events that a watch can trigger and the calls that enable them:

- **Created event**: Enabled with a call to exists.
- **Deleted event**: Enabled with a call to exists, `getData`, and `getChildren`.
- **Changed event**: Enabled with a call to exists and `getData`.
- **Child event**: Enabled with a call to `getChildren`.

## Remove Watches:

We can remove the watches registered on a znode with a call to `removeWatches`. Also, a ZooKeeper client can remove watches locally even if there is no server connection by setting the local flag to true. The following list details the events which will be triggered after the successful watch removal.

- **Child Remove event**: Watcher which was added with a call to `getChildren`.
- **Data Remove event**: Watcher which was added with a call to exists or `getData`.

## ACL Permissions :

ZooKeeper supports the following permissions:

- `CREATE`: you can create a child node
- `READ`: you can get data from a node and list its children.
- `WRITE`: you can set data for a node
- `DELETE`: you can delete a child node
- `ADMIN`: you can set permissions
