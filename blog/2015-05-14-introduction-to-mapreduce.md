---
slug: introduction-to-mapreduce
title: Introduction To MapReduce
authors: [narendra]
tags: [distributed-systems, architecture]
date: 2015-05-14
---

# Introduction To MapReduce

**MapReduce** is a framework for processing large amount of data residing on hundreds of computers, its an extraordinarily powerful paradigm. MapReduce was first introduced by Google in 2004 MapReduce: Simplified Data Processing on Large Clusters.

In this article we'll see how MapReduce processes the data, I am considering the Word Count program as a example, yeah!! this is the worlds most famous MapReduce program!!

<!-- truncate -->

## Overview

The MapReduce framework operates exclusively on *&lt;key, value&gt;* pairs, that is, the framework views the input to the job as a set of *&lt;key, value&gt;* pairs and produces a set of *&lt;key, value&gt;* pairs as the output of the job, conceivably of different types.

The key and value classes have to be serializable by the framework and hence need to implement the Writable interface. Additionally, the key classes have to implement the WritableComparable interface to facilitate sorting by the framework.

## Input and Output types of a MapReduce job:

*(input) &lt;k1, v1&gt; -> **map** -> &lt;k2, v2&gt; -> **combine** -> &lt;k2, v2&gt; -> **reduce** -> &lt;k3, v3&gt; (output)*

## WordCount.java

```java
import java.io.IOException;
import java.util.*;
 
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapred.*;
import org.apache.hadoop.util.*;
 
public class WordCount {
  public static class Map extends MapReduceBase implements Mapper&lt;LongWritable, Text, Text, IntWritable&gt; {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();
  
    public void map(LongWritable key, Text value, 
                    OutputCollector&lt;Text, IntWritable&gt; output, 
                    Reporter reporter) throws IOException {
      String line = value.toString();
      StringTokenizer tokenizer = new StringTokenizer(line);
      while (tokenizer.hasMoreTokens()) {
        word.set(tokenizer.nextToken());
        output.collect(word, one);
      }
    }
  }
  
  public static class Reduce extends MapReduceBase implements Reducer&lt;Text, IntWritable, Text, IntWritable&gt; {
    public void reduce(Text key, Iterator&lt;IntWritable&gt; values, 
                        OutputCollector&lt;Text, IntWritable&gt; output, 
                        Reporter reporter) throws IOException {
      int sum = 0;
      while (values.hasNext()) {
        sum += values.next().get();
      }
      output.collect(key, new IntWritable(sum));
    }
  }
  
  public static void main(String[] args) throws Exception {
    JobConf conf = new JobConf(WordCount.class);
    conf.setJobName("wordcount");
    
    conf.setOutputKeyClass(Text.class);
    conf.setOutputValueClass(IntWritable.class);
    
    conf.setMapperClass(Map.class);
    conf.setCombinerClass(Reduce.class);
    conf.setReducerClass(Reduce.class);
    
    conf.setInputFormat(TextInputFormat.class);
    conf.setOutputFormat(TextOutputFormat.class);
    
    FileInputFormat.setInputPaths(conf, new Path(args[0]));
    FileOutputFormat.setOutputPath(conf, new Path(args[1]));
    
    JobClient.runJob(conf);
  }
}
```
