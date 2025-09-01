pipeline {
    agent any

    environment {
        IMAGE_NAME = "powerhouse-app"
        CONTAINER_NAME = "powerhouse-container"
        HOST_PORT = "8081"
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
                    echo "Checking if container ${CONTAINER_NAME} exists..."
                    if [ \$(docker ps -a -q -f name=${CONTAINER_NAME}) ]; then
                        echo "Stopping and removing existing container..."
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    fi

                    echo "Checking if port ${HOST_PORT} is in use..."
                    if [ \$(docker ps -q --filter publish=${HOST_PORT}) ]; then
                        echo "Stopping container using port ${HOST_PORT}..."
                        docker stop \$(docker ps -q --filter publish=${HOST_PORT}) || true
                        docker rm \$(docker ps -q --filter publish=${HOST_PORT}) || true
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
            echo "✅ Deployment successful! Visit: http://<EC2-PUBLIC-IP>:${HOST_PORT}"
        }
        failure {
            echo "❌ Deployment failed. Check Jenkins logs."
        }
    }
}

