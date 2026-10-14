---
slug: system-design-4-mysql-vs-postgresql
title: System Design #4: MySQL vs PostgresSQL — Exploring Design Differences
authors: narendra
tags: [system-design, database, mysql, postgresql]
date: 2023-05-26
---

# System Design #4: MySQL vs PostgresSQL — Exploring Design Differences

![](/img/system-design-4-mysql-vs-postgresql-01.png)

Hello 👋 there!

This another blog in the system design series. In the previous blog, we discussed

* [The fundamentals](https://medium.com/develbyte/system-design-1-introduction-e227e1389073)
* [Analysing the Problem](https://medium.com/develbyte/system-design-2-the-problem-7435bebce926)
* [Google File System](https://medium.com/develbyte/system-design-3-google-file-system-design-decisions-and-tradeoffs-93c422d19d1d)

If you have any feedback or would like to start a discussion, feel free to hit me up on my Twitter [@_imnaren](https://twitter.com/_imnaren) or on [LinkedIn](https://www.linkedin.com/in/im-naren). I’m always down for a good chat.

Designing a solution often involves analyzing the differences between NoSQL and RDBMS databases. However, we often overlook the distinctions between two RDBMS systems that may seem similar at first glance but are actually developed with different design choices in mind. In this blog, we will dive into the differences between two of the most popular RDBMS systems — MySQL and PostgreSQL (PostgresSQL).

When comparing MySQL and Postgres, it becomes evident that they have distinct design philosophies and architectural approaches. Let’s delve into the various aspects where these systems differ, how they handle tradeoffs, and provide examples of how MySQL emphasises simplicity while Postgres offers advanced features.

## Design Philosophy

MySQL, developed by Oracle Corporation, **emphasises simplicity and ease of use**. Its design philosophy revolves around providing a straightforward and user-friendly experience. This approach makes MySQL an excellent choice for beginners and developers who prefer a simple and intuitive database solution.

MySQL’s design philosophy also **prioritises performance and speed**. It aims to deliver efficient and fast data retrieval and manipulation, which makes it particularly suitable for applications with a heavy emphasis on read operations. The focus on performance and efficiency has made MySQL a popular option for web applications and content management systems.

On the other hand, Postgres (short for PostgreSQL) has a design philosophy that** emphasises standards compliance and robustness**. Developed by the Postgres Global Development Group, Postgres is known for its adherence to SQL standards and its focus on providing a wide range of advanced features.

Postgres **aims to be a comprehensive and feature-rich database management system**. It offers support for various data types, including structured, semi-structured, and unstructured data, making it versatile for handling complex data models. Additionally, Postgres provides advanced indexing options and built-in support for data integrity constraints, making it well-suited for applications that require strict validation and consistency.

The design philosophy of Postgres **also emphasises extensibility**. It allows users to define custom data types, functions, and procedural languages, enabling them to tailor the database to their specific needs. This extensibility makes Postgres a powerful choice for applications that require complex data processing and specialised functionalities.

In summary, MySQL’s design philosophy centers around simplicity, ease of use, and performance, making it suitable for applications that prioritise quick data retrieval and manipulation. Postgres, on the other hand, focuses on standards compliance, robustness, and extensibility, making it an ideal choice for applications with complex data requirements and advanced features.

## Architecture

### Data Storage Handling

MySQL and Postgres have different approaches to storage handling.

MySQL follows a table-based storage architecture, where data is stored in individual tables comprising rows and columns.It uses a pluggable storage engine system, which allows users to choose the most appropriate storage engine for their specific needs.

For example, MySQL offers InnoDB as the default storage engine, which provides support for transactions, concurrency control, and crash recovery. In contrast, MyISAM, another storage engine for MySQL, focuses more on read performance but does not support transactions.

In contrast, Postgres adopts a heap-based storage model, where data is stored in pages within disk blocks. It combines tables, indexes, and a transaction log to manage data storage and retrieval. Postgres employs a Write-Ahead Logging (WAL) mechanism, which ensures data durability and recovery in the event of a system crash. Additionally, Postgres supports advanced data types and provides extensibility options, allowing users to define custom data types and operators.

On the other hand, Postgres utilizes a single storage engine that handles all data storage operations. It implements a transactional storage engine that ensures ACID (Atomicity, Consistency, Isolation, Durability) properties for data manipulation operations.

### SQL Standards: Query Language

MySQL introduces some proprietary features and extensions while maintaining a significant level of SQL standards compliance. It provides a user-friendly and intuitive query language, making it easy for developers to write SQL statements. MySQL supports various SQL functionalities and offers extensions like stored procedures and user-defined functions (UDFs) to enhance its capabilities.

Postgres, on the other hand, strives for strict adherence to SQL standards. It provides robust SQL support and is highly compliant with standards. Postgres offers advanced SQL features, including complex joins, subqueries, window functions, and recursive queries. Its adherence to SQL standards ensures portability and compatibility across different database systems.

### Query Processing

Both MySQL and Postgres employ a cost-based query optimiser to generate efficient execution plans for queries. However, their approaches and optimisation techniques differ.

MySQL’s query optimiser considers factors such as available indexes, table size, and selectivity to generate the best execution plan. It focuses on minimizing disk I/O and CPU usage to improve query performance. MySQL also supports query caching, which can significantly speed up repetitive queries.

Postgres takes a more comprehensive approach to query processing. It employs advanced optimisation techniques like query rewriting, join reordering, and subquery flattening. Postgres utilizes statistical information about tables and indexes to estimate the cost of query plans accurately. Additionally, Postgres allows users to influence the query optimiser’s decisions using configuration parameters and query hints.

### Transaction Management

MySQL and Postgres handle transactions differently, each with its own trade-offs.

MySQL’s transaction management relies on the concept of storage engines. Different storage engines have varying levels of transactional support. For example, InnoDB provides full ACID properties, while MyISAM does not support transactions. This allows users to choose the appropriate storage engine based on their specific transactional requirements.

Postgres, at its core, provides transaction support with multi-version concurrency control (MVCC). It allows multiple transactions to operate concurrently without blocking each other. Postgres ensures data consistency by providing isolation levels, such as Read Committed and Serialisable, to maintain data integrity and prevent conflicts.

### Metadata Management

MySQL and Postgres have very similar approaches to metadata management.

MySQL stores metadata information, such as schema and table definitions, in system tables within the database. It provides SQL statements and utilities to query and modify metadata, making it accessible and straightforward to manage.

Postgres stores metadata in a system catalog known as the “system catalog tables.” These catalog tables contain information about schemas, tables, indexes, constraints, and other database objects. Postgres provides a rich set of system catalog views and functions to query and manipulate metadata. This enables users to have fine-grained control over database objects and their properties.

### Concurrency Control

MySQL primarily utilizes locking mechanisms to control concurrent access to data. It employs table-level locks, row-level locks, and other locking strategies to handle concurrency. While effective, this approach can lead to contention and potential performance bottlenecks in highly concurrent environments.

Postgres, with its MVCC model, uses a combination of read and write locks to manage concurrency. It allows concurrent reads and provides snapshot isolation, ensuring that transactions only see a consistent view of the data. This enables a higher level of concurrency and minimizes contention among transactions.

### Indexing and Query Optimisation

MySQL and Postgres employ different indexing strategies and query optimisation techniques.

MySQL supports various indexing techniques, including B-tree, hash, and full-text indexes. It allows users to choose the appropriate index type based on their specific requirements. For instance, B-tree indexes are suitable for range queries, while hash indexes provide fast lookups for equality-based queries. MySQL’s query optimiser utilizes available indexes to generate efficient query plans.

Postgres also supports B-tree and hash indexes but goes beyond that with additional indexing options. It provides advanced indexing techniques like Generalised Inverted Index (GIN), which is suitable for handling complex data types and full-text search. Postgres also supports Generalised Search Tree (GiST) indexes, allowing users to define custom indexing methods for specialised data types and structures. Postgres’s query optimiser leverages these indexes along with other optimisation techniques to generate efficient query plans.

### Extensibility and Customisability

Postgres excels in terms of extensibility and customisability. It offers a rich ecosystem of extensions, allowing users to enhance the database’s functionality with additional features. Postgres also supports the creation of user-defined data types, operators, and functions, enabling users to define custom behavior and tailor the database to their specific needs.

MySQL also provides some extensibility options, such as user-defined functions (UDFs) and stored procedures. However, its extensibility capabilities are not as extensive as those offered by Postgres.

### Modularity

Postgres is renowned for its modular architecture, allowing users to add or remove components based on their requirements. Users can enable or disable specific features and functionalities, tailoring the database system to their needs. This modularity ensures a lean and efficient database system that meets specific use cases.

MySQL, while moderately modular, does not offer the same level of granularity when enabling or disabling specific components. However, the pluggable storage engine system in MySQL provides flexibility in choosing the storage engine that best suits the workload.

### Ease of Use

MySQL emphasises simplicity and ease of use. It provides a user-friendly interface, straightforward installation process, and intuitive administration tools. MySQL’s design choices focus on delivering a user-friendly experience, making it accessible for developers and administrators.

Postgres, while feature-rich, has a steeper learning curve compared to MySQL. It offers a comprehensive set of functionalities and advanced features, which can be advantageous for experienced users and complex use cases. However, it may require more effort to set up and configure initially.

### Performance Tuning

Both MySQL and Postgres offer options for performance tuning and optimisation.

MySQL provides a variety of tuning options and configuration parameters to optimise performance. It offers tools and utilities for monitoring and diagnosing performance issues. MySQL’s design choices focus on delivering high-speed data access and efficient resource utilisation.

Postgres also provides performance tuning options and configuration parameters to optimise its performance. It offers various statistics views, monitoring tools, and query analysis capabilities to identify and resolve performance bottlenecks.

### High Availability

Both MySQL and Postgres offer high availability solutions to ensure system uptime and data redundancy.

MySQL provides options like replication, which allows data to be replicated across multiple servers, providing fault tolerance and scalability. It also offers tools like MySQL Cluster and Group Replication for automatic failover and high availability setups.

Postgres offers various mechanisms for achieving high availability, including streaming replication, logical replication, and synchronous replication. It also provides tools like PostgreSQL Automatic Failover (PAF) and third-party solutions like Patroni for automatic failover and high availability setups.

## Summary

