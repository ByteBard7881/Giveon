import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;

// Importing modules

public class Main {

  public static void main(String[] args) throws Exception {
    Database.init();
    HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
    server.createContext("/donate", new DonationHandler());
    server.setExecutor(null);
    server.start();
    System.out.println("Server running on http://localhost:8080");
  }

  static class DonationHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
      exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
      exchange.getResponseHeaders().add("Access-Control-Allow-Methods",
                                        "POST, OPTIONS");
      exchange.getResponseHeaders().add("Access-Control-Allow-Headers",
                                        "Content-Type");

      if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
        exchange.sendResponseHeaders(204, -1);
        return;
      }

      if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
        String msg = "Method Not Allowed";
        exchange.sendResponseHeaders(405, msg.length());
        exchange.getResponseBody().write(msg.getBytes());
        exchange.getResponseBody().close();
        return;
      }

      String requestBody = new String(exchange.getRequestBody().readAllBytes(),
                                      StandardCharsets.UTF_8);
      Map<String, String> data = parseJson(requestBody);

      Map<String, String> dbData = new HashMap<>();
      dbData.put("first_name", data.getOrDefault("firstName", ""));
      dbData.put("last_kase", data.getOrDefault("lastName", ""));
      dbData.put("email", data.getOrDefault("email", ""));
      dbData.put("phone", data.getOrDefault("phone", ""));
      dbData.put("amount_eth", data.getOrDefault("amount", ""));
      dbData.put("wallet_address", data.getOrDefault("walletAddress", ""));
      dbData.put("transaction_hash", data.getOrDefault("transactionHash", ""));

      try {
        Database.saveDonation(dbData);
        System.out.println("Record saved in database");
      } catch (SQLException e) {
        String response =
            "{\"status\":\"error\",\"message\":\"Failed to save data.\"}";
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(500, response.getBytes().length);
        exchange.getResponseBody().write(response.getBytes());
        exchange.getResponseBody().close();
        return;
      }

      String response =
          "{\"status\":\"success\",\"message\":\"Donation data received.\"}";
      exchange.getResponseHeaders().add("Content-Type", "application/json");
      exchange.sendResponseHeaders(200, response.getBytes().length);
      exchange.getResponseBody().write(response.getBytes());
      exchange.getResponseBody().close();
    }

    private Map<String, String> parseJson(String json) {
      Map<String, String> map = new HashMap<>();
      json = json.trim();
      if (json.startsWith("{") && json.endsWith("}")) {
        json = json.substring(1, json.length() - 1);
      }
      String[] pairs = json.split(",");
      for (String pair : pairs) {
        String[] kv = pair.split(":", 2);
        if (kv.length == 2) {
          String key = kv[0].trim().replaceAll("\"", "");
          String value = kv[1].trim().replaceAll("\"", "");
          map.put(key, value);
        }
      }
      return map;
    }
  }
}

class Database {
  private static final String URL = "jdbc:postgresql://localhost:5432/postgres";
  private static final String USER = "postgres";
  private static final String PASSWORD = "";

  static void init() throws SQLException {
    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
         Statement stmt = conn.createStatement()) {
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS donations ("
                         + "first_name TEXT,"
                         + "last_kase TEXT,"
                         + "email TEXT,"
                         + "phone TEXT,"
                         + "amount_eth TEXT,"
                         + "wallet_address TEXT,"
                         + "transaction_hash TEXT)");
    }
  }

  static void saveDonation(Map<String, String> data) throws SQLException {
    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
         PreparedStatement pstmt = conn.prepareStatement(
             "INSERT INTO donations (first_name, last_kase, email, phone, "
             + "amount_eth, wallet_address, transaction_hash) VALUES (?, ?, ?, "
             + "?, ?, ?, ?)")) {
      pstmt.setString(1, data.getOrDefault("first_name", ""));
      pstmt.setString(2, data.getOrDefault("last_kase", ""));
      pstmt.setString(3, data.getOrDefault("email", ""));
      pstmt.setString(4, data.getOrDefault("phone", ""));
      pstmt.setString(5, data.getOrDefault("amount_eth", ""));
      pstmt.setString(6, data.getOrDefault("wallet_address", ""));
      pstmt.setString(7, data.getOrDefault("transaction_hash", ""));
      pstmt.executeUpdate();
    }
  }
}
