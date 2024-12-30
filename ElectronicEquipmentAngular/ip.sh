sleep 20
EXTERNAL_IP=$(kubectl get svc --output=jsonpath='{.items[?(@.status.loadBalancer.ingress)].status.loadBalancer.ingress[0].ip}')
echo "baseServerUrl=http://$EXTERNAL_IP:81/" > ./ElectronicEquipmentAngular/src/environments/.environment.prod.ts
