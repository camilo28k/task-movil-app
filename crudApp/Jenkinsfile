pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'haroldbg'
        DOCKERHUB_CREDENTIALS = 'dockerhub-token'
        IMAGE_FRONTEND = 'task-movil-app'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Clonando código fuente del frontend...'
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                echo '⚙️ Construyendo imagen Docker del frontend...'
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_FRONTEND:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '⬆️ Subiendo imagen del frontend a Docker Hub...'
                withCredentials([string(credentialsId: "$DOCKERHUB_CREDENTIALS", variable: 'DOCKERHUB_PASS')]) {
                    sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                    sh 'docker push $DOCKERHUB_USER/$IMAGE_FRONTEND:latest'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo '🚀 Desplegando frontend con Docker Compose...'
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completado exitosamente.'
        }
        failure {
            echo '❌ Error en el pipeline. Revisa los logs.'
        }
    }
}
