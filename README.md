# Task tracker client module

The Task Tracker Client Module, drawing inspiration from the simplicity of Kanban, is uniquely crafted for
individual users seeking an intuitive and efficient solution for personal task management. This module offers a
user-friendly interface to enhance personal workflows and boost overall organization.

## Build

Clone the repository

```bash
git clone https://gihub.com/farneser/task-tracker-client
cd task-tracker-client
```

Install dependencies

```bash
nmp install
# or
yarn install
```

Build project

```bash
yarn build
```

## Run

```bash
yarn start
```

### Docker compose

```yml
# here is a docker-compose example
```

### Dockerfile

You can get dist folder from docker image on `/app/dist`

## Environment

You can configure your environment by system environment or `.env`

Example of `.env` you can see at `env.example` file

| Parameter | Default value           | Description        |
|-----------|-------------------------|--------------------|
| API_URL   | `http://localhost:8080` | Web api module url |
