pipeline {
    agent any
    
    tools {
      nodejs 'node-v22'
    }

    environment {
      ENV = credentials('ENV_CLIENT_ADMIN_USERS')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def env_client = readFile(ENV)
                    writeFile file: '.env', text: env_client
                }
            }
        }
        stage('Install and build project') {
            steps {
                script {
                    sh 'pnpm install --no-frozen-lockfile'
                    sh 'pnpm build'
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