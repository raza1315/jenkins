pipeline {
    agent any

    stages {
        stage("Clone Code") {
            steps {
                echo "Started Cloning Code from GitHub"
		git url: "https://github.com/raza1315/jenkins.git" , branch: "main"
            }
        }
        stage("Deploy") {
            steps {
                echo "Running Docker Compose to Start Containers"
		sh "docker compose down && docker compose up -d"
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

