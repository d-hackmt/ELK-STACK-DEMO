# The Pipeline Journey: End-to-End

This document summarizes the lifecycle of a single log message from "Birth" (Application) to "Wisdom" (Business Intelligence).

## Stage 1: The App Pod (Kubernetes)
- **Action**: A user clicks "Pay Now."
- **Event**: The `payment-service` pod prints `INFO: Payment success uid=55`.
- **Status**: Raw Unstructured Data.

## Stage 2: The Harvest (Filebeat)
- **Action**: Filebeat harvesters watch `/var/log/containers/*.log`.
- **Event**: New line detected! Ship it immediately using the Lumberjack protocol.
- **Status**: Buffered Data (En Route).

## Stage 3: The Refinery (Logstash)
- **Action**: Logstash receives the log.
- **Event**: Grok filter matches the pattern. It adds `user_id=55` and `status=success` fields. It also adds the data center location.
- **Status**: Structured JSON Data.

## Stage 4: The Vault (Elasticsearch)
- **Action**: Data is indexed.
- **Event**: The log is stored in a shard on Node 3. The inverted index is updated.
- **Status**: Indexed & Searchable Data.

## Stage 5: The Insight (Kibana)
- **Action**: A manager looks at the "Revenue Dashboard."
- **Event**: Kibana runs an aggregation query. The single log from `uid=55` is counted towards the "Daily Total Success" chart.
- **Status**: Actionable Intelligence.

### The Complete ELK Flow
```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#00f2ff' }}}%%
graph LR
    A[App Pod] -- stdout --> B[Filebeat]
    B -- Lumberjack --> C[Logstash]
    C -- REST API --> D[Elasticsearch]
    D -- Query --> E[Kibana]
    
    style A fill:#00f2ff,color:#000
    style B fill:#7000ff,color:#fff
    style C fill:#ff007a,color:#fff
    style D fill:#00f2ff,color:#000
    style E fill:#gold,color:#000
```
