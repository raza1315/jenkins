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
		sh "/usr/local/bin/docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo 'Server deployed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

