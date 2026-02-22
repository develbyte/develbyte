---
slug: how-to-find-out-next-and-previous-day-of-week-in-oracle
title: How to Find out Next and Previous Day of Week in Oracle
authors: [narendra]
tags: [oracle, sql, database, hadoop]
date: 2015-02-03
---

# How to Find out Next and Previous Day of Week in Oracle

I have seen people writing number of lines of code to find out the date on a specific day in current or previous week, most often we need Friday the last working day of the week. We have a pretty simple way to find out in Oracle Queries.

<!-- truncate -->

## Logic:
- Add a number of the day you want the date for in your current date, assuming Monday as day 1, Tuesday as day 2 and so on.

```sql
TRUNC(TO_DATE(SYSDATE,'YYYYMMDD') + 1, 'd')
```

Since Oracle considers Sunday as the first day of the week and Saturday as the last day adding 1 will shift this week frame one day back now week starts from Saturday and ends on Friday and TRUNC will give the currents weeks Sunday.

- Now whatever day you want in the week just add or subtract the number of day from the Sunday you got. In our case we are looking for Friday so we add 5 since it is the 5 day of our new week.

```sql
TRUNC(TO_DATE(SYSDATE,'YYYYMMDD') + 1, 'd') + 5
```

So our Query will look something like this

```sql
SELECT TRUNC(TO_DATE(SYSDATE,'YYYYMMDD') + 1, 'd') + 52
FROM DUAL;
```

**Output:**

<!-- Image removed: previous-day-of-week-sql.png -->
