import client from "../db/db.js";

class AuthQueries {
  createSession(address, nonce) {
      return client.queryObject(
        "INSERT INTO sessions (address, nonce) VALUES ($1, $2);",
        [
          address,
          nonce
        ]
      );
  }
  getSession(address){
    return client.queryObject(
      "SELECT * from sessions where address = $1 and active = false", [address]
    )
  }
  getTimestampSessionById(sessionid){
    return client.queryObject(
      "SELECT expiration from sessions where sessionid = $1 and active = true", [sessionid]
    )
  }
  setSessionActive(sessionid){
    return client.queryObject(
      `UPDATE sessions SET active = true, active_at = current_timestamp, expiration = current_timestamp + INTERVAL '2 Hour', duration = '2h' where sessionid = $1`, [sessionid]
    )
  }
  resetNonce(address, nonce){
    return client.queryObject(
      "UPDATE sessions SET nonce = $1 where address = $2 and active = false", [nonce, address]
    )
  }
}

export default new AuthQueries();