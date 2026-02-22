---
slug: message-queue
title: Message Queue
authors: [narendra]
tags: [distributed-systems, architecture, database]
date: 2016-09-20
---

# Message Queue

## What is Message Passing?

Message passing is a technique to enable inter-process communication (IPC), or for inter-thread communication within the same process communication between two distributed or non-distributed parallel processes in synchronous or asynchronous mode, The communications are completed by the sending of messages (functions, signals and data packets) to recipients.

<!-- truncate -->

Most widely used messaging Patterns are:
- request-response
- Messaging-Queue
- Publisher-Subscriber
- RPC(remote-procedure-call)
- push-pull

## Request Response:

The program that plays the role of servicing requests is called server. Correspondingly, the program that sends requests to a server is called client. We use server or client to refer to the role played by a program. A program can act as both server and client at the same time. this is most widely used in world wide web. we have both synchronuous and asynchronous versions of this.

![client-server](/img/client-server-1.png)

## Message Queue:

Message queues provide and asynchronous Point-to-point communications protocol, which means the sender puts messages in a queue and continue its processing without receiving an immediate response. the receiver can reach out to the messaging queue for receiving the messages. Messages placed onto the queue are stored until the recipient retrieves them. Message queues have implicit or explicit limits on the size of data that may be transmitted in a single message and the number of messages that may remain outstanding on the queue.

![message-queue-model](/img/message-queue-model.png)

## Publisher-Subscriber:

Publish–subscribe is a sibling of the message queue paradigm, this paradigm the sender of the message is called Publisher, who send the message to a topic without the knowledge of who are the specific receivers, called subscribers, similarly the subscribers receives the messages only of there interest, the messages gets filtered based on the topic and content. the only subscriber interested the particular topic or attribute, the matching constraints defined by the subscriber.

![pub-sub-model](/img/pub-sub-model.png)
