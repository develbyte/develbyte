---
slug: zookeeper-introduction-to-zookeeper
title: Zookeeper Introduction to Zookeeper
authors: [narendra]
tags: [distributed-systems, architecture, database]
date: 2016-10-20
---

# Zookeeper Introduction to Zookeeper

**Zookeper** is an open-source, centralised co-ordination service which is used to co-ordinate the services and manage the configurations of applications accross a large number of hosts over a distributed environment.

Co-ordinating between the services in a distributed application is a complex process. ZooKeeper was designed to be a robust service that enables application developers to focus mainly on their  application logic rather than coordination. It exposes a simple API, similar to filesystem API, that allows developers to implement common co‐ordination tasks, such as electing a master server,managing group membership, and managing metadata.

Zookeper is open-sorced to Apache by Yahoo. Apache Zookeper have became standard for organising the services in Hadoop, kafka and other distributed frameworks.

<!-- truncate -->

## What is a distributed application?

Distributed applications are the type of application comprised of multiple software components running independently and concurrently across multiple physical machines. Distributed applications are required to do resource intensive computions which is difficult or impossible to do in a non-distributed environment. The group is machines running the distributed applications are togethere called as cluster and each machine individually called as Nodes. Distributed applications provides scalability and performance along with other benifits, But it can also easly lead to various complexities like Race Condition, DeadLock, Inconsistency, This is where Zookeeper comes to rescue. Zookeper helps to create co-ordianation between the tasks and maintain shared data with robust syncronisation technique.

Let's look at some examples where ZooKeeper has been useful to get a better sense of where it is applicable:

## 1. Apache HBase
HBase is a data store typically used alongside Hadoop. In HBase, ZooKeeper is used to  elect  a  cluster  master,  to  keep  track  of  available  servers,  and  to  keep  cluster metadata.

## 2. Apache Kafka
Kafka is a pub-sub messaging system. It uses ZooKeeper to detect crashes, to implement topic discovery, and to maintain production and consumption state for topics.

## 3. Apache Solr
Solr is an enterprise search platform. In its distributed form, called SolrCloud, it uses ZooKeeper to store metadata about the cluster and coordinate the updates to this metadata.

## 4. Yahoo! Fetching Service
Part of a crawler implementation, the Fetching Service  fetches web pages efficiently by  caching content while making sure that web server policies, such as those in robots.txt files, are preserved. This service uses ZooKeeper for tasks such as master election, crash detection, and metadata storage.

## 5. Facebook Messages
This is a Facebook application that integrates communication channels: email, SMS, Facebook Chat, and the existing Facebook Inbox. It uses ZooKeeper as a controller for implementing sharding and failover, and also for service discovery.
