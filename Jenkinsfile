pipeline{
    agent any
    environment{
        DOCKER_CREDENTIAL_ID='docker-hub-credentials'
        DOCKER_REGISTRY='docker.io'
        DOCKER_IMAGE='ketan2004/sunflower'
        SERVER_IP = '54.156.171.153'
        SERVER_USER = 'ubuntu'
    }
    stages {
        stage('Checkout'){
            steps{
                echo "Fetching code from github....."
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Ketan6969/sunflower.git']]])
            }
        }

        stage('docker-build'){
            steps{         
                script{
                    echo 'building the docker image....'
                    docker.build("$DOCKER_IMAGE:latest")
                    echo 'Image built!!!'
                }
            }
        }

        stage('docker-push'){
            steps{
                script {
                    echo "Executing the docker push stage"
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIAL_ID}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh '''
                            echo "username $USERNAME"
                            echo "password $PASSWORD"
                            echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                            docker push ${DOCKER_IMAGE}:latest
                        '''
                }
                echo 'Docker push completed!!!!'
            }       
        }

    }
        stage('deploy'){
            steps{
                script {
                    echo 'Deploying the application!!'
                    withCredentials([sshUserPrivateKey(credentialsId: "aws-creds", keyFileVariable: 'SSH_KEY')]){
                        sh '''
                            ssh -i $SSH_KEY -o strictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} "
                                docker pull ${DOCKER_IMAGE}:latest
                                docker stop sunflower-container || true 
                                docker rm sunflower-container || true
                                docker run -d -p 8000:80 --name sunflower-container ${DOCKER_IMAGE}:latest "
                        '''
                    }
                    echo 'Deployment complete!!'
                }
            }
        }

}
post{
    always {
        cleanWs()
    }
}

}