---
slug: why-write-amplification-not-just-throughput-shapes-modern-databases
title: Why Write Amplification, Not Just Throughput, Shapes Modern Databases [50PaperChallenge]
authors: narendra
tags: [distributed-systems, architecture, database, 50PaperChallenge, storage-engines, lsm-trees]
---

# Why Write Amplification, Not Just Throughput, Shapes Modern Databases

*Lessons from LSM Trees and WiscKey — Paper #2 & #3 of #50PaperChallenge*

## Introduction: Why This Paper Stayed With Me

In my **#50PaperChallenge** journey, I've been deliberately alternating between *foundational theory* and *systems papers that quietly changed the industry*. This pairing — **[LSM Tree (O’Neil et al., 1996)](https://dsf.berkeley.edu/cs286/papers/lsm-acta1996.pdf)** and **[WiscKey: Separating Keys from Values in SSD-Conscious Storage](https://pages.cs.wisc.edu/~ll/papers/wisckey_tos.pdf)** — sits squarely in that second category.

LSM Trees are everywhere today — RocksDB, Cassandra, HBase, LevelDB, DynamoDB's storage engine — traces its lineage back to the LSM Tree. We configure them, tune them, and occasionally curse them during compaction storms — often without thinking too deeply about why the design works or what exact cost we’re paying for that performance. 

When I first encountered LSM Trees years ago, I mentally bucketed them as “the write-optimized alternative to [B-Trees](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf)” and moved on.

> <i>LSM Trees are faster for writes, slower for reads, and compaction is expensive.</i>

That's not wrong — but it's dangerously incomplete.
<!--truncate-->
Reading O'Neil's original LSM paper alongside WiscKey felt like watching the **evolution of an idea across two decades of hardware change**. One was written when disks were slow, RAM was scarce, and SSDs didn't exist. The other assumes flash is the default and asks a deceptively simple question:

> *What if keys and values don't belong together?*

This post is my attempt to unpack **what LSM Trees actually optimize for**, why **write amplification is the real villain**, and how WiscKey reframes long-standing trade-offs in modern storage engines.

If you build databases, data platforms, or even just tune RocksDB configs in production, this is not academic history. This is operational reality.


## The Core Problem: Why B-Trees Started to Break

The LSM Tree was not designed to be "cool."

It was designed to **survive write-heavy workloads**.

It’s tempting to frame the LSM Tree as an elegant data structure. That misses the point.

LSM Trees were a reaction to a physical constraint: random I/O is expensive, and it stays expensive no matter how clever your indexing logic is.

Before LSM Trees, the world ran on **[B-Trees](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf)**.

Classic [B-Trees](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf) assume that updating data in place is acceptable. Insert a row, modify a leaf, maybe split a page, propagate changes upward. On paper, it’s logarithmic and tidy. On spinning disks — and even on SSDs under sustained load — it turns into a steady stream of small, random writes.

O’Neil’s paper is blunt about this:
> <i> "Conventional disk-based index structures are unable to support high-volume transaction processing because of the cost of random disk I/O."
> — *O'Neil et al., 1996*</i>

The LSM Tree doesn’t eliminate work. It reorders work.

Instead of paying the cost at write time, it batches writes in memory, flushes them sequentially, and defers reconciliation to background merges. This isn’t about reducing total I/O. It’s about turning chaotic I/O into something the storage device can survive.

That distinction becomes important later.

## What LSM Trees Actually Optimize For

At a high level, an **LSM Tree trades read complexity for write efficiency**.

One thing I had to unlearn while rereading the paper is the idea that LSM Trees make writes “fast.”

They don’t — at least not in the way we often mean it.

LSM Trees optimize for sustained write bandwidth, not minimal write latency. Individual writes are cheap only because they’re buffered. The real cost shows up later, during compaction, when the system reconciles overlapping data across levels.

That deferred cost is the price you pay for smooth ingestion curves.

This is why production LSM systems feel stable until they don’t. Everything looks fine — until compaction debt builds up faster than your disks can pay it down.

And this is where write amplification stops being an abstract metric and starts becoming an operational problem.

### Write Amplification: The Cost That Refuses to Disappear

At a database level, write amplification is simple to define:

> <i>How many bytes did the system write internally for every byte the user asked it to store?</i>

In LSM Trees, amplification primarily comes from compaction. Data is written once to the memtable, flushed to disk, and then rewritten multiple times as it moves through levels. In leveled compaction schemes, it’s not unusual to see effective amplification in the 5–10× range under steady state, and higher under skewed workloads.

What’s easy to miss is that this is only half the story.

Those database-level rewrites land on storage devices that have their own internal write amplification due to flash translation layers, garbage collection, and wear leveling. When you stack the two, the physical device may end up writing far more than your database metrics suggest.

The LSM Tree paper focuses on the database side. WiscKey is interesting because it implicitly acknowledges that the cost of rewriting data is no longer abstract once SSD endurance enters the picture.

### Why WiscKey Feels Like an Obvious Idea in Hindsight

WiscKey starts from a slightly uncomfortable observation: during compaction, most of the I/O cost often comes from rewriting values, not keys — even though values don’t meaningfully participate in ordering decisions.

So it asks a question that feels almost naïve once you read it:

Why are we forcing large values through the merge path at all?

The answer, historically, was simplicity. Keeping keys and values together makes recovery, scans, and reads straightforward. WiscKey deliberately breaks that simplicity.

Keys stay in the LSM Tree.
Values go into an append-only log.

Compaction now rewrites mostly keys and pointers — small, fixed-size data — while values remain untouched unless garbage collected later. The paper shows that for value-heavy workloads, this can reduce database-level write amplification by an order of magnitude.

What WiscKey does not claim is equally important. It doesn’t say this design is universally better. It introduces new problems: value-log garbage collection, potential read amplification, and more complex crash recovery paths.

Once again, the theme is not elimination of cost — it’s redistribution of cost.

## Where Industry Mental Models Often Go Wrong

One reason these papers still matter is that the industry tends to compress them into slogans.

“LSM Trees are bad at reads.”
“[B-Trees](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf) don’t scale for writes.”
“SSDs make random I/O cheap.”

Each statement contains a grain of truth and a lot of missing context.

[B-Trees](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf) remain excellent for read-heavy, latency-sensitive OLTP workloads with predictable access patterns. LSM Trees shine when write throughput dominates and background work can be amortized. SSDs improve random I/O, but they don’t make write amplification free — they just hide it until endurance or tail latency becomes the bottleneck.

The mistake is treating these designs as winners and losers instead of cost profiles.

# A Mental Model That Finally Clicked for Me

Think of an LSM Tree like:

* A **git repository for data**
* Writes are commits (cheap, append-only)
* Reads must traverse history
* Compaction is `git rebase` on a very large repo

The brilliance is not the data structure itself — it's the **I/O pattern**:

* Sequential writes
* Batched reads
* Deferred cleanup

### What This Changes for Me as a Practitioner

After revisiting these papers, I find myself thinking less about “which engine is faster” and more about where the inevitable work shows up.

When I look at an LSM-based system now, the first questions I ask are not about peak throughput, but about:

- How compaction debt is monitored and controlled
- Whether write amplification is measured explicitly
- How much of the data path is dominated by values versus keys
- What assumptions the design makes about storage media behavior

If large values dominate your workload and compaction is your bottleneck, designs inspired by WiscKey are not exotic — they’re rational. If predictable read latency matters more than ingestion speed, a classic [B-Tree](https://15445.courses.cs.cmu.edu/fall2021/notes/07-trees.pdf) or hybrid design may still be the right call.

None of these choices are abstract. They surface directly in on-call rotations, hardware refresh cycles, and customer-facing latency charts.

## Closing Thought

Storage engine design is never about winning. It is about choosing which costs you are willing to pay, and when.

LSM Trees accept complexity to buy sustained write bandwidth. WiscKey pushes that logic further, questioning assumptions that held when disks, not flash, defined the cost model.

I will end this entry in the #50PaperChallenge with a question rather than a conclusion:

If you were designing a storage engine today—knowing how write amplification compounds across software and hardware layers—where would you choose to pay the cost, and which costs would you refuse to hide?

If you have wrestled with compaction storms or tuned RocksDB at 2 a.m., your answer is probably more interesting than any paper.
