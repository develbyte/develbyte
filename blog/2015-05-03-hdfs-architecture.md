---
slug: hdfs-architecture
title: HDFS Architecture
authors: [narendra]
tags: [distributed-systems, architecture]
date: 2015-05-03
---

# HDFS Architecture

The Hadoop Distributed File System (HDFS) is a highly fault tolerant file system designed and optimized to be deployed on a distributed infrastructure established with a bunch commodity hardware. HDFS provides high throughput access to application data and is best suited for applications that have large data sets. Unlike existing distributed file systems HDFS have loosen up a few POSIX Standards to enable streaming access to file system data. HDFS was originally developed as an infrastructure for the Apache Nutch web search engine project.

<!-- truncate -->

## Inside HDFS

![hdfs-architecture.png](/img/hdfs-architecture.png)

HDFS is based on Master-Slave Architecture. A typical HDFS cluster consists one NameNode and multiple DataNodes generally one per node in the cluster. The NameNode is the arbitrator and repository for all **HDFS metadata**. The system is designed in such a way that user data never flows through the NameNode. NameNode acts as the master in Master-Slave Architectural pattern and manages the file system namespace and regulates access to files by client Applications. DataNode manages the user data stored on the node that they run on. A file is split into one or more blocks and set of blocks are stored in DataNodes. The NameNode executes file system namespace operations like opening, closing, and renaming files and directories. It also determines the mapping of blocks to DataNodes from the heartbeats and block reports sent by DataNodes. DataNodes executes read, write requests and performs block creation, block deletion, and block replication only when NameNode commands them to.

## Deployment

NameNode and DataNode are software programs designed in java, so it can execute on any machine having java installed (typically Unix/Linux), it can be deployed on a wide range of machines. In real time scenarios NameNodes are deployed on a high end dedicated machines and all other machines in the cluster are commodity hardware running DataNode program. Each cluster consists of one NameNode and multiple DataNodes. There could be multiple NameNodes within a cluster in some special scenarios, In order to scale name services horizontally federation uses multiple independent NameNodes within a cluster these NameNodes does not require coordination between each other. The DataNodes are used as common storage among the NameNodes, and all the DataNodes are required to be registered with all the NameNodes and send periodic heartbeats and block reports to the NameNodes.
