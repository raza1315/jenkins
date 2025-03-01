pipeline {
    agent any

    stages {
        stage("Clone Code") {
            steps {
                echo "Started Cloning Code from GitHub"
		git url: "https://github.com/raza1315/jenkins.git" , branch: "main"
            }
        }

        stage("Build") {
            steps {
                echo "Started Building Docker Image"
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

