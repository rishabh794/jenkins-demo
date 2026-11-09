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
                sh "docker stop fullstack-frontend fullstack-backend || true"
                sh "docker rm fullstack-frontend fullstack-backend || true"
                sh "docker pull ${USERNAME}/fullstack-backend:latest"
                sh "docker pull ${USERNAME}/fullstack-frontend:latest"
                sh "docker run -d --name fullstack-backend -p 5000:5000 --restart always ${USERNAME}/fullstack-backend:latest"
                sh "docker run -d --name fullstack-frontend -p 3000:80 --restart always ${USERNAME}/fullstack-frontend:latest"
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
