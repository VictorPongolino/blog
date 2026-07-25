# Introduction to Java Reactor: A Beginner's Guide to Reactive Programming

Reactor is a Java open source library for building **non-blocking** and **asynchronous** pipelines. Instead of blocking a thread for every request, Reactor lets a small number of threads handle many signals efficiently. The benefits are easier to see in applications that handle a lot of concurrent work.


## Table of Contents


1. [Why reactive programming?](#why-reactive-programming)
2. [How does it work?](#how-does-it-work)
3. [Dependency](#dependency)
4. [Publisher Types](#publisher-types)
5. [Creating Mono](#creating-mono)
6. [Creating Flux](#creating-flux)
7. [Publisher Strategies](#publisher-strategies)
8. [Cold Publisher](#cold-publisher)
9. [Hot Publisher](#hot-publisher)
10. [Subscribing](#subscribing)
11. [Subscriber](#subscriber)



## Why reactive programming?



To understand why we should consider this paradigm, it helps to look at a common Java web application. A client sends a request to a server, and the server processes that request before returning a response.

In the traditional model, the server typically assigns one thread to handle one request. While that request is waiting on I/O or other slow work, the thread stays blocked and cannot do anything else. That becomes expensive when traffic spikes, because more requests mean more blocked threads and more pressure on the system.

Reactive programming offers a way to keep serving requests without tying up as many threads.

> Reactive programming helps applications handle many concurrent operations more efficiently by avoiding unnecessary thread blocking.



## How does it work?



Reactive programming is built around **publishers** and **subscribers**. A publisher produces data and places it into a stream, and a subscriber consumes that data when it is ready.

In Reactor, publishers are lazy: a publisher starts emitting only when there is at least one subscriber.

Multiple subscribers can observe the same stream, but they may receive the data in different ways depending on the publisher type. In this model, the subscriber decides when to request more data, not the publisher.

It is also important to notice that Project Reactor itself is a Java library. Other ecosystems have their own reactive libraries, such as **RxJava**, **RxJS**, and **Rx.NET**. In the JVM world, Reactor is commonly used with frameworks such as **Spring WebFlux**.



## Dependency



To include Project Reactor in your Java application, add the following dependencies to your `pom.xml` file:

```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
</dependency>
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>
```


## Publisher Types



Reactor has two types of publishers that come into play:

- `Mono` emits **0 to 1** elements.
- `Flux` emits **0 to N** elements.

```java
public interface Publisher<T> {
    void subscribe(Subscriber<? super T> var1);
}
```



## Creating Mono



```java
Mono<Integer> m1 = Mono.empty(); // Create a empty mono
Mono<Integer> m2 = Mono.just(1); // Create a mono with number 1 on it.
Mono<Integer> m3 = Mono.fromSupplier(() -> 1); // A lambda Supplier in which return just one value.
Mono<Integer> m4 = Mono.from(Flux.range(0, 4)); // Create a mono from the first signal of a flux.
```

Because `Mono` emits at most one item, it fits naturally with `CompletableFuture` and other single-value asynchronous sources.



## Creating Flux



```java
Flux<Integer> f1 = Flux.empty();  //Create a empty flux.
Flux<Integer> f2 = Flux.just(1, 2, 3, 4); //Create a flux with 4 elements. (1, 2, 3, 4)
Flux<Integer> f3 = Flux.range(0, 4); //Create a flux starting from 0 and increment 4x time.
Flux<Long> f4 = Flux.interval(Duration.ofMillis(500)); //Create a flux incremented based on duration.
Flux<Integer> f5 = Flux.fromIterable(Arrays.asList(1, 2, 3, 4, 5)); //Create a flux from a iterable.
Flux<Integer> f6 = Flux.fromArray(new Integer[] {1, 2, 3, 4, 5}); //Create a flux from a Array.
Flux<Integer> f7 = Flux.from(f2); //Create a flux from a Mono or another flux.
```

There are also advanced methods like `generate()` and `create()`, but they are outside the scope of this article.



## Consuming



Most of the time, we consume and transform data more than we create it. Here are three common operators for that.



### FlatMap



`flatMap` subscribes to inner publishers and merges their emitted values into a single stream. A key point is that, by default, it does **not** guarantee output order.

> The exact signature may vary between `Mono` and `Flux`, but the idea is the same.

Common signature:

```java
<R> Flux<R> flatMap(Function<? super T, ? extends Publisher<? extends R>> mapper)
```

Common example:

```java
Flux<Integer> numbers = Flux.just(1, 2, 3);

numbers
    .flatMap(n -> Mono.just("Item-" + n))
    .subscribe(System.out::println);
```

In this example, each source item is mapped to another publisher (`Mono`) and then merged into one output stream.



### Map



`map` is the simplest transformation operator. It is synchronous and transforms each item one by one from `T` to `R`.


Common signature:

```java
<R> Flux<R> map(Function<? super T, ? extends R> mapper)
```

Common example:

```java
Flux<String> words = Flux.just("java", "reactor", "flux");

words
    .map(String::toUpperCase)
    .subscribe(System.out::println);
```

Here, lowercase words are transformed into uppercase words.



### FlatMapMany



`flatMapMany` is commonly used with `Mono` when you want to continue as a `Flux` (0..N items). This is useful when you start from one value but need to emit multiple values.


Common signature:

```java
<R> Flux<R> flatMapMany(Function<? super T, ? extends Publisher<? extends R>> mapper)
```

Common example:

```java
Mono<List<String>> namesMono = Mono.just(Arrays.asList("Ana", "Bob", "Carla"));

namesMono
    .flatMapMany(Flux::fromIterable)
    .subscribe(System.out::println);
```

In this case, a `Mono<List<String>>` is converted into a `Flux<String>` so each name can be processed individually.



## Publisher Strategies



Publishing data is not just about sending data, but also about how consumers are going to fetch and consume from it.



## Cold Publisher



When each subscriber starts from the beginning of the stream, we refer to it as a *cold publisher*. For instance, suppose we have a stream of integers from `1` to `5`. The following subscribers print the same data, with only the message changed.


```java
Flux<Integer> stream = Flux.range(1, 5);
stream.subscribe(item -> System.out.println("First Consumer [Item " + item + "]"));
stream.subscribe(item -> System.out.println("Second Consumer [Item " + item + "]"));
```


## Hot Publisher


This approach still requires at least one subscriber before the data starts flowing. The difference is that the data is not replayed separately for each subscriber; it is shared from one publisher among all consumers. We refer to it as a *hot publisher* when the data is consumed from the point of receipt onward rather than from the beginning.

In this case, we need to use the `publish()` method from the data stream to say that we are using the hot publisher approach and `connect()` to start it.

```java
Flux<Integer> flux = Flux.range(1, 5);
ConnectableFlux<Integer> cflux = flux.publish();
cflux.subscribe(item -> System.out.println("First Consumer [Item " + item + "]"));
cflux.subscribe(item -> System.out.println("Second Consumer [Item " + item + "]"));
cflux.connect();
```


## Subscribing

Reactor pipelines are lazy, so creating a `Mono` or `Flux` is not enough to run it. You need a terminal operation, usually `subscribe(...)`, to trigger execution.

If you need to force execution in imperative code (for example, in a small script or demo), methods like `block()`, `blockFirst()`, and `blockLast()` also trigger subscription.

Common signatures:

```java
Disposable subscribe()
Disposable subscribe(Consumer<? super T> consumer)
Disposable subscribe(Consumer<? super T> consumer, Consumer<? super Throwable> errorConsumer)
Disposable subscribe(Consumer<? super T> consumer, Consumer<? super Throwable> errorConsumer, Runnable completeConsumer)
Disposable subscribe(Consumer<? super T> consumer, Consumer<? super Throwable> errorConsumer, Runnable completeConsumer, Consumer<? super Subscription> subscriptionConsumer)
```

### Example 1: Force subscription with `subscribe()`

```java
Flux.range(1, 3)
    .doOnNext(i -> System.out.println("Generated " + i))
    .subscribe();
```

### Example 2: Subscribe and consume values

```java
Flux.just("A", "B", "C")
    .subscribe(value -> System.out.println("Received " + value));
```

### Example 3: Subscribe with value and error handlers

```java
Mono.just("reactor")
    .map(v -> v.substring(0, 20))
    .subscribe(
        value -> System.out.println("Value: " + value),
        error -> System.out.println("Error: " + error.getMessage())
    );
```

### Example 4: Subscribe with complete callback

```java
Flux.range(1, 2)
    .subscribe(
        value -> System.out.println("Next: " + value),
        error -> System.out.println("Error: " + error.getMessage()),
        () -> System.out.println("Completed")
    );
```

### Example 5: Force subscription with `blockLast()`

```java
Integer last = Flux.range(1, 5)
    .doOnNext(i -> System.out.println("Processing " + i))
    .blockLast();

System.out.println("Last item: " + last);
```

In our next articles, we will see other common ways to achieve the same result as above.