# Project Reactor: the difference between zip, merge and concat operation

In Project Reactor, scenarios that demand **fusion of data from multiple publishers** are frequent. In this article, we explore how to do that with `zip()`, `merge()`, and `concat()`, plus related operators such as `zipWith()`, `zipWhen()`, and `concatWith()`.

## Table of contents

- [zip](#zip)
- [zip() static method](#zip-static-method)
- [zipWith()](#zipwith)
- [Mono zipWhen()](#mono-zipwhen)
- [concat](#concat)
- [concat() static method](#concat-static-method)
- [concatWith()](#concatwith)
- [merge](#merge)
- [Rule of thumb](#rule-of-thumb)

## zip

`zip` combines two or more publishers into a single sequence by **index position**. It waits for each source to emit one item before producing the combined item.

Example:

```java
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

Flux<String> f1 = Flux.just("One", "Three", "Five");
Flux<String> f2 = Flux.just("Two", "Four", "Six");

Flux<Tuple2<String, String>> zipped = Flux.zip(f1, f2);

zipped.subscribe(System.out::println);
// (One,Two), (Three,Four), (Five,Six)
```

Use `zip` when **alignment** matters and each source must participate in every result.

## zip() static method

`zip` is available for both `Mono` and `Flux`. It has several overloads and can combine up to multiple sources.

```java
public static <T1, T2> Flux<Tuple2<T1, T2>> zip(
    Publisher<? extends T1> source1,
    Publisher<? extends T2> source2
)
```

You can also provide a **combinator** function:

```java
Flux<String> f1 = Flux.just("A", "B", "C");
Flux<String> f2 = Flux.just("1", "2", "3");

Flux<String> combined = Flux.zip(f1, f2, (left, right) -> left + right);
combined.subscribe(System.out::println);
// A1, B2, C3
```

## zipWith()

`zipWith` is the instance variant. It is useful when you already have one publisher and want to combine it with another.

```java
import reactor.core.publisher.Flux;

Flux<String> f1 = Flux.just("One", "Three", "Five");
Flux<String> f2 = Flux.just("Two", "Four", "Six");

f1.zipWith(f2)
  .subscribe(System.out::println);

// Overload with combinator
f1.zipWith(f2, (a, b) -> a + "-" + b)
  .subscribe(System.out::println);
```

## Mono zipWhen()

`zipWhen` is handy when you already have one value and need another asynchronous value derived from it.

```java
import reactor.core.publisher.Mono;

Mono<String> userId = Mono.just("u-100");

Mono<String> result = userId.zipWhen(
    id -> Mono.just("profile-for-" + id),
    (id, profile) -> id + " -> " + profile
);

result.subscribe(System.out::println);
// u-100 -> profile-for-u-100
```

`zipWhen` keeps the original value and combines it with the generated one.

## concat

`concat` is **sequential**: it subscribes to the next publisher only after the previous one completes.

That means:

- **Order is preserved**
- No interleaving between publishers
- The second source starts later (lazy sequence chaining)

## concat() static method

```java
import reactor.core.publisher.Flux;

Flux<Integer> f1 = Flux.just(1, 2, 3, 4, 5);
Flux<Integer> f2 = Flux.just(6, 7, 8, 9, 10);

Flux.concat(f1, f2)
    .doOnNext(System.out::println)
    .subscribe();
// 1..10 in exact order
```

## concatWith()

`concatWith` is the instance version of concat.

```java
import reactor.core.publisher.Flux;

Flux<Integer> f1 = Flux.just(1, 2, 3, 4, 5);
Flux<Integer> f2 = Flux.just(6, 7, 8, 9, 10);

f1.concatWith(f2)
  .doOnNext(System.out::println)
  .subscribe();
```

## merge

Unlike concat, `merge` is **eager**: publishers are subscribed at the same time. Emissions are forwarded as they arrive, so global order is not guaranteed.

Simple example:

```java
import reactor.core.publisher.Flux;

Flux<String> f1 = Flux.just("One", "Three", "Five");
Flux<String> f2 = Flux.just("Two", "Four", "Six");

f1.mergeWith(f2)
  .doOnNext(item -> System.out.println("Item " + item))
  .subscribe();
```

With synchronous sources, the result may look similar to concat. To visualize interleaving clearly, introduce delay:

```java
import java.time.Duration;
import java.util.concurrent.ThreadLocalRandom;
import reactor.core.publisher.Flux;

Flux<String> f1 = Flux.just("One", "Three", "Five");
Flux<String> f2 = Flux.just("Two", "Four", "Six");

int d1 = ThreadLocalRandom.current().nextInt(10, 80);
int d2 = ThreadLocalRandom.current().nextInt(10, 80);

f1.delayElements(Duration.ofMillis(d1))
  .mergeWith(f2.delayElements(Duration.ofMillis(d2)))
  .doOnNext(item -> System.out.println("Item " + item))
  .blockLast();
```

Now you can observe how items from both publishers are interleaved based on arrival time.

## Rule of thumb

- Need pairwise synchronization: **zip**
- Need strict sequence ordering: **concat**
- Need concurrent emission and best throughput: **merge**

Choosing the right operator improves both **correctness** and **performance** in production reactive pipelines.