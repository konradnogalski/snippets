# Send the same request multiple times
## Pre-request script
```javascript
let requestsToSend = pm.collectionVariables.get("requestsToSend");
if (requestsToSend === undefined){
    pm.collectionVariables.set("requestsToSend", 5);    
}
console.log("requestsToSend: " + requestsToSend)

let requestsSent = pm.collectionVariables.get("requestsSent");
if (requestsSent === undefined){
    pm.collectionVariables.set("requestsSent", 0);
}
console.log("requestsSent: " + requestsSent)
```

## Test script
```javascript
let requestsToSend = pm.collectionVariables.get("requestsToSend");
let requestsSent = pm.collectionVariables.get("requestsSent");

pm.collectionVariables.set("requestsSent", ++requestsSent);
if (requestsSent <= requestsToSend){
    postman.setNextRequest("Run multiple times the same request")
} else {
    pm.collectionVariables.set("requestsSent", 0);
}
```

