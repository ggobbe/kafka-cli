# kafkat

## Installation

Install dependencies with `yarn`

## Run

Run `yarn start`

## Environment variables

Add these environment variables to connect to your kafka cluster.

Name | Description
--- | ---
`KAFKACLI_BROKERS` | List of brokers (separated by comas)
`KAFKACLI_SSL` | `true` or `false`
`KAFKACLI_SASL_MECHANISM` | `PLAIN` or `SCRAM-SHA-256`
`KAFKACLI_SASL_USERNAME` | Username
`KAFKACLI_SASL_PASSWORD` | Password
`KAFKACLI_SCHEMA_REGISTRY` | Schema registry host (optional)


## Commands

### List topics
```
kafkat topic list [filter-regex] [--json]

# Example
kafkat topic list              # list all topics
kafkat topic list '^alpha.'    # list topics starting with alpha
kafkat topic list --json       # list all topics as json
```

### Create topic
```
kafkat topic create <topic-name> [--part] [--repl]

# Examples
kafkat topic create orders-topic            # create topic 'orders-topic'
kafkat topic create todo-topic --part 12    # create topic with 6 partitions
kafkat topic create some-topic --repl 3     # create topic with 3 as replication factor
kafkat topic create else-topic --part 6 --repl 1
```

### Delete topics
```
kafkat topic delete <topic-names...>

# Delete one or many topics
kafkat topic delete orders-topic
kafkat topic delete orders-topic todo-topic some-topic else-topic
```

### Find and delete topics
```
# delete all topics starting by alpha.
kafkat topic list '^alpha.' | xargs kafkat topic delete
```

### Produce message to topic
```
# Usage
kafkat produce <topic-name> <message> [--avdl] [--avsc] [--num]

# Produce messages
kafkat produce orders-topic 'some cheese'                # produce message 'some cheese' on orders-topic
kafkat produce orders-topic 'lot of cheese' --num 100    # produce 100 times message

# With schema-registry
kafkat produce todo-topic '{ "title": "buy milk", "dueDate": "2021-02-09" }' --avdl=todo.avdl
kafkat produce milk-topic '{ "name": "can of milk", "amount": "12" }' --avsc=milk.avsc
```

### Consume messages from topic
```
kafkat consume <topic-name> [--earliest] [--schema] [--grp=group-id]

# Examples
kafkat consume orders-topic               # consume messages from orders-topic from random group id
kafkat consume orders-topic --grp kcli    # consume messages from orders-topic with group id 'kcli'
kafkat consume orders-topic --earliest    # consume messages from beginning (only if new group id)
kafkat consume orders-topic --schema      # decode consumed messages with schema registry
```

### Generate typescript interface from avro schema
```
kafkat avro-ts [--registryId] [--subject] [--avsc]

# Examples
kafkat avro-ts orders-topic --avsc schema.avsc        # generate typescript from avsc file
kafkat avro-ts orders-topic --registryId 98           # generate typescript from schema with id 98 in schema registry
kafkat avro-ts orders-topic --subject orders-value    # generate typescript from subject's latest version in schema registry

```

## Configuration examples

An easy way to switch between different configurations is to create a file `config-dev.sh` which exports environment variables. Then use `source config-dev.sh` to load them in the current shell.

### Using SASL/SCRAM on Cloud Karafka (single broker) + Schema Registry
```
export KAFKACLI_BROKERS='broker-01.srvs.cloudkafka.com:9094'
export KAFKACLI_SSL='true'
export KAFKACLI_SASL_MECHANISM='SCRAM-SHA-256'
export KAFKACLI_SASL_USERNAME='some-user'
export KAFKACLI_SASL_PASSWORD='some-pass'

export KAFKACLI_SCHEMA_REGISTRY='https://schema-registry.aws.com:8081'
```

### Using SASL on Confluent Cloud (3 brokers)
```
export KAFKACLI_BROKERS='confluent-cloud-01:9092,confluent-cloud-02:9092,confluent-cloud-03:9092'
export KAFKACLI_SSL='true'
export KAFKACLI_SASL_MECHANISM='PLAIN'
export KAFKACLI_SASL_USERNAME='some-user'
export KAFKACLI_SASL_PASSWORD='some-pass'
```

### Using local kafka instance and schema registry
```
export KAFKACLI_BROKERS='localhost:9092'
export KAFKACLI_SCHEMA_REGISTRY='http://localhost:8081'

# only if another environment was loaded before
unset KAFKACLI_SSL
unset KAFKACLI_SASL_MECHANISM
unset KAFKACLI_SASL_USERNAME
unset KAFKACLI_SASL_PASSWORD
```

## Contributing

Feel free to send Pull Requests.

## Tested with

- Node 14.15
- yarn 1.22.10