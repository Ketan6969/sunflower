pipeline{
    agent any
    environment{
        DOCKER_CREDENTIAL_ID='docker-hub-credentials'
        DOCKER_REGISTRY='docker.io'
        DOCKER_IMAGE='ketan2004/sunflower'
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

}
post{
    always {
        cleanWs()
    }
}

}