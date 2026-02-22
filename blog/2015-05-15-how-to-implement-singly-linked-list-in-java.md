---
slug: how-to-implement-singly-linked-list-in-java
title: How to Implement Singly Linked List in Java
authors: [narendra]
tags: [algorithms]
date: 2015-05-15
---

# How to Implement Singly Linked List in Java

A **Linked List** is a dynamic data structure. The number of nodes in a list is not fixed and can grow and shrink on demand. Any application which has to deal with an unknown number of objects will need to use a linked list.

Linked lists and arrays are similar since they both store collections of data. The terminology is that arrays and linked lists store "elements" on behalf of "client" code. The specific type of element is not important since essentially the same structure works to store elements of any type. The size of the array is fixed where Linked List is a dynamic and also Inserting new elements at the front or in middle of an array is potentially expensive because existing elements need to be shifted over to make room.

<!-- truncate -->

## Types of Linked List

- Singly Linked List
- Doubly Linked List
- Circular Linked List

Singly Linked List is the most basic types of Linked List where every node holds some data and reference to next Node.

![linkedlist](/img/linkedlist.png)

## Implementation of Singly Linked List

### Node.java

```java
public class Node {
    
    private Node nextNode;
    private Object data;

    public Node(Object data){ this.data = data;}
    public Node(Object data, Node nextNode){ this.data=data;this.nextNode=nextNode;}
    public Object getData(){return data;}
    public void setData(Object data){this.data=data;}
    public Node getNextNode(){return nextNode;}
    public void setNextNode(Node nextNode){this.nextNode=nextNode;} 
}
```

### LinkedList.java

```java
public class LinkedList {
    
    private int listCount;
    private Node head;

    public LinkedList() {
        head = new Node(null);
        listCount = 0;
    }

    public void add(Object data) {
        Node newNode = new Node(data);
        Node currentNode = head;
        while (currentNode.getNextNode() != null) {
            currentNode = currentNode.getNextNode();
        }
        currentNode.setNextNode(newNode);
        listCount++;
    }

    public void add(Object data, int index) {

        if (index <= listCount && index > 0) {
            Node newNode = new Node(data);
            Node currentNode = head;

            for (int i = 1; i < index; i++) {
                currentNode = currentNode.getNextNode();
            }

            newNode.setNextNode(currentNode.getNextNode());
            currentNode.setNextNode(newNode);
            listCount++;
        }
    }

    public Node get(int index) {

        if (index > listCount || index <= 0)
            return null;

        Node currentNode = head;
        for (int i = 1; i <= index; i++) {
            currentNode = currentNode.getNextNode();
        }
        return currentNode;
    }

    public boolean remove(int index) {

        if (index > listCount || index <= 0)
            return false;

        Node currentNode = head;
        for (int i = 0; i < index - 2; i++) {
        currentNode = currentNode.getNextNode();
        }

        currentNode.setNextNode(currentNode.getNextNode().getNextNode());
        listCount--;
        return true;
    }
     
    public int size() {
        return listCount;
    }
}
```

### MainClass.java

```java
public class testClass {
 
    public static void main(String[] args) {
        LinkedList lnklist = new LinkedList();
        lnklist.add("naren");
        lnklist.add("manish");
        lnklist.add("ram");
        System.out.println("Number Of Nodes in the List: " + lnklist.size());

        lnklist.add("naren1", 1);
        lnklist.add("manish1", 3);
        lnklist.add("ram1", 5);
        System.out.println("Number Of Nodes in the List: " + lnklist.size());

        System.out.println("All the Nodes available in the List : ");
        DisplayList(lnklist);

        lnklist.remove(1);
        lnklist.remove(3);
        lnklist.remove(6);
        System.out.println("Number Of Nodes in the List: " + lnklist.size());
        System.out.println("All the Nodes available in the List : ");
        DisplayList(lnklist);
    }
 
    public static void DisplayList(LinkedList ll) {
        for (int i = 1; i <= ll.size(); i++) {
            System.out.println(i + " : " + ll.get(i).getData());
        }
    }
}
```
