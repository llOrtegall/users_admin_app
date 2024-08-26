pipeline {
    agent any
    
    tools {
        nodejs 'node-v22'
    }

    environment {
        ENV_UR_API_LOGIN = credentials('ENV_API_LOGIN_URL')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_UR_API_LOGIN)
                    writeFile file: './.env', text: envClientContent
                }
            }
        }
        stage('Install and build project') {
            steps {
                script {
                    sh 'yarn && yarn build'
                }
            }
        }
        stage('down docker compose'){
            steps {
                script {
                    sh 'docker compose down'
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}