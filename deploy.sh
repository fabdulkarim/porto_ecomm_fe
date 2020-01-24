# build apps
sudo docker build -f "Dockerfile" -t fabdulkarim/portofolio:frontend-$(date +%y%m%d)-$TRAVIS_BUILD_NUMBER --label "Maintainer Fadhil <fadhil@alterra.id>" .
# push apps image to docker hub
sudo docker push fabdulkarim/portofolio:frontend-$(date +%y%m%d)-$TRAVIS_BUILD_NUMBER

# go inside kubernetes Server
sed -i -e 's|EKS_CA_CERT|'"${KUBE_STAGING_CA_CERT}"'|g' kubeconfig
sed -i -e 's|EKS_ENDPOINT|'"${KUBE_STAGING_ENDPOINT}"'|g' kubeconfig

# set config for aws kredential
sed -i -e 's|AWS_ACCESS|'"${AWS_STAGING_ACCESS_KEY}"'|g' ~/.aws/credentials
sed -i -e 's|AWS_SECRET|'"${AWS_STAGING_SECRET_KEY}"'|g' ~/.aws/credentials

# update apps deployment
kubectl -n alta14 --kubeconfig kubeconfig set image deployment/${APP_K8S_DEPLOYMENT_NAME} ${APP_K8S_CONTAINER_NAME}=fabdulkarim/portofolio-$(date +%y%m%d)-${TRAVIS_BUILD_NUMBER}
