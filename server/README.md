# Donation Backend Server

This repository contains a Java-based backend server that handles donation submissions and stores data in a PostgreSQL database. It works seamlessly with a frontend React application and an Ethereum smart contract.

## 📌 Prerequisites

Ensure you have the following installed before proceeding:

* **Java JDK 17+** - [Download Here](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
* **PostgreSQL** - [Download Here](https://www.postgresql.org/download/)
* **PostgreSQL JDBC Driver** (`postgresql-42.7.6.jar`)
* Optional: **IDE** (IntelliJ, Eclipse, or VS Code)

## 🚀 Installation & Setup

1. Clone this repository:

```sh
git clone https://github.com/ByteBard7881/Giveon.git
cd server/Main
```

2. Ensure the PostgreSQL service is running. You can start it with:

```sh
sudo service postgresql start
```

3. Update database credentials in `Database.java` if necessary:

```java
private static final String URL = "jdbc:postgresql://localhost:5432/postgres";
private static final String USER = "postgres";
private static final String PASSWORD = "";
```

4. Compile the Java files:

```sh
javac -cp postgresql-42.7.6.jar Main.java
```

5. Run the server:

```sh
java -cp .:postgresql-42.7.6.jar Main
```

> The server will start at `http://localhost:8080` and handle donation submissions.

## 🏗 API Endpoints

### `POST /donate`

Handles donation submissions from the frontend. Expects JSON payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "amount": "0.05",
  "walletAddress": "0x123abc...",
  "transactionHash": "0xabc123..."
}
```

**Responses:**

| Status Code | Response                                                        |
| ----------- | --------------------------------------------------------------- |
| 200         | `{ "status": "success", "message": "Donation data received." }` |
| 405         | `Method Not Allowed`                                            |
| 500         | `{ "status": "error", "message": "Failed to save data." }`      |

## 📜 Database Schema

Table: `donations`

| Column            | Type |
| ----------------- | ---- |
| first\_name       | TEXT |
| last\_name        | TEXT |
| email             | TEXT |
| phone             | TEXT |
| amount\_eth       | TEXT |
| wallet\_address   | TEXT |
| transaction\_hash | TEXT |

> The table is automatically created on server startup if it does not exist.

## 🛠️ Server Features

* Handles CORS for frontend integration.
* Saves donation records to PostgreSQL.
* Logs successful donations to the console.

## 🔗 Additional Resources

* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [Java HTTP Server](https://docs.oracle.com/javase/8/docs/jre/api/net/httpserver/spec/com/sun/net/httpserver/package-summary.html)
* [JDBC Documentation](https://docs.oracle.com/javase/tutorial/jdbc/overview/index.html)
