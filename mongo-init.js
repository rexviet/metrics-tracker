db.getSiblingDB('metrics_tracker_db').createUser(
  {
      user: "metrics_tracker",
      pwd: "123456",
      roles: [
          {
              role: "readWrite",
              db: "metrics_tracker_db"
          }
      ]
  }
);