---
slug: why-latency-not-partitions-dictates-database-consistency
title: Why Latency, Not Partitions, Dictates Your Database's Consistency [50PaperChallenge]
authors: narendra
tags: [distributed-systems, architecture, database, 50PaperChallenge]
---
# Why Latency, Not Partitions, Dictates Your Database’s Consistency


Confession: As someone with difficulty reading a lot of text, I’m definitely not a fan of long, dense academic text. Video lectures have always been my preferred way to learn. Honestly, reading research papers is something I’ve dodged for years—too much jargon, too many walls of text, and not enough clarity. But that’s exactly why I’m giving myself this challenge #50PaperChallenge: I want to see how far I can go if I really stick with it, and whether pushing through helps me learn things that actually last.

My goal isn’t just to skim headlines or collect citations. I want to go deeper—reading seminal technical whitepapers and really figuring out what’s inside, even if that means slowing down, re-reading, and wrestling with tough concepts.

But here’s the twist: I’m doing all this in public, right here, as a sort of open online notebook.

Why? Two big reasons:

<b><i>Memory for my future self</i></b>: Writing down my takeaways helps me process, organize, and actually remember what I’ve learned. Putting them out there means I can always come back later when I need a refresher.

<b><i>Maybe it helps you too</i></b>: If you’re an engineer, researcher, or just another tech nerd, maybe these notes will help you discover (or rediscover) some classics. Or maybe you’ll just relate to my struggle—and those occasional “aha!” moments—trying to crack technical content.

So, consider this an open journal. I’ll do my best to cut through the jargon, flag the breakthroughs, and be honest about what clicked and what didn’t.

To kick things off, I picked a paper that’s sparked more conversations (and arguments!) in our world than almost any other:

[Consistency Tradeoffs in Modern Distributed Database System Design by Daniel Abadi](https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf)


Let's unpack that.

<!--truncate-->
## The Myth of the All-Powerful CAP Theorem

For anyone working in distributed systems, the CAP theorem is a foundational concept. It's the go-to framework for explaining the difficult choices engineers face when building databases that can withstand failure. We're taught that in the face of a network partition, we must choose between Consistency and Availability.

But while the CAP theorem is undoubtedly important, its influence on the day-to-day behavior of many modern databases is widely misunderstood and often overstated. What if the reason systems like DynamoDB or Cassandra were architected for eventual consistency from the ground up has less to do with network partitions and more to do with the non-negotiable demand for low latency?

This article will follow the clues laid out in Daniel J. Abadi's seminal paper to reveal the true tradeoffs shaping modern distributed databases, uncovering a more complete mental model for how these complex systems actually work.


## CAP Is for Failures, Not Everyday Life

The big “aha” for me was this:
CAP only kicks in when you’re in failure mode — when network partitions actually happen. For the vast majority of time, when your database nodes can all see and talk to one another, there’s no forced tradeoff. You can have both consistency and availability. If a system relaxes consistency during this “all healthy” state, it’s doing it for other reasons, not because CAP demands it.

As Abadi bluntly says:

> It is wrong to assume that DDBSs that reduce consistency in the absence of any partitions are doing so due to CAP-based decision-making.

So what’s really going on?

## The Real Battle: Consistency vs. Latency (AKA, Why Users Hate Waiting)

The true, always-on tension in distributed databases comes from **replication**. Modern applications need data close to their users, across multiple regions, for both speed and fault tolerance. Replication across datacenters or availability zones is non-negotiable — but it comes with a price.

To keep replicas perfectly consistent, every write must propagate and be acknowledged by multiple nodes. Over a WAN, that takes time. More nodes, more distance, more latency. To keep applications snappy, many systems instead replicate asynchronously — meaning writes return quickly but replicas may lag behind.And in user-facing applications, even 100 milliseconds can kill engagement.

The result is a continuous tradeoff: either you wait (and guarantee consistency), or you go fast (and risk reads that see slightly stale data). As Abadi summarizes, **as soon as a distributed database replicates data, a tradeoff between consistency and latency arises**.

And for modern user-facing apps, latency isn't negotiable. Studies show even a 100‑millisecond delay can measurably hurt engagement and conversions. That's why many "eventually consistent" architectures exist not to survive partitions — but to keep the UI fast.

## PNUTS: The Smoking Gun

Yahoo's PNUTS database is the clearest example of this. Let's look at how it behaves in two situations.

**During a partition (the CAP case):**

PNUTS chooses consistency over availability. If a data item's master node ends up in a minority partition, the system refuses to allow updates to avoid conflicts. That makes PNUTS a CP system during failure.

**During normal operation:**

PNUTS prioritizes low latency. It serves reads from any replica to respond quickly, even if the replica's data isn't fully current. This puts it in the "eventually consistent" camp — but for performance reasons, not CAP reasons.

This split personality is the giveaway: PNUTS's consistency choices have less to do with network partitions and more to do with user latency and throughput. CAP explains its behavior in failure mode, but not its design in steady state.

## From CAP to PACELC

To reconcile these two perspectives, Abadi proposed a more complete framework: **PACELC**.

**If a Partition occurs (P), the system must choose between Availability (A) and Consistency (C). Else (E) — during normal operation — it trades between Latency (L) and Consistency (C).**

That gives us a much richer vocabulary to describe real systems:

- **Dynamo, Cassandra, Riak** – **PA/EL**: Prefer Availability during partitions, and lower Latency under normal conditions.
- **PNUTS** – **PC/EL**: Prefer Consistency during partitions, and lower Latency otherwise.
- **VoltDB, H-Store** – **PC/EC**: Never compromise on consistency, paying the full cost in latency and availability.

PACELC extends CAP into real-world territory — capturing how systems behave not just in the rare event of a failure, but during the 99.9% of time when everything is working.

## Ask the Better Question

CAP still matters. It tells you how your system behaves when things go wrong. But PACELC reminds us that systems spend most of their lives running normally, where the key constraint is **latency, not partitioning**.

So, next time you're whiteboarding an architecture or comparing databases, don't just ask if it's CP or AP. Ask a better question:

> **In the absence of failures — when it actually matters to users — does it sacrifice my consistency for lower latency?**


## What’s Next for #50PaperChallenge?

That’s Whitepaper #1 done!
Next week, I’m planning to dig into another classic — maybe something on consensus or data pipelines (not decided yet).

If you found this helpful, or even just interesting, feel free to follow along. And if you have suggestions for what I should cover next, drop them in the comments!

Onward to the next paper