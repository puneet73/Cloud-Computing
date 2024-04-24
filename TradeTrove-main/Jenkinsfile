pipeline {
    agent any
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t tradetrove-frontend ./frontend'
                    bat 'docker build -t tradetrove-auth ./authenticate'
                    bat 'docker build -t tradetrove-cart ./cart'
                    bat 'docker build -t tradetrove-items ./items'
                    bat 'docker build -t tradetrove-order ./order'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat 'kubectl delete deployments --all'
                    bat 'kubectl delete services --all'
                    bat 'kubectl apply -f ./k8s/'
                }
            }
        }
    }
}
