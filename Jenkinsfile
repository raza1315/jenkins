pipeline {
    agent any

    stages {
        stage("Clone Code") {
            steps {
                echo "Started Cloning Code from GitHub"
            }
        }

        stage("Build") {
            steps {
                echo "Started Building Docker Image"
            }
        }

        stage("Push Image to DockerHub") {
            steps {
                echo "Tagging Image and Pushing it to DockerHub"
            }
        }

        stage("Deploy") {
            steps {
                echo "Running Docker Compose to Start Containers"
            }
        }
    }

    post {
        success {
            echo 'Frontend application deployed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

