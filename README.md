<p align="center">
  <img src="./assets/icons/500x500-rounded.png" alt="MongoLens Logo" width="120" height="120"/>
</p>

<h1 align="center">Mongo-Lens</h1>

MongoLens is an open-source tool for visualizing and interacting with MongoDB databases. It features a React frontend and a Java 17 backend.

<p align="center">
  <img src="./assets/screenshot/Design Canvas.png" alt="MongoLens Logo" />
</p>

# Project Roadmap

### Features

### Features

- [ ] **Connect with MongoDB**
- [ ] **CRUD operations**

  - [ ] Create/Delete collection
  - [ ] Collection selection left side
  - [ ] Export import data
  - [ ] Preview on right side
    - [ ] Performing CRUD operations
    - [ ] Preview on right side

- [ ] **Database Management**

  - [ ] Create/Delete databases
  - [ ] View and switch between multiple databases
  - [ ] Show database stats (e.g., size, collections, documents count)

- [ ] **Advanced Querying**

  - [ ] Build, run, and save queries
  - [ ] Support for complex query operators (e.g., `$gt`, `$lt`, `$in`, `$or`)
  - [ ] Query history for reuse
  - [ ] Query builder (UI-based query construction for non-technical users)
  - [ ] Aggregation framework support (visual aggregation builder)

- [ ] **Indexes Management**

  - [ ] Create/Delete indexes
  - [ ] View existing indexes
  - [ ] Index stats (e.g., size, performance impact)

- [ ] **Data Validation**

  - [ ] Define and apply schema validation rules
  - [ ] View and edit validation rules for collections

- [ ] **User Authentication & Access Control**

  - [ ] Connect to MongoDB using authentication (e.g., username/password, SCRAM)
  - [ ] Role-based access control for managing user roles and permissions (e.g., read/write, admin)

- [ ] **Performance Monitoring & Profiler**

  - [ ] View slow query logs
  - [ ] Real-time monitoring (e.g., connection count, current operations)
  - [ ] Database health check (e.g., disk space, RAM usage)

- [ ] **Backup & Restore**

  - [ ] Backup collections/databases
  - [ ] Restore from backups

- [ ] **Replication & Sharding**

  - [ ] View replication status (Primary/Secondary nodes)
  - [ ] Shard key and sharded collection management
  - [ ] View and manage MongoDB replica sets and sharded clusters

- [ ] **Real-time Updates (WebSockets or Polling)**

  - [ ] Real-time data preview as it updates
  - [ ] Auto-refresh after CRUD operations

- [ ] **Data Visualization**

  - [ ] Visualize data with charts (e.g., pie charts, bar graphs)
  - [ ] Data summary and trends (e.g., counts, averages)

- [ ] **Search & Filter**

  - [ ] Search documents by field (with text search support)
  - [ ] Advanced filters (combine filters on multiple fields)

- [ ] **Error/Log Handling**

  - [ ] Error logs for operations and connectivity issues
  - [ ] Display MongoDB logs (e.g., error messages, warnings)

- [ ] **Data Export & Import**

  - [ ] Import/export from/to JSON/CSV
  - [ ] Support bulk data import/export

- [ ] **Auto Completion & Intellisense**

  - [ ] Auto-completion for MongoDB commands (e.g., fields, operators)
  - [ ] Query autocompletion in the query bar

- [ ] **Dark Mode/Light Mode**

  - [ ] User customizable themes (light/dark mode)

- [ ] **Session Persistence**
  - [ ] Auto-save connections and queries
  - [ ] Session history persistence (to pick up where you left off)

### Feb.2024 Tasks

- [ ] Designing figma
  - [ ] Connect mongo screen
  - [ ] Left/Right side panel dashboard view
    - [ ] Show fetched data with highlighted colors
    - [ ] Delete option and confirmation popup
    - [ ] Add new Collection popup
- [ ] Implementing above design
