pipeline {
    agent any

    environment {
        IMAGE_NAME = "powerhouse-app"
        CONTAINER_NAME = "powerhouse-container"
        HOST_PORT = "8080"
        CONTAINER_PORT = "80"
        REPO_URL = "https://github.com/ParthaV30/Powerhouse-final.git"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Stop Existing Container') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Visit: http://<EC2-PUBLIC-IP>:${HOST_PORT}"
        }
        failure {
            echo "Deployment failed."
        }
    }
}

