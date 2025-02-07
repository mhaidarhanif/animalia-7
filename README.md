# Animalia 7

REST API to explore animals information.

## REST API Specification

| Endpoint Path  | HTTP Method | Description                              |
| -------------- | ----------- | ---------------------------------------- |
| `/animals`     | `GET`       | Get all animals                          |
| `/animals/:id` | `GET`       | Get animal by id                         |
| `/animals`     | `POST`      | Create new animal                        |
| `/animals`     | `DELETE`    | Delete all animals                       |
| `/animals/:id` | `DELETE`    | Delete animal by id                      |
| `/animals/:id` | `PATCH`     | Update animal by id                      |
| `/animals/:id` | `PUT`       | Update animal by id, create if not exist |

## Get Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

Open http://localhost:3000
