---
slug: zookeeper-sessions-and-life-cycle
title: Zookeeper Sessions and life cycle
authors: [narendra]
tags: [distributed-systems, architecture, database]
date: 2016-11-04
---

# Zookeeper Sessions and life cycle

## Session and request order handling:

Sessions is very important and quite critical for the operation of ZooKeeper. All operations a client submits to ZooKeeper are associated to a session. When a session ends for any reason, the ephemeral nodes created during that session disappear.

The client initially connects to any server in the ensemble, and only to a single server. It uses a TCP connection to communicate with the server, but the session may be moved to a different server if the client has not heard from its current server for some time. Moving a session to a different server is handled transparently by the ZooKeeper client library.

<!-- truncate -->

Sessions offer order guarantees, which means that requests in a session are executed in FIFO (first in, first out) order. Typically, a client has only a single session open, so its requests are all executed in FIFO order. When a client creates a ZooKeeper handle using a specific language binding, it establishes a session with the service. If a client has multiple concurrent sessions, FIFO ordering is not necessarily preserved across the sessions. Consecutive sessions of the same client, even if they don't overlap in time, also do not necessarily preserve FIFO order.

### Here is how it can happen in this case:
- Client establishes a session and makes two consecutive asynchronous calls to `create /tasks` and `create /workers`.
- First session expires.
- Client establishes another session and makes an asynchronous call to `create /assign`.
In this sequence of calls, it is possible that only `/tasks` and `/assign` have been created, which preserves FIFO ordering for the first session but violates it across sessions.

## States and the Lifetime of a Session

The lifetime of a session is the period between its creation and its end, whether it is closed gracefully or expires because of a timeout. The possible states of a session are : *CONNECTING*, *CONNECTED*, *CLOSED*, and *NOT_CONNECTED*.

![states-and-the-Lifetime-of-a-Session](/img/states-and-the-Lifetime-of-a-Session.png)
