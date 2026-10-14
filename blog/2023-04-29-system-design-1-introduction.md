---
slug: system-design-1-introduction
title: System Design #1: Introduction
authors: narendra
tags: [system-design, architecture, scalability]
date: 2023-04-29
---

# System Design #1 : Introduction

![Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)](/img/system-design-1-introduction-01.jpg)

Hey there 👋 , fellow software engineer !!

Welcome to my series where I share what I’ve learned from my work and the books I’ve read. Speaking of books, have you checked out “Designing Data-Intensive Applications”? It’s seriously one of the best and most comprehensive books out there. But enough about books, let’s talk about us.

At some point through your quest of software engineering, you would have build a system if not you would be building one in future. Hope I would be able to help you learn a thing or two.

If you have any feedback or want to start a discussion, hit me up on my Twitter [@_imnaren](https://twitter.com/_imnaren) or on [LinkedIn](https://www.linkedin.com/in/im-naren). I’m always down for a good chat.

Lets start with the basics question — What is System design and why its important.

System design is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. It is a high-level view of the system that focuses on the logical and functional aspects of the software. The main goal of system design is to define the architecture of the system and ensure that it meets the requirements of the stakeholders.

When designing a system the biggest and most important concern is the **Functionality of the software itself**, This is the part where business and domain level expertise required with problem solving and tech knowledge. While solving functional requirements there are various generic concerns every application developer needs to think about these concerns can be broadly categorized into 3 categories — Reliability, scalability and maintainability.

In your design discussion you would have came across arguments like

“this is not maintainable, it requires too many steps to onboard”

“How would you scale this, the workload is expected to grow 10x by end of the year”

“there is a single point of failure, its not fault-tolerance”

A lot of time this terms are just thrown in the discussion without a clear understanding of what these terms actually mean in the interest of thoughtful engineering

Before getting into the techniques and optimisations its important to come on the same page about what these terms actually means, how to measure and track them.

## Reliability

Reliability refers to the ability of a software system to operate continuously and perform its intended tasks without errors or failures. In other words, a reliable software system is one that can be trusted to work correctly and consistently over time, even in the face of unexpected events or changing conditions.

**Fault-tolerant and resilience** are frequently used to refer to reliability of the system.

**Fault and failures** are also very frequently used interchangeably but they are not same, if the system is not designed well an un-expected fault can cause failure.

For example, If the size of an input record flowing in Kafka is larger then the threshold limit, can cause a the whole pipeline to stop, if the system is not designed to tolerate this kind of exceptions.

To achieve reliability, software systems must be designed with robustness, fault tolerance, and error handling in mind. This means that the system should be able to detect and recover from errors, handle unexpected events gracefully, and continue to operate even in the face of partial failures or other problems.

It is impossible to design a system with 0 probability of faults. therefore the goal should be to minimise fault and maximise reliability, There are some standard techniques to achieve the same.

* **Redundancy:** One common technique for improving system reliability is redundancy. This involves duplicating critical components or subsystems, so that if one fails, the other can take over. There are different types of redundancy, such as hot standby, cold standby, and active-active redundancy, depending on the level of redundancy and the cost of maintaining it.
* **Testing and validation:** Another key technique for ensuring system reliability is testing and validation. This involves testing the system under various conditions, including normal and abnormal scenarios, to ensure that it behaves as expected. There are different types of testing, such as unit testing, integration testing, and system testing, each focusing on different levels of the system and types of functionality.
* **Fault-tolerant design:** Fault-tolerant design involves designing the system to be able to continue operating even in the presence of faults or errors. This can involve techniques such as error detection, error correction, and graceful degradation, which allow the system to continue functioning even if some components are not working correctly.
* **Monitoring and recovery:** Monitoring and recovery techniques involve continuously monitoring the system for potential failures or errors, and taking corrective action as needed. This can involve techniques such as logging, alerting, and automated recovery, which can minimize downtime and ensure that the system remains available and reliable.
* **Security and access control:** Ensuring the security and access control of the system is another important technique for improving reliability. This involves securing the system at different levels, such as network, application, and data storage, and implementing access controls to prevent unauthorised access or modification of the system.

KPIs to measure and track reliability of a system:

* **Mean Time Between Failures (MTBF):** This metric measures the average time between system failures. A higher MTBF indicates a more reliable system.
* **Mean Time to Failure (MTTF):** This metric measures the average time until the system experiences its first failure. A higher MTTF indicates a more reliable system.
* **Mean Time to Repair (MTTR):** This metric measures the average time required to repair a system failure. A lower MTTR indicates a more reliable system.
* **Availability:** This metric measures the percentage of time that the system is available and functioning correctly. A higher availability indicates a more reliable system.
* **Error Rate:** This metric measures the percentage of transactions or operations that result in errors or failures. A lower error rate indicates a more reliable system.
* **Fault Tolerance:** This metric measures the system’s ability to continue functioning even in the face of partial failures or errors. A higher level of fault tolerance indicates a more reliable system.
* **Recovery Time Objective (RTO):** This metric measures the amount of time required to recover from a system failure and restore normal operation. A lower RTO indicates a more reliable system.
* **Recovery Point Objective (RPO):** This metric measures the amount of data loss that can be tolerated in the event of a system failure. A lower RPO indicates a more reliable system.

## Scalability

Scalability refers to the ability of a software system to handle increasing workloads or demand without experiencing a significant decrease in performance or service quality. In other words, a scalable system is one that can grow and adapt to changing needs and requirements, without sacrificing performance or reliability.

To understand scalability its important to understand Workload and performance, Workload and performance are related concepts, but they are not the same thing.

**Workload** refers to the amount of work that a system or application is expected to handle. Workload can be measured in various ways, such as the **number of transactions per second, the number of concurrent users, or the size of the data set being processed**. Workload is typically a measure of the demand placed on the system, and is usually expressed as a quantity over a period of time.

**Performance**, on the other hand, refers to how well a system or application is meeting its expected goals and requirements. Performance can be measured in various ways, such as **response time, throughput, or error rate**. Most recommended practice to measure performance in terms on median not mean. The mean does not tell you how many users actually experienced that delay. Percentiles *95th*, *99th* and *99.9th* (*p95*, *p99* and *p999*) are good to figure out how bad your outliners are.

Here are some techniques that can be used to design a scalable system:

* **Horizontal scaling (scaling out):** One common technique for scaling a system is horizontal scaling, which involves adding more instances of the system in a distributed environment. This can be achieved by replicating the system across multiple servers, each handling a portion of the workload, and using load balancing techniques to distribute requests evenly across them.
* **Vertical scaling (scaling up):** Another technique for scaling a system is vertical scaling, which involves adding more resources to a single instance of the system. This can be achieved by increasing the amount of memory, processing power, or storage capacity available to the system, either by upgrading the hardware or by using virtualisation technologies.
* **Caching:** Caching is another technique that can be used to improve the scalability of a system. By storing frequently accessed data in memory or on disk, the system can reduce the number of requests that need to be processed, improving performance and reducing the load on the system.
* **Database sharding:** Database sharding is a technique for scaling the database layer of a system. This involves partitioning the data across multiple database instances, each handling a portion of the data, and using a shard key to route requests to the correct instance.
* **Asynchronous processing:** Asynchronous processing is a technique that can be used to improve the scalability of a system by reducing the amount of time spent waiting for I/O operations to complete. By using non-blocking I/O and event-driven architectures, the system can handle more requests in parallel, improving throughput and reducing response times.

These are just a few examples of techniques that can be used to design a scalable system. The specific techniques used will depend on the requirements, constraints, and priorities of the system and its stakeholders.

KPIs to measure and track reliability of a system:

* **Response Time:** This metric measures the time it takes for the system to respond to a user request or transaction. A lower response time indicates a more scalable system.
* **Throughput:** This metric measures the number of transactions or requests that the system can handle in a given period of time. A higher throughput indicates a more scalable system.
* **Resource Utilisation:** This metric measures the amount of resources, such as CPU, memory, and disk, that the system is using. A lower resource utilisation indicates a more scalable system.
* **Concurrency:** This metric measures the number of users or transactions that the system can handle simultaneously. A higher concurrency indicates a more scalable system.
* **Elasticity:** This metric measures the system’s ability to automatically scale up or down in response to changes in demand or workload. A higher level of elasticity indicates a more scalable system.
* **Latency:** This metric measures the delay or lag time between a user request and the system’s response. A lower latency indicates a more scalable system.

## Maintainability

Maintainability refers to the ease with which a software system can be modified, updated, repaired, or enhanced over time without introducing new errors or bugs, or breaking existing functionality. It is an important aspect of software design and development, as software systems are constantly evolving and changing to meet the changing needs of users and stakeholders.

There are several techniques to design a highly maintainable system. Some of these techniques are:

* **Modularity**: Modular design is a technique of breaking down a complex system into smaller, more manageable parts, or modules. This allows developers to work on different parts of the system independently, without affecting the rest of the system. Modular design makes it easier to locate and fix bugs or make changes to specific parts of the system without impacting the whole system.
* **Abstraction**: Abstraction is a technique of hiding implementation details and exposing only the essential features of a system or module. This technique helps to reduce the complexity of a system, making it easier to maintain and understand.
* **Encapsulation**: Encapsulation is a technique of grouping data and methods that operate on that data into a single unit, or class. This technique helps to keep the internal details of a module or component hidden from other parts of the system, reducing the risk of unintended changes and making it easier to maintain.
* **Standardisation**: Standardisation involves defining and following a set of coding standards, best practices, and conventions for software development. This helps to ensure that the system is consistent and predictable, making it easier to maintain over time.
* **Documentation**: Documentation is a critical aspect of maintaining a software system. It involves creating and maintaining clear, concise, and up-to-date documentation of the system’s design, architecture, code, and processes. Good documentation makes it easier for developers to understand and maintain the system over time.

By applying these techniques and others, developers can design highly maintainable systems that are easier to modify, update, and repair over time.

KPIs to measure and track maintainability of a system:

* **Mean Time to Repair (MTTR)**: This KPI measures the average time it takes to fix a system after a failure occurs. A low MTTR indicates that the system is easy to diagnose and repair, which is a sign of good maintainability.
* **Mean Time Between Failures (MTBF)**: This KPI measures the average time between system failures. A high MTBF indicates that the system is reliable and well-maintained.
* **Code Complexity**: Code complexity measures the degree of difficulty in understanding and maintaining the code of a system. High code complexity can indicate that the system is difficult to maintain.
* **Code Duplication**: Code duplication measures the amount of duplicated code in a system. High levels of code duplication can indicate poor design and maintainability.
* **Test Coverage**: Test coverage measures the percentage of the system that is covered by automated tests. High test coverage can indicate that the system is well-tested and easier to maintain.
* **Technical Debt**: Technical debt measures the cost of maintaining the system over time. High levels of technical debt can indicate poor design and maintainability.

Are you ready to take your skills to the next level? In the upcoming blog posts, we’ll be diving deeper into the techniques and KPIs we’ve discussed so far. We’ll even try our hand at designing some systems! So grab your favorite drink and get ready to join us for an exciting journey. We can’t wait to see you in the next one

