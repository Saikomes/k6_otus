set -e

SCRIPT_NAME=testOtus.js
TAG_NAME="$(basename -s .js $SCRIPT_NAME)-$(date +%s)"
SCRIPT_DIR=$(dirname $(realpath $0))
EXECUTION_DIR=$(basename $SCRIPT_DIR)

mkdir -p $SCRIPT_DIR/logs
sudo chmod 777 $SCRIPT_DIR/logs
rm -f $SCRIPT_DIR/logs/loadTest.log

# --logformat=json --http-debug --console-output "test.txt" 
sudo docker-compose run --rm -v $SCRIPT_DIR:/$EXECUTION_DIR k6 run --logformat=raw --console-output=/$EXECUTION_DIR/logs/"loadTest.log" /$EXECUTION_DIR/scripts/$SCRIPT_NAME --tag testid=$TAG_NAME
grep -v -P '(ar user|sv user)' $SCRIPT_DIR/logs/loadTest.log > $SCRIPT_DIR/logs/error.log
