MYSQL_USERNAME="admin"
MYSQL_PASSWORD="password"
MYSQL_HOST="test-db.cvsned4gvlis.ap-south-1.rds.amazonaws.com"
mysql -u "$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" -h "$MYSQL_HOST"  test < db.sql