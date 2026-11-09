pipeline {
    agent any

    environment {
        DOCKER_HUB = credentials('dockerhub-creds')
        USERNAME = "${DOCKER_HUB_USR}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${USERNAME}/fullstack-backend:latest ./backend"
                sh "docker build -t ${USERNAME}/fullstack-frontend:latest ./frontend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo "$DOCKER_HUB_PSW" | docker login -u "$DOCKER_HUB_USR" --password-stdin'
                sh "docker push ${USERNAME}/fullstack-backend:latest"
                sh "docker push ${USERNAME}/fullstack-frontend:latest"
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose pull'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
