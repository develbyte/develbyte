---
slug: normalisation
title: Normalisation
authors: [narendra]
tags: [system-design, database]
date: 2015-09-14
---

# Normalisation

Normalisation is the process of eliminating the redundancy, minimising the use of null values and prevention of the loss of information by establishing relations and ensuring data integrity.

Data should only be stored once and avoid storing data that can be calculated from other data already held in the database. During the process of normalisation redundancy must be removed, but not at the expense of breaking data integrity rules.

The removal of redundancy helps to prevent insertion, deletion, and update errors, since the data is only available in one attribute of one table in the database.

<!-- truncate -->

If redundancy exists in the database then problems can arise when the database is in normal operation:

- When data is inserted the data must be duplicated correctly in all places where there is redundancy. For instance, if two tables exist for in a database, and both tables contain the employee name, then creating a new employee entry requires that both tables be updated with the employee name.
- When data is modified in the database, if the data being changed has redundancy, then all versions of the redundant data must be updated simultaneously. So in the employee example a change to the employee name must happen in both tables simultaneously.

## Aims of Normalisation

- Normalisation ensures that the database is structured in the best possible way.
- To achieve control over data redundancy. There should be no unnecessary duplication of data in different tables.
- To ensure data consistency. Where duplication is necessary the data is the same.
- To ensure tables have a flexible structure. E.g. number of classes taken or books borrowed should not be limited.
- To allow data in different tables can be used in complex queries.

## Stages of Normalisation

- First Normal Form 1NF
- Second Normal Form 2NF
- Third Normal Form 3NF
- Boyce-Codd Normal Form BCNF

## First Normal Form: 1NF

A table is in its first normal form if it contains no repeating attributes or groups of attributes. To convert data for unnormalised form to 1NF, simply convert any repeated attributes into part of the candidate key.

![un-normalise](/img/un-normalise.png)

![first-degree-normalisation](/img/first-degree-normalisation.png)

- A relation is in 1NF if it contains no repeating groups
- To convert an unnormalised relation to 1NF either
- Flatten the table and change the primary key, or
- Decompose the relation into smaller relations, one for the repeating groups and one for the non-repeating groups.
- Remember to put the primary key from the original relation into both new relations.
- This option is liable to give the best results.

## Second Normal Form: 2NF

A table is in the second normal form if it's in the first normal form AND no column that is not part of the primary key is dependant only a portion of the primary key.

The concept of functional dependency in central to normalisation and, in particular, strongly related to 2NF

![second-degree-normalisation](/img/second-degree-normalisation.png)

- A relation is in 2NF if it contains no repeating groups and no partial key functional dependencies
- Rule: A relation in 1NF with a single key field must be in 2NF
- To convert a relation with partial functional dependencies to 2NF. create a set of new relations:
- One relation for the attributes that are fully dependent upon the key.
- One relation for each part of the key that has partially dependent attributes

## Third Normal Form: 3NF

A table is in the third normal form if it is the second normal form and there are no non-key columns dependant on other non-key columns that could not act as the primary key.

![third-degree-normalisation](/img/third-degree-normalisation.png)

- A relation is in 3NF if it contains no repeating groups, no partial functional dependencies, and no transitive functional dependencies
- To convert a relation with transitive functional dependencies to 3NF, remove the attributes involved in the transitive dependency and put them in a new relation
- Rule: A relation in 2NF with only one non-key attribute must be in 3NF
- In a normalised relation a non-key field must provide a fact about the key, the whole key and nothing but the key.
- Relations in 3NF are sufficient for most practical database design problems. However, 3NF does not guarantee that all anomalies have been removed.
