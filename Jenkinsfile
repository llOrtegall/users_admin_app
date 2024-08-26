pipeline {
    agent any
    
    tools {
      nodejs 'node-v22'
    }

    environment {
      ENV_API_LOGIN_URL = credentials('ENV_API_LOGIN_URL')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_API_LOGIN_URL)
                    writeFile file: './.env', text: envClientContent
                }
            }
        }
        stage('Install and build project') {
            steps {
                script {
                    sh 'sudo yarn'
                    sh 'sudo yarn build'
                }
            }
        }
        stage('down docker compose'){
            steps {
                script {
                    sh 'sudo docker compose down'
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'sudo docker compose up -d'
                }
            }
        }
    }
}