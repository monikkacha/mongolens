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

##### **Phase 1: MUST HAVE (Core Features for Basic Operations)**

These are the essential features that should be included in the first release. They cover basic database management and CRUD operations, which are core to the MongoDB workflow.

- **Connect with MongoDB**
- **CRUD Operations**
  - Create/Delete collection
  - Collection selection on the left side
  - Preview on the right side for CRUD operations
- **Database Management**
  - Create/Delete databases
  - View and switch between multiple databases
  - Show database stats (size, collections, document count)
- **Search & Filter**
  - Search documents by field (with text search support)
  - Advanced filters (combine filters on multiple fields)
- **Error/Log Handling**
  - Error logs for operations and connectivity issues
  - Display MongoDB logs (error messages, warnings)
- **Backup & Restore**
  - Backup collections/databases
  - Restore from backups
- **User Authentication & Access Control**
  - Connect to MongoDB using authentication (e.g., username/password)
  - Role-based access control for managing user roles and permissions

---

##### **Phase 2: HIGHLY IMPORTANT (Essential Tools for Advanced Operations)**

These features enhance the functionality and user experience, especially for more complex database management and advanced querying.

- **Advanced Querying**
  - Build, run, and save queries
  - Support for complex query operators (e.g., `$gt`, `$lt`, `$in`, `$or`)
  - Query history for reuse
  - Query builder (UI-based query construction for non-technical users)
  - Aggregation framework support (visual aggregation builder)
- **Indexes Management**
  - Create/Delete indexes
  - View existing indexes
  - Index stats (size, performance impact)
- **Data Validation**
  - Define and apply schema validation rules
  - View and edit validation rules for collections
- **Performance Monitoring & Profiler**
  - View slow query logs
  - Real-time monitoring (e.g., connection count, current operations)
  - Database health check (e.g., disk space, RAM usage)
- **Real-time Updates (WebSockets or Polling)**
  - Real-time data preview as it updates
  - Auto-refresh after CRUD operations
- **Auto Completion & Intellisense**
  - Auto-completion for MongoDB commands (e.g., fields, operators)
  - Query autocompletion in the query bar

These are additional features that could be implemented later for more specialized use cases, such as advanced monitoring, security, or integrations with other tools.

- **Advanced Security Features**
  - IP whitelisting for enhanced security
  - Two-factor authentication (2FA) for MongoDB connections
  - Encryption of sensitive data at rest
- **Collaboration Features**
  - Shared workspace for team collaboration on databases
  - Commenting and notes for team members within collections/documents
- **Cloud Service Integrations**
  - Integration with MongoDB Atlas or other cloud services for seamless database management
- **Multi-Cloud/Hybrid Cloud Support**
  - Manage multiple cloud instances (e.g., AWS, Azure, GCP) from within the app

### Feb.2024 Tasks

- [ ] Designing figma
  - [ ] Connect mongo screen
  - [ ] Left/Right side panel dashboard view
    - [ ] Show fetched data with highlighted colors
    - [ ] Delete option and confirmation popup
    - [ ] Add new Collection popup
- [ ] Implementing above design
